const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer'),
      {EMAIL, PASSWORD} = process.env

const twilio = require('twilio')

const accountSid = 'AC638868375b00336da79b34f4913b6ecb'
const authToken = '642e361e7f88cb42c2cb525b886e8254'
const client = new twilio (accountSid, authToken)

module.exports = {
    register: async(req, res) => {
        const {email, password} = req.body;
        const db = req.app.get('db');
        
        let foundUser = await db.customer.check_customer([email])
        if(foundUser[0]) {
            return res.status(400).send('Email is already in use')
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        let registeredUser = await db.customer.register_customer([email, hash])

        let customerCart = await db.cart.create_cart(registeredUser[0].customer_id);
        let sessionCustomer = {...registeredUser[0], ...customerCart[0]};

        req.session.user = sessionCustomer
        // console.log(req.session.user)
        return res.status(201).send(req.session.user)
    },
    login: async(req, res) => {
        const {email, password} = req.body;
        const db = req.app.get('db');

        let foundUser = await db.customer.check_customer(email);
        if(!foundUser[0]) {
            return res.status(400).send('Email is not found')
        }
        const authorized = bcrypt.compareSync(password, foundUser[0].password)
        if(!authorized) {
            return res.status(401).send('Incorrect Password')
        }
        delete foundUser[0].password;
        // req.session.user = foundUser[0]
        // console.log(req.session.user)
        // console.log(email)

        let customerCart = await db.cart.find_cart(foundUser[0].customer_id);
        let sessionCustomer = {...foundUser[0], ...customerCart[0]};

        req.session.user = sessionCustomer
        return res.status(202).send(req.session.user)
    },
    logout: (req,res) => {
        req.session.destroy()
        res.sendStatus(200)
    },
    check: (req, res) => {
        if(req.session.user) {
            res.status(200).send(req.session.user)
        }
    },
    email: async (req, res) => {
        const {email} = req.params;
        console.log(req.params)
        try {
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                service: 'gmail',
                secure: false,
                requireTLS: true,
                auth: {
                    user: EMAIL,
                    pass: PASSWORD
                }
            })

            let info = await transporter.sendMail({
                from: `Modern, Young Lee <${EMAIL}>`,
                to: email,
                subject: 'NodeMailer Test',
                text: 'Thank you for signing up Modern Furniture',
                html: `<div>This is Modern Furniture</div>`,
            }, (err, res) => {
                if(err) {
                    console.log(err)
                }   else {
                    res.status(200).send(info)
                }
            })
        } catch(err) {
            res.status(500).send(err)
        }
        // console.log(req.body)
    },
    text: async (req, res) => {
        const {recipient} = req.params
        console.log(req.params)

        client.messages.create({
            body: 'Thank you for subscribing Modern Furniture',
            to: '+1' + recipient,
            from: '+12058463173'
        })
        .then(() => res.sendStatus(200))
        .catch(err => console.log(err))
    }
}
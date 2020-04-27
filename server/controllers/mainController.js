module.exports= {
    getProducts: (req, res) => {
        console.log(req.params)
        const {category} = req.params
        const db = req.app.get('db')
        db.products.get_category(category)
        .then(result => res.status(200).send(result))
        .catch(err => res.status(500).send(err))
    },
    getOneProduct: (req, res) => {
        const db = req.app.get('db')
        const {product_id} = req.params
        db.products.get_one_product(product_id)
        .then(product => res.status(200).send(product))
        .catch(err => res.status(500).send(err))
    },
    addToCart: (req, res) => {
        const {cart_id, product_id, price} = req.body
        const db = req.app.get('db')
        db. cart.add_to_cart(cart_id, product_id, price)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    },
    getCart: (req, res) => {
        console.log(req.params)
        const {id} = req.params
        const db = req.app.get('db')
        db.cart.get_cart(id)
        .then(items => res.status(200).send(items))
        .catch(err => res.status(500).send(err))
    },
    deleteCartItem: (req, res) => {
        const {id} =req.params;
        const db = req.app.get('db')
        db.cart.delete_cart_item(id)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    },
    paidItem: async (req, res) => {
        const {id} = req.params;
        const db = req.app.get('db')
        await db.cart.paid_cart(id)

        let userCart = await db.cart.create_cart(id)
        let sessionUser = {...req.session.user, cart_id: userCart[0].cart_id}
        req.session.user = sessionUser
        res.status(200).send(req.session.user)
    }
}
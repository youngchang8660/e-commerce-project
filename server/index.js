require('dotenv').config()
const express = require('express'),
      session = require('express-session'),
      massive = require('massive'),
      cors = require('cors'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
      authCtrl = require('./controllers/authController'),
      mainCtrl = require('./controllers/mainController'),
      port = SERVER_PORT,
      path = require('path'),
      app = express();


app.use(express.json())
app.use(cors())
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60}
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db)
    console.log('db connected')
})

//twilio text
app.post('/api/text/:recipient', authCtrl.text)

//authController endpoints
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)
app.get('/api/check-user', authCtrl.check)
app.post('/api/email/:email', authCtrl.email)


//mainController endpoints
app.get('/api/products/:category', mainCtrl.getProducts)
app.get('/api/products/:category/:product_id', mainCtrl.getOneProduct)
app.post('/api/cart-item', mainCtrl.addToCart)
app.get('/api/cart/:id', mainCtrl.getCart)
app.delete('/api/cart-item/:id', mainCtrl.deleteCartItem)
app.put('/api/purchase-cart/:id', mainCtrl.paidItem)

app.use(express.static(__dirname + '/../build'))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
})

app.listen(port, () => console.log(`Server running on ${port}`))
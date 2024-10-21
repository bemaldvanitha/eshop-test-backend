const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const products = require('./products.js');

let cart = [];

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json({ strict: false }));
app.use(cors());

app.get('/api/products/', (req, res) => {
    res.status(200).send({ products: products });
});

app.post('/api/cart', (req, res) => {
    const { id } = req.body;
    /*const cartIdx = cart.findIndex(cart => cart.productId === id);

    if(cartIdx !== -1){
        cart[cartIdx].quantity++;
    }else{
        cart.push({ productId: id, quantity: 1 });
    }*/

    cart.push(id);

    res.status(200).send({ message: 'product added to cart' })
});

app.get('/api/cart', (req, res) => {
    const cartAddedProducts = products.filter((product, index) =>
        cart.includes(product.id));
    res.status(200).send({ cart: cartAddedProducts });
});

app.delete('/api/cart/:id', (req, res) => {
    const id = req.params.id;
    cart = cart.filter(cartItem => cartItem.id === id);
    console.log(cart);

    res.status(200).send({ message: 'product deleted to cart' });
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
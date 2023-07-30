const path = require('path');

const express = require('express');

// const rootDir = require("../util/path");
// const adminData = require('./admin');

const shopController = require('../controllers/shop');

const router = express.Router();

// router.get('/', (req, res, next) => {
//     // this data is shared among all users
//     console.log(adminData.products);

//     // builds the absolute path
//     // ../ => go up by one level
//     res.sendFile(path.join(rootDir, 'views', 'shop.html'));
// });

// rendering shop.pug
// place specific route above the dynamic route
router.get('/', shopController.getIndex);
router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);
router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.post('/create-order', shopController.postOrder);

router.get('/orders', shopController.getOrders);
router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

module.exports = router;
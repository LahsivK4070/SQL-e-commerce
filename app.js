// const http = require("http");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
// const expressHbs = require('express-handlebars');

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
// const rootDir = require("./util/path");
const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const app = express();

// set any values globally on express application
// view engine key : enalbe view template

// regirster a new template engine
// app.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'}));
// app.set('view engine', 'hbs');

// compile dynamic templates with pug engine and where to find these templates
// app.set('view engine', 'pug');
// app.set('views', 'views');

// using ejs
app.set('view engine', 'ejs');
app.set('views', 'views');

// parse bodies send through a form
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// // use allow us to add a new middleware function
// app.use((req, res, next) => {
//     console.log("I am in middleware");
//     next(); //allow the request to moves to the next middleware in line
// });

// use use pattern matching for routes
// take care of the order of the routes

app.use((req, res, next) => {
    User.findByPk(1).then((user) => {
        req.user = user;
        next();
    }).catch((err) => {
        console.log(err);
    });
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.error404);


// const server = http.createServer(app);

// associations
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Product.belongsToMany(Cart, {through: CartItem});
Cart.belongsToMany(Product, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem});

sequelize.sync()
    .then((result) => {
        return User.findByPk(1);
    // console.log(result);
    }).then((user) => {
        if (!user) {
            return User.create({username: 'Vishal', email: 'vishal@gmail.com'});
        }
        return user;
    }).then((user) => { 
        return user.createCart();
    }).then((cart) => {
        app.listen(3000);
    }).catch((err) => {
        console.log(err);
    })
    
// server.listen(3000);
// app.listen(3000);
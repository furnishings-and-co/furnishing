const express = require('express');
const router = express.Router();

// GET /api/health
router.get('/health', async (req, res, next) => {
    res.status(200).send({message: "it is healthy"});
    next();
});

// ROUTER: /api/users
const usersRouter = require('./users');
router.use('/users', usersRouter);

// ROUTER: /api/products
const productRouter = require('./products');
router.use('/products', productRouter);
// ROUTER: /api/cart
const cartRouter = require('./cart');
router.use('/cart', cartRouter);
const purchasedRouter= require('./purchased')
router.use('/purchased', purchasedRouter)

// ROUTER: /api/routines
// const routinesRouter = require('./routines');
// router.use('/routines', routinesRouter);

// ROUTER: /api/routine_activities
// const routineActivitiesRouter = require('./routineActivities');
// router.use('/routine_activities', routineActivitiesRouter);

module.exports = router;
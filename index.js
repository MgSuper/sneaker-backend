const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
// hooking routers into our index
const productRoute = require('./routes/products')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const ordersRoute = require('./routes/orders')
const cartRoute = require('./routes/cart')
const port = 3000;

dotenv.config()
// connect with database might take long, it's a promise then we need to show something when we are connected
mongoose.connect(process.env.MONGO_URL).then(() => console.log('database connected')).catch((e) =>
    console.log(e)
);

// we want to pass json data, use express json
app.use(express.json({ limit: '10mb' }));
// urlencoded, 
app.use(express.urlencoded({ limit: '10mb', extended: true }));
// use productRoute in our app
// we need end point (/api/)
app.use('/api/', authRoute)
app.use('/api/products', productRoute)
app.use('/api/orders', ordersRoute)
app.use('/api/cart', cartRoute)
app.use('/api/users', userRoute)
app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${process.env.PORT}!`))
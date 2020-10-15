
const express = require('express');
const env = require('dotenv');
const mongoose = require('mongoose');
const app = express();
const path=require('path');

env.config();

mongoose.connect(
  process.env.MONGO_DB, 
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex:true
  }).then(() =>{    
    console.log("Connected to db");
  });


//Routes
const authRoutes=require('./routes/auth');
const adminRoutes=require('./routes/admin/auth');
const categoryRoutes=require('./routes/category');
const productRoutes=require('./routes/product');
const cartRoutes=require('./routes/cart');


app.use(express.json());
app.use('/public',express.static(path.join(__dirname,'uploads')));
app.use('/api',authRoutes);
app.use('/api',adminRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',cartRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running in ${process.env.PORT}`);
});
const mongoose= require('mongoose');
const { Schema } = mongoose;


const productSchema = new Schema({ 
  name:{type: String,required:true,trim:true},
  slug:{type:String,required:true,unique:true}, 
  price:{type:Number,required:true},
  description:{type:String,required:true},
  offer:{type:Number},
  productPictures:[{img:{type:String}}],
  reviews:[{userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},review:String}],
  category:{type:mongoose.Schema.Types.ObjectId,ref:'Category'},
  createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
  quantity:{type:Number,required:true},
  updatedAt:Date,
},{timestamps:true});



module.exports = mongoose.model('Product', productSchema);
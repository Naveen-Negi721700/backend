import mongoose from "mongoose"


const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },
  quantity: {
    type: Number,
    required: true
  }
});

const orderSchema = new mongoose.Schema({
  orderPrice: {
    type: Number,
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  orderItems: {
    type: [orderItemSchema],

    // also write as 

    type:[{
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      quantity: {
        type: Number,
        required: true
      }
    }]
  },
  address:{
   type:String,
   required:"true"
  },
  
  statue:{
    type:String,
    enum:['pending','cancled','delevered'],
    default:"panding"
  },

}, { timestamps: true });

export const Order = mongoose.model("Order", orderSchema);
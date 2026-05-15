import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    title: {
      type: String,   // ✅ ADD THIS
      // required: true,
    },
    price: {
      type: Number,   // ✅ ADD THIS
      // required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
],

    method: {
      type: String,
      required: true,
      enum: ["cod", "card", "upi"],
    },

    paymentInfo: {
      type: String,
    },



    phoneNo: {
      type: Number, 
      required: true,
    }, 

    address: {
      type: String,
      required: true,
    },

    status:{
      type:String,
      default:"pending",
      enum:["pending","shipped","delivered","cancelled"],
    }, 

    paidAt: {
      type: String,
    },

    subtotal: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true, // gives createdAt automatically
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
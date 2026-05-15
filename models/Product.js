import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
    },

    images: [
  {
    id: String,
    url: String
  }
],

    sold: {
      type: Number,
      default: 0,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "perfume",
        "skincare",
        "beauty",
        "other",
      ],
    },

    createdAt:{              //timestamps already keep track of this
        type:Date,
        default:Date.now()
    },
  },
  {
    // timestamps: true, // this gives you createdAt & updatedAt automatically
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
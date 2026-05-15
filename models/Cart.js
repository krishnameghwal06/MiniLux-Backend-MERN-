import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {

    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },




  },

);

// Optional: prevent duplicate product for same user
// cartSchema.index({ user: 1, product: 1 }, { unique: true });

export const Cart = mongoose.model("Cart", cartSchema);


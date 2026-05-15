import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        address: {
            type: String,
            required: true,
            trim: true,
        },

        phoneNo: {
            type: Number,
            required: true,

        },
    },
    {
        timestamps: true,
    }
);

export const Address = mongoose.model("Address", addressSchema);

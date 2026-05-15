import { Address } from "../models/Address.js";
import  TryCatch from "../utils/TryCatch.js";

export const addAddress= TryCatch(async(req,res)=>{

    const {address, phoneNo}=req.body;

    await Address.create({
        address,
        phoneNo,
        user:req.user._id,
    });

    res.status(201).json({
        message:"Address added successfully",
    });

});

export const getAllAddress=TryCatch(async(req,res)=>{
    const allAddress= await Address.find({user:req.user._id});
    res.json(allAddress);
});

export const getSingleAddress=TryCatch(async(req,res)=>{

    const singleAddress=await Address.findById(req.params.id);
    res.json(singleAddress);
}); 

export const deleteAddress=TryCatch(async(req,res)=>{

    const address= await Address.findOne({
        _id:req.params.id,
        user:req.user._id,
    });

    await address.deleteOne();
    res.json({message:"Address deleted successfully"});
    
}) 
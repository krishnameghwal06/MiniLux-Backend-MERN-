import TryCatch from "../utils/TryCatch.js";
import { Cart } from "../models/Cart.js";
import Product from "../models/Product.js";

export const addToCart = TryCatch(async (req, res) => {

    const { product } = req.body;

    const cart= await Cart.findOne({
        product:product,
        user:req.user._id
    }).populate("product");

    if (cart){
        if(cart.product.stock===cart.quantity){
            return res.status(404).json({message:"Out of stock"})
        }

        cart.quantity += 1;
        await cart.save();

        return res.status(200).json({
            message:"Item added to cart",
            // cart
        })
    }

    const cartProd=await Product.findById(product);

    if(!cartProd){
        return res.status(404).json({message:"Product not found"})
    }

    if(cartProd.stock===0){
        return res.status(404).json({message:"Out of stock"})
    }

    await Cart.create({
        product:product,
        quantity:1,
        user:req.user._id
    })

    return res.status(200).json({
        message:"Item added to cart",
        // cart
    }) 

    
})

export const removeFromCart = TryCatch(async (req, res) => {
    const cart= await Cart.findById(req.params.id);

    await cart.deleteOne();

    return res.status(200).json({
        message:"Item removed from cart",
        // cart
    })

})

export const updateCart= TryCatch(async (req, res) => {

    const {action}=req.query;
    
    if(action==="inc"){
        const {id}=req.body;
        const cart= await Cart.findById(id).populate("product");

        if(cart.quantity<cart.product.stock){
            cart.quantity+=1;
            await cart.save();

            return res.status(200).json({
                message:"Cart updated successfully",
                // cart
            })
        }

        else{
            return res.status(400).json({message:"Out of stock"});
        }

        
    }

    if(action==="dec"){
        const {id}=req.body;
        const cart= await Cart.findById(id).populate("product");

        if(cart.quantity>1){
            cart.quantity-=1;
            await cart.save();

            return res.status(200).json({
                message:"Cart updated successfully",
                // cart
            })
        }

        else{
            return res.status(400).json({message:"You have only one item"});
        }

        
    }

    
    
    
})


export const fetchCart=TryCatch(async(req,res)=>{
    const cart=await Cart.find({
        user:req.user._id
    }).populate("product");

    const sumOfQuantity=cart.reduce((total,item)=>total+item.quantity,0);

    let subTotal=0;

    cart.forEach((i)=>{

        const itemSubtotal=i.product.price*i.quantity;
        subTotal+=itemSubtotal;
        
    })

    res.json({cart,subTotal,sumOfQuantity});
})

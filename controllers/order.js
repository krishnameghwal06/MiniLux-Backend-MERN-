import { Cart } from "../models/Cart.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import TryCatch from "../utils/TryCatch.js";
import sendOrderConfirmation from "../utils/orderConf.js";




export const newOrderCod = TryCatch(async (req, res) => {

    const { method, phoneNo, address } = req.body;

    const cart = await Cart.find({
        user: req.user._id
    }).populate({
        path: "product",
        select: "title price", 
    }
    );

    if (!cart.length) return res.status(400).json({
        success: false,
        message: "Cart is empty"
    });

    let subtotal = 0;

    const items = cart.map((i) => {
        const itemsubtotal = i.product.price * i.quantity;
        subtotal += itemsubtotal;


        return {
            product: i.product._id,
            title: i.product.title,
            quantity: i.quantity,
            price: i.product.price,

        }
    });

    const order = await Order.create({
        user: req.user._id,
        items,
        address,
        method,
        phoneNo,
        subtotal,
    });

    for (let i of order.items) {
        const product = await Product.findById(i.product);
        product.stock -= i.quantity;
        product.sold += i.quantity;
        await product.save();
    }

    await Cart.deleteMany({
        user: req.user._id,
    });

    await sendOrderConfirmation({
        email: req.user.email,
        subject: "Order Confirmation",
        orderId: order._id,
        products: order.items,
        totalAmount: order.subtotal,
        address: order.address,
        paymentMethod: order.method,
        paidAt: order.paidAt,
    });

    return res.json({
        success: true,
        message: "Order placed successfully",
    });

})


export const getAllOrders = TryCatch(async(req,res)=>{

    const orders = await Order.find({user:req.user._id});
    res.json({
        success:true,
        orders:orders.reverse(),
    })
    
});

export const getAllAdminOrders = TryCatch(async(req,res)=>{
    
    if(req.user.role !== "admin") return res.status(403).json({
        success:false,
        message:"Unauthorized",
    });
    
    const orders = await Order.find().populate("user").sort({ createdAt: -1 });
    res.json({
        success:true,
        orders,
    })
});

export const getMyOrder=TryCatch(async(req,res)=>{
    const order = await Order.findById(req.params.id);
    if(!order) return res.status(404).json({
        success:false,
        message:"Order not found",
    })
    res.json({
        success:true,
        order,
    })
}) 



export const updateStatus=TryCatch(async(req,res)=>{


    if(req.user.role !== "admin") return res.status(403).json({
        success:false,
        message:"Unauthorized",
    });

    
    const order = await Order.findById(req.params.id);
    if(!order) return res.status(404).json({
        success:false,
        message:"Order not found",
    })
    
    order.status=req.body.status;
    await order.save();
    res.json({
        success:true,
        message:"Order updated successfully",
    })
})


export const getStatus=TryCatch(async(req,res)=>{

    if(req.user.role !== "admin") return res.status(403).json({
        success:false,
        message:"Unauthorized",
    });


    const cod=await Order.find({method:"cod"}).countDocuments();
    const card=await Order.find({method:"card"}).countDocuments();
    const upi=await Order.find({method:"upi"}).countDocuments();

    const products=await Product.find();

    const data=products.map((prod)=>({
        title:prod.title,
        sold:prod.sold,
    }))

    res.json({
        success:true,
        data,
        cod,
        card,
        upi,
    })

    

    
})
 


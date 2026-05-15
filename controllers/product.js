import bufferGenerator from "../utils/bufferGenerator.js";
import TryCatch from "../utils/TryCatch.js";
import cloudinary from "cloudinary";
import Product from "../models/Product.js";


export const createProduct = TryCatch(async (req, res) => {

    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Unauthorized" })
    }

    const { title, description, category, price, stock } = req.body;

    const files = req.files;

    if (!files || files.length === 0) {
        return res.status(400).json({ message: "Please upload images" })
    }

    const imageUploadPromises = files.map(async (file) => {

        const fileBuffer = bufferGenerator(file);

        const result = await cloudinary.v2.uploader.upload(fileBuffer.content)

        return {
            id: result.public_id,
            url: result.secure_url
        }
    });

    const uploadedImage = await Promise.all(imageUploadPromises);

    const product = await Product.create({
        title,
        description,
        category,
        price,
        stock,
        images: uploadedImage
    })

    res.json({
        message: "Product created successfully",
        product
    })
});

export const getAllProducts = TryCatch(async(req,res)=>{

    const {search, category, page, sortByPrice}=req.query;

    const filter= {};

    if (search){
        filter.title={
            $regex:search,
            $options:"i",

        };
    }

    if(category){
        filter.category=category;
    }

    const limit=8;
    const skip=(page-1)*limit;

    let sortOption = {createdAt: -1}
    if(sortByPrice){
        if(sortByPrice=="lowToHigh"){
            sortOption={price:1}
        }
        else if(sortByPrice=="highToLow"){
            sortOption={price:-1}
        }
    }

    const products= await Product.find(filter)
    .sort().limit(limit).skip;  

    const categories= await Product.distinct("category")

    const newProduct= await Product.find().sort("-createdAt").limit(4);

    const countProduct= await Product.countDocuments();

    const totalPages= Math.ceil(countProduct/limit);

    res.json({
        success:true,
        products,
        categories,
        totalPages,
        newProduct,
        
        
    })

})

export const getSingleProduct = TryCatch(async(req,res)=>{

    const product=await Product.findById(req.params.id);

    const relatedProduct =await Product.find({
        category:product.category,
        _id:{$ne:product._id}
    })
    .limit(4)
    
    res.json({
        success:true,
        product,
        relatedProduct
    })

}) 

export const updateProduct = TryCatch(async(req,res)=>{
    if(req.user.role!=="admin"){
        return res.status(403).json({message:"Unauthorized"})
    }
    
    // const {id}=req.params;
    // const product=await Product.findById(id);
    const {title,description,category,price,stock}=req.body;
    const updateFiles={};
    
    if(title)updateFiles.title=title;
    if(description)updateFiles.description=description;
    if(category)updateFiles.category=category;
    if(price)updateFiles.price=price;
    if(stock)updateFiles.stock=stock;
    
    const updatedProduct=await Product.findByIdAndUpdate(req.params.id,updateFiles,{new:true, runValidators:true});


    if(!updateFiles){
        return res.status(404).json({message:"Please upload new files "})
    }
    
    res.json({
        message:"Product updated successfully",
        updatedProduct
    })
    
})






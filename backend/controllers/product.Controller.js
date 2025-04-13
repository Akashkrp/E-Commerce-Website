import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

const addProduct = asyncHandler(async (req,res) =>{
    try {
        
        const{name, description, price, categroy, quantity, brand} = req.fields
        
        //Validation
        switch (true) {
            case !name:
                return res.json({error: "brand is required"})
            case !description:
                return res.json({error: "Name is required"})
            case !name:
                return res.json({error: "description is required"})
            case !price:
                return res.json({error: "price is required"})
            case !category:
                return res.json({error: "category is required"})
            case !quantity:
                return res.json({error: "quantity is required"})
            default:
                break;
        } 

        const product = new Product({...req.fields})
        await product.save()
        res.json(product);
        
    } catch (error) {
        console.error(error)
        res.status(400).json(error.message)
    }
});





export {addProduct, updateProductDetails};
const Cart= require('../models/Cart')
const User=require('../models/Customer')
const Product=require('../models/CompanyProduct')
   


const addToCart=async(req,res)=>{
   
    // console.log(user)

    let cartItem=await Cart.create({
        productId: req.body.productId,
        userId: req.body.userId
    })
    let user=await User.findOne({_id:req.body.userId})
    if(user){
        await user.updateOne({$push:{cart:req.body.productId}});
    }
    const product = await Product.findOne({_id:req.body.productId})
        // await user.price.dele(product.price)
        // console.log(user.price)
    await user.updateOne({$push:{price:product.price,productId:req.body.productId}});
    
    // console.log(product.price)
    

    res.status(200).json({success:true,msg:cartItem})
}
const delToCart=async(req,res)=>{
    const item=await Cart.findOne({productId:req.body.productId})
    console.log(item._id.valueOf())
    const user=await User.findOne({_id:item.userId})
    let product=await Product.findOne({_id:req.body.productId})

    if(user.cart.includes(req.body.productId)){
        console.log("yes")

    
        // await user.updateOne({$pull:{price:product.price}});
        let priceArr=user.price
        for(let i = 0; i<priceArr.length; i++){
            if(priceArr[i]===product.price){
                priceArr.splice(i, 1);
                await user.updateOne({$set:{price:priceArr}});
                break;
            }
        }
        
        //  user.price=priceArr
       
        // console.log(user.price)
        let productArr=user.cart
        for(let i = 0; i<productArr.length; i++){
            if(productArr[i]===req.body.productId){
                productArr.splice(i, 1);
                
                break;
            }
         
        }
        await user.updateOne({$set:{cart:productArr}});
        // await user.updateOne({$pull:{cart:req.body.productId}})
        await Cart.deleteOne({_id:item._id.valueOf()})
        
    res.status(200).send("delete successfully")
    }
    else{
        res.status(404).send("something went wrong or not found")
    }
    
}

module.exports={
    addToCart,
    delToCart
}
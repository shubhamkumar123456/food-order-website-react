const Product = require('../models/CompanyProduct')
const Company = require('../models/Company')

const create=async(req,res)=>{
    let company=await Company.findOne({_id:req.body.companyId})
    // console.log(company)
  
    let product=await Product.create({
        companyId: req.body.companyId,
        productName: req.body.productName,
        quantity:req.body.quantity,
        price: req.body.price,
        desc:req.body.desc,
        img:req.body.img,
        category: req.body.category
    })
    product.save()
    try {
    if(company){
        console.log(product.id)
        await company.updateOne({$push:{Fooditems:product._id}});
    }
    res.status(200).send("create successfully")
   } catch (error) {
    console.log(error)
   }
}

const get=async(req,res)=>{
   try {
    let items=await Product.find({})
    if(items){
        res.status(200).send(items)
    }
    else{
        res.status(404).send("no items found")
    }
   } catch (error) {
    console.log(error)
   }
   
}
const update=async(req,res)=>{
    const {productName,quantity,price,desc}=req.body
    let obj={};
    if(productName){obj.productName=productName};
    if(quantity){obj.quantity=quantity};
    if(price){obj.price=price};
    if(desc){obj.desc=desc};

    let item=await Product.findOne({id:req.params.id})
    if(item){
      const newItem= await Product.findByIdAndUpdate(req.params._id,{$set:obj},{new:true})
       console.log(newItem)
        res.status(200).send("updated successfully")
    }else{
        res.status(404).send("item not found")
    }
   
}
const delProduct=async(req,res)=>{
    const product=await Product.findById(req.body.id)
    console.log(product)
    if(product){
        const company=await Company.findOne({_id:product.companyId})
        console.log(company.Fooditems)
        if(company.Fooditems.includes(product.id)){
            await company.updateOne({$pull:{Fooditems:product._id}})
        }
        await Product.deleteOne({_id:req.body.id})
        res.status(200).send("delete successfully")
    }else{
        res.status(404).send("Not Found")
    }
  
}

const singleget=async(req,res)=>{
    try {
    let companyId=await Company.findById(req.body.companyId)
    companyId=(companyId._id.valueOf())
    let items=await Product.find({companyId:companyId})
 
    if(items){
        console.log(items)
        res.status(200).send(items)
    }else{
        res.status(404).send("Not Found")
    }
  } catch (error) {
    console.log(error)
  }
}

const getOne=async(req,res)=>{
   try {
    const product=await Product.findById(req.body.id);
    if(!product){
        res.status(404).send({message: 'Product not found'});
    }
    else{
        res.status(200).send(product);
    }
   } catch (error) {
    console.log(error);
   }
}



module.exports ={
    create,
    get,
    update,
    delProduct,
    singleget,
    getOne
}
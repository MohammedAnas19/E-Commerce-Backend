const slugify  = require('slugify');
const Category = require('../models/category');

exports.addCategory=(req,res)=>{

    let categoryUrl;

    const categoryObj={
        name:req.body.name,
        slug:slugify(req.body.name),
    }

    if(req.file){
        categoryUrl=process.env.API+"/public/"+req.file.filename;
        categoryObj.categoryImage=categoryUrl;
   }

    if(req.body.parentId){
        categoryObj.parentId=req.body.parentId
    }
    const cat=new Category(categoryObj);
    cat.save((error,category)=>{
        if(error){return res.status(400).json({message:"Something went WRONG in Category Creation",error:error});
    }

    if(category){return res.status(201).json({message:"Category Created SUCCESSFULLY",category:category});
    }
    });
}


function createCategories(categories,parentId=null){
    const categoryList=[];
    let category;
    if(parentId===null){
        category=categories.filter(cat => cat.parentId==undefined);
    }
    else{
        category=categories.filter(cat => cat.parentId==parentId); 
    }
    for(let cate of category){
        categoryList.push({
            _id:cate._id,
            name:cate.name,
            slug:cate.slug,
            children:createCategories(categories,cate._id)
        });
    }
    return categoryList;
}

exports.getCategories=(req,res)=>{
    Category.find({})
    .exec((error,categories)=>{
        if(error){return res.status(400).json({message:"Something went WRONG in Category Fetchimg",error:error});
    }
        if(categories){
            const categoryList=createCategories(categories);
            return res.status(200).json({categoryList});
    } 
    })
}
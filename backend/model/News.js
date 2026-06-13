import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    title:{ type:String, required:[ true,"Title is required"], trim:true },

    slug:{ type:String, required:[ true, "Slug is required"], unique:true},

    summary:{ type:String },

    content:{ type:String, required:[true, "Content is requied"], trim:true},

    category:{ type:String, required:[true, "Category is requied"], trim:true},

    images:{ type:[String], required:[true, "Atleast one image is required"] },

    status:{
        type:String,
        enum:[ "draft",
        "in-review",
        "scheduled",
        "published"],
        default:"draft"
    },

    publishDate:{type:Date},

    createdBy:{type: mongoose.Schema.Types.ObjectId, ref: "Admin", required:true},

    approvedBy:{type:mongoose.Schema.Types.ObjectId,ref:"Admin"},

    isDeleted:{type:Boolean, default:false}

},{timestamps:true})

const News = mongoose.model("News",newsSchema)
export default News


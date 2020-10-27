const mongoose=require("mongoose");
const password=process.env.ATLAS_PASS;
const dbname="kontakti-api";

const url=`mongodb+srv://dev_marko:${password}@cluster0.m0eke.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(result=>{
    console.log("Database is connected");
}).catch(error=>{
    console.log("Database error: ", error.message);
})

const kontaktSchema=new mongoose.Schema({
    imeprezime:{
        type:String,
        required:true,
        minlength:5
    },
    email:{
        type:String,
        required:true,
        minlength:5
    }
});

kontaktSchema.set("toJSON",{
    transform:(doc,ret)=>{
        ret.id=ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret
    }
})

module.exports=mongoose.model("Kontakt",kontaktSchema,"kontakti");
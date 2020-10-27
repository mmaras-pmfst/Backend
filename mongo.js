const mongoose=require("mongoose");
const password="zavrsni2020";
const dbname="kontakti-api";

const url=`mongodb+srv://dev_marko:${password}@cluster0.m0eke.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
})

const kontaktSchema=new mongoose.Schema({
    imeprezime:String,
    email:String
});
const Kontakt=mongoose.model("Kontakt",kontaktSchema,"kontakti");

// const noviKontakt=new Kontakt({
//     imeprezime:"joso josic",
//     email:"joso@gmail.com"
// });

// Kontakt.find({}).then(result=>{
//     result.forEach(p=>{
//         console.log(p);
//     });
//     mongoose.connection.close();
// })
// noviKontakt.save().then(result=>{
//     console.log("Novi kontakt dodan");
//     console.log(result);
//     mongoose.connection.close();
// });
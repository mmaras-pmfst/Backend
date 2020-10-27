const express=require("express");

const app=express();

const Kontakt=require("./models/kontakti");

const cors=require("cors");
app.use(cors());
app.use(express.json());
app.use(express.static("build"))

const zahtjevInfo=(req,res,next)=>{
    console.log("Metoda: ",req.method);
    console.log("Putanja: ",req.path);
    console.log("Tijelo: ",req.body);
    console.log("------------------");
    next();

}
app.use(zahtjevInfo);

let kontakti=[
    {
        id:1,
        imeprezime:"Ante Antic",
        email:"anteantic@gmail.com"
    },
    {
        id:2,
        imeprezime:"Ivan Ivic",
        email:"ivanivic@gmail.com"
    },
    {
        id:7,
        imeprezime:"Mate Matic",
        email:"matematic@gmail.com"
    }
]

app.get('/api/kontakti',(req,res)=>{
    Kontakt.find({}).then(result=>{
        res.json(result)
    })
})

app.get('/api/kontakti/:id',(req,res,next)=>{
    const id=req.params.id;
    Kontakt.findById(id).then(result=>{
        if(result){
            res.json(result)
        }else{
            res.status(404).end()
        }
    }).catch(err=> next(err))
});

app.delete('/api/kontakti/:id',(req,res,next)=>{
    const id=req.params.id;
    console.log("Brisanje")
    Kontakt.findByIdAndRemove(id).then(result=>{
        res.status(204).end()
    }).catch(err=>next(err))
});

app.put('/api/kontakti/:id',(req,res,next)=>{
    const id=req.params.id;
    const podatak=req.body;

    const kontakt={
        imeprezime:podatak.imeprezime,
        email:podatak.email
    }
    Kontakt.findByIdAndUpdate(id,kontakt,{new:true}).then(result=>{
        res.json(result)
    }).catch(err=>next(err))

})

app.post('/api/kontakti',(req,res,next)=>{
    const podatak=req.body;
    
    const kontakt=new Kontakt({
        imeprezime:podatak.imeprezime,
        email:podatak.email
    })
    kontakt.save().then(result=>{
        console.log("Kontakt dodan");
        res.json(result);
    }).catch(err=>next(err));
    
})

const errorHandler=(err, req, res, next)=>{
    console.log("Middleware za pogreške!");
    if(err.name="CastError"){
        return res.status(400).send({error:"Pogrešan format ID parametra"})
    }else if(err.name=="MongoParserError"){
        return res.status(400).send({error:"Krivi format podatka"})
    }else if(err.name==="ValidationError"){
        return res.status(400).send({error:"Krivi format podatka"})
    }
}
app.use(errorHandler)

const PORT=process.env.PORT || 3001;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
const express=require("express");

const app=express();

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
    res.json(kontakti);
})

app.get('/api/kontakti/:id',(req,res)=>{
    const id=Number(req.params.id);
    const kontakt=kontakti.find(k=>k.id===id);
    if(kontakt){
        res.json(kontakt);
    }
    else{
        res.status(404).end();
    }
});

app.delete('/api/kontakti/:id',(req,res)=>{
    const id=Number(req.params.id);
    kontakti=kontakti.filter(k=>k.id!==id);
    res.status(204).end();
});

app.put('/api/kontakti/:id',(req,res)=>{
    const id=Number(req.params.id);
    const podatak=req.body;
    kontakti=kontakti.map(k => k.id !== id ? k : podatak);
    res.json(podatak);

})

app.post('/api/kontakti',(req,res)=>{
    const maxId=kontakti.length>0 ? Math.max(...kontakti.map(k => k.id)) : 0;
    const podataka=req.body;
    if(!podataka.imeprezime){
        return res.status(400).json({
            error:"Nedostaje unos ime i prezime!"
        })
    }
    const kontakt={
        id:maxId+1,
        imeprezime:podataka.imeprezime,
        email:podataka.email
    }
    kontakti=kontakti.concat(kontakt);
    res.json(kontakt);
})
const PORT=process.env.PORT || 3001;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
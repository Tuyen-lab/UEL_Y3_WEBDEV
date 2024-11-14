const express = require('express')
const cors= require("cors")
const app= express()
const port = 3000
const Product = require('./models/product')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const db = require('./config/db')
const product = require('./models/product')
const Rented = require('./models/rented_home')
const User  = require('./models/user')
db.connect()
//API
app.get("/product",cors(), (req, res)=>(
    Product.find({})
    .then(product => res.json(product))
    .catch(err => res.status(500).json({error:err.message}))
    )
)
app.get("/rented",cors(), (req, res)=>(
    Rented.find({})
    .then(rental => res.json(rental))
    .catch(err => res.status(500).json({error:err.message}))
    )
)
app.get("/user",cors(), (req, res)=>(
    User.find({})
    .then(user => res.json(user))
    .catch(err => res.status(500).json({error:err.message}))
    )
)
app.post("/rented",cors(), async(req, res)=> {
    // console.log(req.body);
    console.log('Received request to add product:', req.body)
    const rental = new Rented ({
        manha: req.body.manha,
        gia: req.body.gia,
        host: req.body.host,
        ngaythue: req.body.ngaythue,
        ngaytra:  req.body.ngaytra,
        detail:  req.body.detail,
    });
    try {
        await rental.save()
        res.send("Success!")
    } catch (err){
        res.json({message: err.message})
    }

})
app.post("/user",cors(), async(req, res)=> {
    console.log('Received request to add product:', req.body)
    const user  = new User ({
    username: req.body.username,
    pass: req.body.pass,
    phone: req.body.phone,
    email: req.body.email,
    });
    try {
        await user.save()
        res.send("Success!")
    } catch (err){
        res.json({message: err.message})
    }

})
app.post("/product",cors(), async(req, res)=> {
    // console.log(req.body);
    console.log('Received request to add product:', req.body)
    const product = new Product ({
        name: req.body.name,
        price: req.body.price
    });
    try {
        await product.save()
        res.send("Success!")
    } catch (err){
        res.json({message: err.message})
    }
    
})
//Update product
app.patch("/:id", async(req,res)=>{
    
    if(req.params.id){
        try{
            await Product.updateOne({_id: req.params.id},{$set:{name: req.body.name, price: req.body.price}})
            res.send("Success!!")

        }catch(error){
            res.json({Error: error.message})
        }
    }

})

//Delete product
app.delete('/:id', async(req, res) =>{
    if (req.params.id){
        try{
            await Product.deleteOne({_id: req.params.id})
            res.json({status: 'success'});
        } catch (err) {
            res.json({message: err.message})
        }
    }
})

  
app.listen(port, () =>{
    console.log(`Server listening on port: ${port}`)
})


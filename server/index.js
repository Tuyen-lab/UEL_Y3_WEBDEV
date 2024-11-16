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
        cus: req.body.cus,
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
    ma: req.body.ma,// Mã định danh
    toado: req.body.toado, // Tọa độ vị trí [latitude, longitude]
    chuho: req.body.chuho, // Chủ hộ
    title: req.body.title, // Tiêu đề
    style:req.body.style, // Phong cách
    ten: req.body.ten, // Tên homestay
    country:req.body.country, // Quốc gia
    provin: req.body.provin, // Tỉnh/Thành phố
    city: req.body.city, // Thành phố/Huyện
    ngaynhan: req.body.ngaynhan, // Ngày nhận phòng
    ngaytra:req.body.ngaytra, // Ngày trả phòng
    gia: req.body.gia, // Giá thuê
    thumnail: req.body.thumnail, // Hình ảnh đại diện
    anh: req.body.anh, // Danh sách hình ảnh
    phongngu:req.body.phongngu, // Số phòng ngủ
    giuong: req.body.giuong, // Số giường
    phongtam: req.body.phongtam, // Số phòng tắm
    tiennghi: req.body.tiennghi, // Danh sách tiện nghi
    mota: req.body.mota}, // Mô tả chi tiết
);
    try {
        await product.save()
        res.send("Success!")

        
    } catch (err){
        res.json({message: err.message})
    }
    
})
//Update product
app.patch(":id", async(req,res)=>{
    
    if(req.params.id){
        try{
            await Product.updateOne({_id: req.params.id},{$set:{name: req.body.name, price: req.body.price}})
            res.send("Success!!")
            console.log('zfsdfd')
        }catch(error){
            res.json({Error: error.message})
        }
    }

})

//Delete product
app.delete('/:ma', async(req, res) =>{
    if (req.params.ma){
        try{
            await Product.deleteOne({ma: req.params.ma})
            res.json({status: 'success'});
        } catch (err) {
            res.json({message: err.message})
        }
    }
})
app.delete('/rented/:manha', async(req, res) =>{
    console.log('sdfsdfsdf')
    if (req.params.manha){
        try{
            await Rented.deleteOne({manha: req.params.manha})
            res.json({status: 'success'});
            
        } catch (err) {
            res.json({message: err.message})
        }
    }
})

  
app.listen(port, () =>{
    console.log(`Server listening on port: ${port}`)
})


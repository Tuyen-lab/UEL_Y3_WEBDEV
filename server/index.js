
const express = require('express')
const cors= require("cors")
const app= express()
const port = 3000
const Product = require('./models/product')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const multer = require('multer');
const db = require('./config/db')
const product = require('./models/product')
const Rented = require('./models/rented_home')
const User  = require('./models/user')
const Wish  = require('./models/wishlist')
const Image = require('./models/images');
const Staying = require('./models/staying');
const History = require('./models/history');
const Comment = require('./models/comment');
const comment = require('./models/comment')
db.connect()
//API
app.get("/product",cors(), (req, res)=>(
    Product.find({})
    .then(product => res.json(product))
    .catch(err => res.status(500).json({error:err.message}))
    )
)
app.get("/comment",cors(), (req, res)=>(
    Comment.find({})
    .then(comment => res.json(comment))
    .catch(err => res.status(500).json({error:err.message}))
    )
)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.post('/upload', upload.single('image'), async (req, res) => {

    const { file } = req;
  
    if (!file) {
      return res.status(400).send({ message: 'Không có file nào được chọn!' });
    }
    console.log('sdfsdfsf')
    const newImage = new Image({
      filename: file.originalname,
      contentType: file.mimetype,
      data: file.buffer,
      description: req.body.description || ''
    
    });
  
    await newImage.save();
  
    res.status(200).send({ message: 'Ảnh tải lên thành công!', imageId: newImage._id });
  });
app.get("/rented",cors(), (req, res)=>(
    Rented.find({})
    .then(rental => res.json(rental))
    .catch(err => res.status(500).json({error:err.message}))
    )
)
app.get("/staying",cors(), (req, res)=>(
    Staying.find({})
    .then(staying => res.json(staying))
    .catch(err => res.status(500).json({error:err.message}))
    )
)
app.get("/user",cors(), (req, res)=>(
    User.find({})
    .then(user => res.json(user))
    .catch(err => res.status(500).json({error:err.message}))
    )
)
app.get("/wish",cors(), (req, res)=>(
    Wish.find({})
    .then(wish => res.json(wish))
    .catch(err => res.status(500).json({error:err.message}))
    )
)
app.get("/upload",cors(), (req, res)=>(
    Image.find({})
    .then(image => res.json(image))
    .catch(err => res.status(500).json({error:err.message}))
    )
)
app.get("/history",cors(), (req, res)=>(
    History.find({})
    .then(history => res.json(history))
    .catch(err => res.status(500).json({error:err.message}))
    )
)
app.get('/upload/:id', async (req, res) => {
    try {
      const image = await Image.findById(req.params.id);
      if (!image) {
        return res.status(404).send('Image not found');
      }
      
      res.set('Content-Type', image.contentType);  // Đặt Content-Type cho file
      res.send(image.data);  // Trả về binary data của ảnh
    } catch (err) {
      res.status(500).send('Error fetching image');
    }
  });
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
app.post("/staying",cors(), async(req, res)=> {
    // console.log(req.body);
    console.log('Received request to add product:', req.body)
    const staying = new Staying ({
        manha: req.body.manha,
        gia: req.body.gia,
        host: req.body.host,
        cus: req.body.cus,
        ngaythue: req.body.ngaythue,
        ngaytra:  req.body.ngaytra,
        detail:  req.body.detail,
    });
    try {
        await staying.save()
        res.send("Success!")
    } catch (err){
        res.json({message: err.message})
    }

})
app.post("/comment",cors(), async(req, res)=> {
    // console.log(req.body);
    console.log('Received request to add product:', req.body)
    const comment = new Comment ({
        manha: req.body.manha,
        host: req.body.host,
        cus: req.body.cus,
        sao: req.body.sao,
        comment: req.body.comment,
      
    });
    try {
        await comment.save()
        res.send("Success!")
    } catch (err){
        res.json({message: err.message})
    }

})
app.post("/history",cors(), async(req, res)=> {
    // console.log(req.body);
    console.log('Received request to add product:', req.body)
    const history = new History ({
        manha: req.body.manha,
        gia: req.body.gia,
        host: req.body.host,
        cus: req.body.cus,
        ngaythue: req.body.ngaythue,
        ngaytra:  req.body.ngaytra,
        detail:  req.body.detail,
    });
    try {
        await history.save()
        res.send("Success!")
    } catch (err){
        res.json({message: err.message})
    }

})
app.post("/user",cors(), async(req, res)=> {
    // console.log(req.body);
    console.log('Received request to add product:', req.body)
    const user = new User ({
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

app.post("/wish",cors(), async(req, res)=> {
    console.log('Received request to add product:', req.body)
    const wish  = new Wish ({
    cus: req.body.cus,
    manha: req.body.manha
    });
    try {
        await wish.save()
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
app.patch("/user/:username", async(req,res)=>{
    console.log('Received request to update product:', req.body)
    if(req.params.username){
        try{
            await User.updateOne({username: req.params.username},{$set:{  username: req.body.username,
                pass: req.body.pass,
                phone: req.body.phone,
                email: req.body.email,}})
            res.send("Success!!")
   
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
app.delete('/wish/:cus/:manha', async(req, res) =>{
    
    if (req.params.manha && req.params.cus ){
        try{
            console.log(req.params.cus, req.params.manha);
            await Wish.deleteOne({
                cus: req.params.cus,
                manha: req.params.manha
                })
            res.json({status: 'success'});
    
        } catch (err) {
            res.json({message: err.message})
        }
    }
})
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
app.delete('/rented/:manha/:cus', async(req, res) =>{
    console.log('sdfsdfsdf')
    if (req.params.manha &&  req.params.cus){
        try{
            await Rented.deleteOne({manha: req.params.manha,cus: req.params.cus,})
            res.json({status: 'success'});
            
        } catch (err) {
            res.json({message: err.message})
        }
    }
})
app.delete('/staying/:manha/:cus', async(req, res) =>{
    console.log('sdfsdfsdf')
    if (req.params.manha &&  req.params.cus){
        try{
            await Staying.deleteOne({manha: req.params.manha,cus: req.params.cus,})
            res.json({status: 'success'});
            
        } catch (err) {
            res.json({message: err.message})
        }
    }
})

  
app.listen(port, () =>{
    console.log(`Server listening on port: ${port}`)
})


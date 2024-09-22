require('dotenv').config()
const express = require('express')
const path = require('path')
const bcrypt = require('bcrypt');
const mongoose = require("mongoose")
const cors = require('cors');
const jwt = require("jsonwebtoken")
const cookieParser = require('cookie-parser');
const { profile } = require('console')
const { type } = require('os')

const time = ['11.00-12.00', '12.00-13.00', '13.00-14.00',
    '14.00-15.00', '15.00-16.00', '16.00-17.00',
    '17.00-18.00', '18.00-19.00', '19.00-20.00',
    '20.00-21.00', '21.00-22.00', '22.00-23.00'
]


const { PORT, db } = process.env
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extends: false }))
app.use(cookieParser());
try {
    mongoose.connect(db)
    console.log("Connected")
}
catch {
    console.log("Can't connect")
}

app.use(cors());

const postSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    profile: {
        type: String,
        require: true
    },
    text: {
        type: String,
        require: true
    },
    comment: {
        type: Array,
        require: true
    },
    date: {
        type: String,
        require: true
    }
})

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true
    },
    profile: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    history: {
        type: Array,
        require: true
    },
    index:{
        type:Array,
        require:true
    },
    type:{
        type:Array,
        require:false
    },
    date:{
        type:Array,
        require:false
    }
})
const cookieInvalid = mongoose.Schema({
    token: {
        type: String,
        require: true
    }
})
const listBordgameSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    prize:{
        type:Number,
        require:true
    }
})
const reservePlaceSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:true
    },
    reserve:{
        type:Array,
        require:true
    }
})
const reserveGameSchema =mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:true
    },
    reserve:{
        type:Array,
        require:true
    },
})

const userModel = mongoose.model('users', userSchema)
const postModel = mongoose.model('post', postSchema)
const cookieModel = mongoose.model('invalidCookie', cookieInvalid)
const listBordgameModel =mongoose.model('listGame',listBordgameSchema)
const reservePlaceModel = mongoose.model('resevePlace',reservePlaceSchema)
const reserveGameModel = mongoose.model('reseveGame',reserveGameSchema)

function checkCookie(req, res, next) {
    const token = req.body.token
    if (token == null) { res.send({ isLogin: 'false',
        login:'false'
     }) };
    jwt.verify(token, "saighub", (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.post('/', checkCookie, (req, res) => {
    console.log(req.user)
    res.send({
        username: req.user.username,
        profile: req.user.profile,
        status: req.user.status,
        isLogin: req.user.isLogin,
        history: req.user.history,
        email: req.user.email,
        index:req.user.index
    })
})

app.post('/post', async (req, res) => {
    const data = {
        username: req.body.username,
        profile: req.body.profile,
        text: req.body.text,
        comment: req.body.comment,
        date: req.body.date
    }
    console.log(data)
    const post = await postModel.insertMany(data)
    const authHeader = req.headers['authorization'];
})

app.get('/post', async (req, res) => {
    const data = await postModel.find()
    console.log(data)
    res.send(data)
})


app.post('/singin', async (req, res) => {
    console.log(req.body)
    const data = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        profile: 'https://i.pinimg.com/474x/0d/6d/1a/0d6d1a1e83c73bbf767436b6a854bab2.jpg',
        status: "User",
        history: [],
        index:[],
        type:[],
        date:[]
    }

    const existUser = await userModel.findOne({ username: req.body.username })
    if (existUser) {
        const error = {
            singin: "false"
        }
        res.send(error)
    }
    else {
        const saltRound = 10
        const hashedPassword = await bcrypt.hash(req.body.password, saltRound)
        data.password = hashedPassword
        const userData = await userModel.insertMany(data)
        const error = {
            singin: "true"
        }
        res.send(error)
    }
})
app.post('/login', async (req, res) => {
    try {
        const data = await userModel.findOne({ username: req.body.username })
        const isPasswordMatch = await bcrypt.compare(req.body.password, data.password)
        if (isPasswordMatch) {
            const id = {
                username: data.username,
                profile: data.profile,
                status: data.status,//User
                login: "true",
                isLogin: "true",
                eiei: data.email,
                email: data.email,
                history: data.history,
                index:data.index
            }
            const token = jwt.sign(id, "saighub", { expiresIn: "1h" });
            res.cookie("_saig", token, {
                httpOnly: true
            })
            res.send({
                username: data.username,
                profile: data.profile,
                status: data.status,
                login: "true",
                isLogin: "true",
                email: data.email,
                token: token,
            })
        }
        else {
            res.send({
                login: "false"
            })
        }

    } catch {
        res.send({
            login: "false"
        })
    }
})


app.put('/chang', async (req, res) => {
    const data = await userModel.findOne({ username: req.body.username })
    let isPasswordMatch = false
    try {
        isPasswordMatch = await bcrypt.compare(req.body.password, data.password)
    } catch {
        res.send({
            status: "false"
        })
    }

    if (isPasswordMatch) {
        try {
            const hashedPassword = await bcrypt.hash(req.body.newPassword, 10)
            const newP = await userModel.updateOne(
                { username: data.username }, 
                { $set: { password: hashedPassword } }, 
                { new: true }
            );
            res.send({
                status: "true"
            })
        } catch {
            res.send({
                status: "false"
            })
        }
    }
    else {
        res.send({
            status: "false"
        })
    }
})
app.post('/listGame',async (req,res) =>{
    const data={
        name:req.body.name,
        image:req.body.image,
        prize:req.body.prize
    }
    const newGame = await listBordgameModel.insertMany(data)
    console.log(`add new game ${req.body.name}`)
    console.log(newGame)
})
app.post('/listGame1',async(req,res)=>{
    const text = req.body.text
    if(text==''){
        const listGame = await listBordgameModel.find()
        res.send(listGame)
        console.log(listGame)
    }
    else{
        const regex =new RegExp(text, 'i')
        const listGame = await listBordgameModel.find({name:regex})
        
        if(!(listGame.length==0)){
            console.log(listGame)
            res.send(listGame)
        }
        else{
            res.send([{
                name:'Not found',
                image:'https://www.invoicera.com/blog/wp-content/uploads/2022/02/Payments-Not-Recorded.jpg'
            }])
        }
    }
})
app.post('/reserveGame',async (req,res)=>{
    const getData = await listBordgameModel.find()
    for(let i =0;i<getData.length;i++){
        const many = 1*getData[i].prize
        const data ={
            name:getData[i].name,
            date:req.body.date,
            reserve:[many,many,many,many,many,many,many,many,many,many,many,many]
        }
        const newReserve = await reserveGameModel.insertMany(data)
        console.log(newReserve)
    }
})
app.post('/reserveGame1',async (req,res)=>{
    const getDate = await reserveGameModel.findOne({name:req.body.name,date:req.body.date})
    if(getDate){
        res.send(getDate)
    }
    else{
        res.send({
            status:"false"
        })
        
        console.log(getDate)
    }
})
app.put('/reserveGame1',async (req,res)=>{
    const data={
        name:req.body.name,
        date:req.body.date,
        data:req.body.data
    }
    console.log(req.body)
    let fail;
    for(let i=0;i<data.data.length;i++){
        let getData = await reserveGameModel.findOne({name:data.name,date:data.date})
        if(getData.reserve[data.data[i]]>=1){
            getData.reserve[data.data[i]]=getData.reserve[data.data[i]]-1
            const putData = await reserveGameModel.updateOne(
                {name:req.body.name,date:req.body.date},
                {$set:{reserve:getData.reserve}}, 
                { new: true }
            )
            const getData2 = await userModel.findOne({username:req.body.username})
            const historyText =req.body.name +' '+req.body.date+' : '+time[data.data[i]]
            const arrayHistory = [historyText,...getData2.history]
            const arrayIndex =[data.data[i],...getData2.index]
            const arrayType = [data.name,...getData2.type]
            const arrayDate =[data.date,...getData2.date]
            const putData2 = await userModel.updateOne(
                {username:getData2.username},
                {$set:{history:arrayHistory,index:arrayIndex,type:arrayType,date:arrayDate}}
            )
            console.log(historyText)
            console.log(getData2)
            console.log(`put place ${req.body.name} ${req.body.date}`)
        }
        else{
            fail=true
        }
    }
    if(fail){
        res.send({
            status:"false"
        })
    }
    else{
        res.send({
            status:'true'
        })
    }
})
app.post('/reservePlace1',async (req,res)=>{
    const getDate = await reservePlaceModel.findOne({name:req.body.name,date:req.body.date})
    if(getDate){
        res.send(getDate)
    }
    else{
        res.send({
            status:"false"
        })
        
        console.log(getDate)
    }
})

app.post('/reservePlace',async (req,res)=>{
    for(let i =0;i<req.body.name.length;i++){
        const data={
            name:req.body.name[i],
            date:req.body.date,
            reserve:req.body.reserve
        }
        const newP = await reservePlaceModel.insertMany(data)
        console.log(`add place ${req.body.name}`)  
    }
})

app.put('/reservePlace1',async (req,res)=>{
    const data={
        name:req.body.name,
        date:req.body.date,
        data:req.body.data
    }
    console.log(req.body)
    let fail;
    for(let i=0;i<data.data.length;i++){
        let getData = await reservePlaceModel.findOne({name:data.name,date:data.date})
        if(getData.reserve[data.data[i]]>=1){
            getData.reserve[data.data[i]]=getData.reserve[data.data[i]]-1
            const putData = await reservePlaceModel.updateOne(
                {name:req.body.name,date:req.body.date},
                {$set:{reserve:getData.reserve}}, 
                { new: true }
            )
            const getData2 = await userModel.findOne({username:req.body.username})
            const historyText =req.body.name +' '+req.body.date+' : '+time[data.data[i]]
            const arrayHistory = [historyText,...getData2.history]
            const arrayIndex =[data.data[i],...getData2.index]
            const arrayType = [data.name,...getData2.type]
            const arrayDate =[data.date,...getData2.date]
            const putData2 = await userModel.updateOne(
                {username:getData2.username},
                {$set:{history:arrayHistory,index:arrayIndex,type:arrayType,date:arrayDate}}
            )
            console.log(historyText)
            console.log(getData2)
            console.log(`put place ${req.body.name} ${req.body.date}`)
        }
        else{
            fail=true
        }
    }
    if(fail){
        res.send({
            status:"false"
        })
    }
    else{
        res.send({
            status:'true'
        })
    }
})

app.delete('/deleteDate',async(req,res)=>{
    const data = await reserveGameModel.deleteMany({date:req.body.date})
    const data2 = await reservePlaceModel.deleteMany({date:req.body.date})
    if(data&&data2){
        console.log('delete ',req.body.date)
    }
    else{
        console.log('can not delete')
    }
})
app.put('/cancel',async (req,res)=>{
    const dataPut={
        indexHistoryUser:req.body.indexHistory,
        indexReserve:req.body.index,
        username:req.body.username
    }
    const dataUser = await userModel.findOne({username:req.body.username})
    const date = time[dataUser.index[dataPut.indexHistoryUser]]
    console.log(dataUser)
    console.log(date)
    if(dataUser.index[dataPut.indexHistoryUser]==dataUser.index[dataPut.indexHistoryUser]){
        const newIndex = dataUser.index.toSpliced(dataPut.indexHistoryUser,1)
        const newHistory = dataUser.history.toSpliced(dataPut.indexHistoryUser,1)
        const newtype =dataUser.type.toSpliced(dataPut.indexHistoryUser,1)
        const newdate =dataUser.date.toSpliced(dataPut.indexHistoryUser,1)
        const putData = await userModel.updateOne(
            {username:dataUser.username},
            {$set:{index:newIndex,history:newHistory,type:newtype,date:newdate}}, 
            { new: true }
        )
        console.log(putData)
        if(dataUser.type[dataPut.indexHistoryUser]=='TABLE A'||dataUser.type[dataPut.indexHistoryUser]=='ROOM A'||dataUser.type[dataPut.indexHistoryUser]=='VIPROOM'
            ||dataUser.type[dataPut.indexHistoryUser]=='TABLE B'||dataUser.type[dataPut.indexHistoryUser]=='TABLE C'||dataUser.type[dataPut.indexHistoryUser]=='TABLE D'
            ||dataUser.type[dataPut.indexHistoryUser]=='TABLE E'||dataUser.type[dataPut.indexHistoryUser]=='TABLE F'||dataUser.type[dataPut.indexHistoryUser]=='ROOM B'
            ||dataUser.type[dataPut.indexHistoryUser]=='ROOM C'
        ){
            const dataPlace = await reservePlaceModel.findOne({name:dataUser.type[dataPut.indexHistoryUser],date:dataUser.date[dataPut.indexHistoryUser]}) 
            let newarr = dataPlace.reserve
            newarr[dataUser.index[dataPut.indexHistoryUser]]= newarr[dataUser.index[dataPut.indexHistoryUser]]+1
            console.log(newarr)
            const updataPlace = await reservePlaceModel.updateOne(
                {name:dataUser.type[dataPut.indexHistoryUser],date:dataUser.date[dataPut.indexHistoryUser]},
                {$set:{reserve:newarr}},
                {new:true}
            )
        }
        else{
            console.log(dataUser.type)
            const dataGame = await reserveGameModel.findOne({name:dataUser.type[dataPut.indexHistoryUser],date:dataUser.date[dataPut.indexHistoryUser]})
            
            console.log(dataGame)
            let newarr = dataGame.reserve
            console.log(newarr)
            newarr[dataUser.index[dataPut.indexHistoryUser]] = newarr[dataUser.index[dataPut.indexHistoryUser]]+1
            const updataPlace = await reserveGameModel.updateOne(
                {name:dataUser.type[dataPut.indexHistoryUser],date:dataUser.date[dataPut.indexHistoryUser]},
                {$set:{reserve:newarr}},
                {new:true}
            )
            console.log(dataGame)
         }
    }
    else{
        console.log('dadajf')
        console.log(dataPut.indexReserve[dataPut.indexHistoryUser])
        console.log(dataUser.index[dataPut.indexHistoryUser])
    }
})

app.post('/gethistory',async(req,res)=>{
    const data = await userModel.findOne({username:req.body.username})
    console.log(data.history)
    res.send({history:data.history})
})

app.listen(PORT, () => {
    console.log(`start at http://localhost:${PORT}`)
})
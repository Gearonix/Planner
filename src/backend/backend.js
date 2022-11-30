const express = require('express')
const app = express()
const {MongoClient,ObjectId} = require('mongodb')
const server = require('http').Server(app)
const cors = require('cors')
const multer = require('multer')
const emailValidator = require('deep-email-validator');
const PORT = 6868

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}


app.use(express.static(__dirname));
app.use(express.json())
app.use(cors(corsOptions))

const connectToDB = async () => {
    const URI = 'mongodb://0.0.0.0:27017/'
    const client = new MongoClient(URI)
    try{
        await client.connect()
        return client
    }
    catch (err){
        console.log(err)
    }
}






const ok = (data, status = 200) => ({data,status})
const error = (message,status = 500) => ({status,message,data : {}})

let db;

connectToDB().then(response => {
    db = response.db('plannerDatabase')
    console.log('MongoDB database connected')
})



app.put('/user',(req , res)  => {
    const {email,password} = req.body
    db.collection('users').find({email,password}).toArray((err,result) =>{
        if (result[0]) res.json(ok(result[0]))
        else res.json(error('Wrong password or username'))
    } )
})
app.post('/user' , async (req,res) => {
    const {email,password} = req.body
    const {valid : isEmailExists} = await emailValidator.validate(email)
    if (!isEmailExists) return res.json(error('Email does not exist'))
    db.collection('users').find({email}).toArray((err,result) => {
        if (result[0]) {
            res.json(error('User already exists'))
            return
        }
        const data = {email,password,userImage : null,
            userName :  email.split('@')[0]}
        db.collection('users').insertOne(data,(err, {insertedId}) => {
            res.json(ok({...data , _id : insertedId}))
        })

    })
})
app.put('/user/change/username',(req,res) => {
    const {userName,user_id} = req.body
    db.collection('users').updateOne({_id : new ObjectId(user_id)},{$set : {userName}})
    res.json(ok({userName}))
})
app.put('/user/change/password',(req,res) => {
    const {nextPassword : password,user_id} = req.body
    db.collection('users').updateOne({_id : new ObjectId(user_id)},{$set : {password}})
    res.json(ok({password}))
})

app.put('/user/upload/image',(req,res) => {
    const upload = multer({storage : userImageStorage,fileFilter}).single('avatar')
    upload(req,res,(err) => {
        if (err){
            console.log(err)
            res.json(error('FileUploadError'))
            return

        }
        const filename = res.req.file.filename
        res.json(ok(filename))
    })
})
app.put('/user/set/image',(req,res) => {
    const {user_id,filename} = req.body
    db.collection('users').updateOne({_id: new ObjectId(user_id)},{$set : {userImage : filename}})
    res.json(ok())
})

const userImageStorage = multer.diskStorage({
    destination(req,file,cb){
        cb(null, 'static')
    },
    filename(req,file,cb){
        cb(null,file.originalname)
    }

})
const fileFilter = (req, file, cb) => cb(null, true)




server.listen(PORT,() => console.log(`server listening at ${PORT}`))

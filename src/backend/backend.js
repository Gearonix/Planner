const express = require('express')
const app = express()
const {MongoClient, ObjectId} = require('mongodb')
const server = require('http').Server(app)
const cors = require('cors')
const multer = require('multer')
const emailValidator = require('deep-email-validator');
const cookieParser = require('cookie-parser')
const PORT = 6868


const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}


app.use(express.static(__dirname));
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())

const connectToDB = async () => {
    const URI = 'mongodb://0.0.0.0:27017/'
    const client = new MongoClient(URI)
    try {
        await client.connect()
        return client
    } catch (err) {
        console.log(err)
    }
}


const ok = (data, status = 200) => ({data, status})
const error = (message, status = 500) => ({status, message, data: {}})

let db;

connectToDB().then(response => {
    db = response.db('plannerDatabase')
    console.log('MongoDB database connected')
})


app.put('/user/login', (req, res) => {
    const {email, password} = req.body
    db.collection('users').find({email, password}).toArray((err, result) => {
        if (result[0]) {
            const user_id = result[0]._id.toString()
            res.cookie('user_id', user_id)
            res.cookie('password', password)
            res.json(ok(result[0]))
        } else res.json(error('Wrong password or username'))
    })
})
app.post('/user/signup', async (req, res) => {
    const {email, password} = req.body
    const {valid: isEmailExists} = await emailValidator.validate(email)
    if (!isEmailExists) return res.json(error('Email does not exist'))
    db.collection('users').find({email}).toArray((err, result) => {
        if (result[0]) {
            res.json(error('User already exists'))
            return
        }


        const data = {
            email, password, userImage: null,
            userName: email.split('@')[0]
        }
        db.collection('users').insertOne(data, (err, {insertedId}) => {
            res.cookie('user_id', insertedId)
            res.cookie('password', password)
            res.json(ok({...data, _id: insertedId}))
        })

    })
})
app.get('/cookie/auth', (req, res) => {
    const {user_id, password} = req.cookies
    if (user_id) {
        db.collection('users').find({_id: new ObjectId(user_id), password}).toArray((err, result) => {
            if (err || !result[0]) {
                return res.json(error('Cookie error'))
            }
            res.json(ok(result[0]))
        })
        return
    }
    res.json(error('No cookie'))

})

app.delete('/cookie/clear', (req, res) => {
    res.clearCookie('user_id')
    res.clearCookie('password')
    res.json(ok())
})

app.put('/user/change/username', (req, res) => {
    const {userName, user_id} = req.body
    db.collection('users').updateOne({_id: new ObjectId(user_id)}, {$set: {userName}})
    res.json(ok({userName}))
})
app.put('/user/change/password', (req, res) => {
    const {nextPassword: password, user_id} = req.body
    db.collection('users').updateOne({_id: new ObjectId(user_id)}, {$set: {password}})
    res.json(ok({password}))
})

app.put('/user/upload/image', (req, res) => {
    const upload = multer({storage: userImageStorage, fileFilter}).single('avatar')
    upload(req, res, (err) => {
        if (err) {
            console.log(err)
            res.json(error('FileUploadError'))
            return

        }
        const filename = res.req.file.filename
        res.json(ok(filename))
    })
})
app.put('/user/set/image', (req, res) => {
    const {user_id, filename} = req.body
    db.collection('users').updateOne({_id: new ObjectId(user_id)}, {$set: {userImage: filename}})
    res.json(ok())
})

const userImageStorage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'static')
    },
    filename(req, file, cb) {
        cb(null, file.originalname)
    }

})
const fileFilter = (req, file, cb) => cb(null, true)


// ///////////////////

app.get('/planner/month', (req, res) => {
    const {user_id, fulldate} = req.query
    const month = fulldate && fulldate != 'null' ? fulldate : new Date().getMonth().toString()
    db.collection('tasklists').find({user_id, month}).toArray((err, result) => {
        if (err) {
            console.log(err)
            res.json(error(err))
            return
        }
        res.json(ok(result))
    })
})


server.listen(PORT, () => console.log(`server listening at ${PORT}`))

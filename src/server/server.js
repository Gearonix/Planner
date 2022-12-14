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
    const upload = multer({storage: userImageStorage, fileFilter}).single(req.query.dir)
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
        cb(null, `static/${req.query.dir}`)
    },
    filename(req, file, cb) {
        cb(null, file.originalname)
    }

})
const fileFilter = (req, file, cb) => cb(null, true)


// ///////////////////

app.get('/planner/month', (req, res) => {
    const {user_id, fulldate} = req.query
    const [year, month] = fulldate.split('-')
    db.collection('tasklists').find({user_id, month, year}).toArray((err, result) => {
        if (err) {
            console.log(err)
            res.json(error(err))
            return
        }
        res.json(ok(result))
    })
})

app.post('/planner/task/create', (req, res) => {
    const {user_id, data} = req.body
    const [year, month, date] = data.date.split('-')
    const insertData = {...data, task_id: new ObjectId()}
    db.collection('tasklists').find({year, month, date, user_id}).toArray((err, [result]) => {
        if (err) {
            console.log(err)
            return res.json(error(err))
        }
        if (result) {
            db.collection('tasklists').updateOne({_id: new ObjectId(result._id)},
                {$push: {tasklist: insertData}})
            return res.json(ok({result, insertData, wasExisted: true}))
        }
        const newTaskList = {user_id, year, month, date, tasklist: [insertData]}
        db.collection('tasklists').insertOne(newTaskList)
        res.json(ok({
            result: newTaskList,
            insertData,
            wasExisted: false
        }))

    })
})

app.delete('/planner/task/delete', (req, res) => {
    const {task_id} = req.body
    db.collection('tasklists').updateOne({tasklist: {$elemMatch: {task_id: new ObjectId(task_id)}}},
        {$pull: {tasklist: {task_id: new ObjectId(task_id)}}}, (err, result) => {
            if (err) return res.json(error(err))
            res.json(ok(result))
        })

})
app.put('/planner/task/update', (req, res) => {
    const {data} = req.body
    const {task_id} = data
    db.collection('tasklists').updateOne({"tasklist.task_id": new ObjectId(task_id)},
        {$set: {'tasklist.$': {...data, task_id: new ObjectId(task_id)}}}, (err, result) => {
            if (err) return res.json(error(err))
            res.json(ok(result))
        })
})


server.listen(PORT, () => console.log(`server listening at ${PORT}`))

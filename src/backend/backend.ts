// @ts-ignore
const express = require('express')
const app = express()
const {MongoClient} = require('mongodb')
const server = require('http').Server(app)

app.use(express.static('static'))
app.use(express.json())

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

connectToDB().then(response => {
    // @ts-ignore
    const db = response.db('plannerDatabase')

    db.collection('users').insertOne({test : 'test'})
    // db.users.insertOne({hello: 'world'})
})

server.listen(4000,() => console.log('listening 4000'))

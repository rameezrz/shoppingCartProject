const { MongoClient } = require('mongodb')
const state={
    db:null
}

const mongoClient=require('mongodb').MongoClient

module.exports.connect=function(done){
    const url='mongodb://localhost:27017'
    const dbname='shopping'

    MongoClient.connect(url,(err,data)=>{
        if (err) return done(err)
        state.db=data.db(dbname)
        done()
    })

    
}

module.exports.get=function(){
    return state.db
}
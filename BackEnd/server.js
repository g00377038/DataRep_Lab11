const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require('mongoose'); //add mongoose
const path = require('path');


app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//where to find build folder
app.use(express.static(path.join(__dirname, '../build')));

//where to find static folder
app.use(express.static(path.join(__dirname, 'build//static')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

//connect to mongoDB database
const myConnectionString = 'mongodb+srv://admin:datarep@cluster0.yhsci.mongodb.net/movies?retryWrites=true&w=majority';
mongoose.connect(myConnectionString, {useNewUrlParser: true});

//define schema of data to be stored in database
const Schema = mongoose.Schema;

//schema
var movieSchema = new Schema({
    title:String,
    year:String,
    poster:String
});

//create model for database
var MovieModel =  mongoose.model("movie", movieSchema);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

//listen for "get"
app.get('/api/movies', (req, res) => {
     
    //find all documents in database
    MovieModel.find((err, data)=>{
        res.json(data);
    })

})

//listen for get request and return info of movie that matches id
app.get('/api/movies/:id', (req, res)=>{
    console.log(req.params.id);
    MovieModel.findById(req.params.id, (err, data)=>{
        res.json(data);
    })
})

//listen for delete request and remove info of movie that matches id from database
app.delete('/api/movies/:id', (req, res)=>{
    console.log("Delete "+req.params.id);
    MovieModel.findByIdAndDelete({_id:req.params.id}, (err, data)=>{
        if(err)
            res.send(err);

        //prevent client from sending duplicates
        res.send(data);
    });
})

//listen for put request and edit info of movie that matches id from database
app.put('/api/movies/:id', (req, res)=>{
    console.log("Update "+req.params.id);
    console.log(req.body);

    //find and overwrite movie that matches ID
    MovieModel.findByIdAndUpdate(req.params.id, req.body, {new:true},
        (err, data)=>{
            if(err)
                res.send(err);

            //prevent client from sending duplicates
            res.send(data);
        })
})


//listen for "post", server recieves data
app.post('/api/movies', (req, res) =>{
    console.log('Movie Recieved!');
    console.log(req.body.title);
    console.log(req.body.year);
    console.log(req.body.poster);

    //server connects and writes movie info to database
    MovieModel.create({
        title:req.body.title,
        year:req.body.year,
        poster:req.body.poster
    })

    //prevent client from sending duplicates
    res.send('Item Received')
})


app.get('*', (req, res)=>{
    //send back index.html file 
    res.sendFile(path.join(__dirname+'/../build/index.html'));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
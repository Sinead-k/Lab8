// Used for backend developement
const express = require('express');
const app = express();

// Has to be on a seperate port to the front end
const port = 4000
const cors = require('cors');
const bodyParser = require('body-parser');

// getting-started.js Mongoose
const mongoose = require('mongoose');

//Connect to database
const ConnectionString ="mongodb+srv://admin:admin@cluster0.gttyd.mongodb.net/movies?retryWrites=true&w=majority";
mongoose.connect(ConnectionString, {useNewUrlParser: true});

const Schema = mongoose.Schema;

var movieSchema = new Schema({
  title:String,
  year:String,
  poster:String
});

var MovieModel = mongoose.model("movie", movieSchema);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// New root point
// Movie information is hard coded into this object
app.get('/api/movies', (req, res)=>{
  //  const mymovies = [
  //      {
  //       "Title":"Avengers: Infinity War",
  //       "Year":"2018",
  //       "imdbID":"tt4154756",
  //       "Type":"movie",
  //       "Poster":"https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
  //       },
  //       {
  //       "Title":"Captain America: Civil War",
  //       "Year":"2016",
  //       "imdbID":"tt3498820",
  //       "Type":"movie",
  //       "Poster":"https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
  //       },
  //       {
  //       "Title":"World War Z",
  //       "Year":"2013",
  //       "imdbID":"tt0816711",
  //       "Type":"movie",
  //       "Poster":"https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"}
  //       ,];

  MovieModel.find((err, data)=>{
    res.json(data);
  })
})

app.get('/api/movies/:id', (req, res)=>{
    console.log(req.params.id);

    MovieModel.findById(req.params.id, (err, data) =>{
      res.json(data);
    })
})

app.post('/api/movies',(req, res)=>{
    console.log('Movie Received!');
    console.log(req.body.title);
    console.log(req.body.year);
    console.log(req.body.poster);

    MovieModel.create({
      title:req.body.title,
      year:req.body.year,
      poster:req.body.poster
    });

    res.render('Item Saved');
})

app.delete('/api/movies/:id', function (req, res) {
  console.log(req.params.id);
  MovieModel.deleteOne({ _id: req.params.id },
  function (err, data) {
  if (err)
  res.send(err);
  res.send(data);
  })
  })
  
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
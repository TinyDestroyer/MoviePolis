const express = require('express');
const app = express();
const axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser');


app.set('views' , path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));

app.get('/', async (req,res)=>{
  const trending = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=9d1e87073506402828b0583a07550302`);
  const popular = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=9d1e87073506402828b0583a07550302&language=en-US&page=1`)
  length_t = trending.data.results.length;
  length_p = popular.data.results.length;
  res.render('home', { trending, popular, length_t, length_p });
});

app.get('/show/:id', async (req,res) =>{
  const { id } = req.params;
  const movie = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=9d1e87073506402828b0583a07550302&language=en-US`);
  res.render('show', {movie});
});

app.get('/topRated', async(req,res)=>{
  const movie = await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=9d1e87073506402828b0583a07550302&language=en-US&page=1');
  length = movie.data.results.length;
  res.render('display', {movie, length});
});

app.get('/popular', async(req,res)=>{
  const movie = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=9d1e87073506402828b0583a07550302&language=en-US&page=1');
  length = movie.data.results.length;
  res.render('display', {movie, length});
});

app.get('/nowPlaying', async(req,res)=>{
  const movie = await axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=9d1e87073506402828b0583a07550302&language=en-US&page=1');
  length = movie.data.results.length;
  res.render('display', {movie, length});
});

app.post('/search', async (req,res) => {
  const { moviename } = req.body;
  const movie = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=9d1e87073506402828b0583a07550302&language=en-US&page=1&include_adult=false&query=${moviename}`);
  const recommend = await axios.get(`https://api.themoviedb.org/3/movie/${movie.data.results[0].id}/recommendations?api_key=9d1e87073506402828b0583a07550302&language=en-US&page=1`)
  length = movie.data.results.length;
  length_r = recommend.data.results.length;
  res.render("search", {movie , moviename, length, length_r, recommend});
});

app.listen(3000,()=>{
    console.log("Connected to PORT 3000!!!");
});
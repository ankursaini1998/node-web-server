const express=require('express');
const hbs =require('hbs');
const fs=require('fs');

var app=express();

hbs.registerPartials(__dirname +'/views/partials')
//app.set('views engine','hbs');


app.use((req,res,next) => {
  var now=new Date().toString();
  var log=`${now} : ${req.method} : ${req.url}`;
  console.log(log);
  fs.writeFileSync('server.log',log + '\n');
  next();
});
hbs.registerHelper('year',() =>{
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text) =>{
  return text.toUpperCase();
});

app.use((req,res,next) => {
  res.render('maintenance.hbs')
});

app.use(express.static(__dirname +'/public'));

app.get('/' , (req,res) =>
{
  res.render('home.hbs',{
    pageTitle: 'Home page',
    message: 'welcome to my website...'
  });
});

app.get('/about',(req,res) => {
  res.render('about.hbs',{
    pageTitle: 'About page'
  });
})
app.listen(3000,()=> {
  console.log('Server is up on port 3000');
});

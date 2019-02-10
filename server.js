const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.reg
hbs.registerPartials(__dirname +'/views/partials');
app.set('view engine', 'hbs');

//------------------------------------------------------------------//------------------------------------------------------------------
//Maintenance page for when site is doen
// app.use((req, resp, next) =>{
//   resp.render('maintenance.hbs', {
//     pageTitle: 'A seal has blocked you -arf! arf!- ',
//     maintenanceMessage: 'This site is under maintenance! Come back later!'
//   })
// });
//------------------------------------------------------------------//------------------------------------------------------------------
// the following line must be after the
//   maintenance page else you can still access it
app.use(express.static(__dirname + `/public`));

app.use((req, resp, next) =>{
  //We could do anything wel like Here
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}` ;

  console.log(log);
  fs.appendFile(`server.log`, log + "\n", (err) =>{
    if(err){
      console.log(`Unableto append to server.log`);
    }
  });
  next();
})


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});



app.get('/', (request, response) => {
  // response.send('<h1>Hello Express!</h1>');
  // response.send();
  response.render('home.hbs', {
    pageTitle: 'Home Page',
    name: 'Luke',
    welcomeMessage: 'Welcome sir!',
    likes: [
      `Biking`,
      `Cities`
    ]
  })
});

app.get('/about', (request, response) => {
  response.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (request, response) => {
  response.send({
    errorMessage: 'ERROR: can not handle this request'
  });
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

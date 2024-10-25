// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


//your first API endpoint... 

app.get("/api/", function (req, res) {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString()
  })
});

app.get('/api/:time', (req, res) => {
  const time = req.params.time;

  let date;

  if(time) {
    if(!isNaN(time)) {
      date = new Date(parseInt(time));
    } else {
      date = new Date(time)
    }
  } 
  
  if(isNaN(date.getTime())) {
    return res.json({error: 'invalid Date'})
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });

});



// app.get('/api/:date', (req, res) => {
//   const date = req.params.date;

//   const parsedDate = !date
//     ? new Date()
//     : isNaN(date)
//     ? new Date(date)
//     : new Date(parseInt(date));

//     if (isNaN(parsedDate.getTime())) {
//       return res.json('invalid Date')
//     }

//     res.json({
//       unix: parsedDate.getTime(),
//       utc: parsedDate.toUTCString()
//     });
// })

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

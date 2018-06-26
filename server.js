//Restfull application for parsing data from binary input

const express = require('express');
const app = express();

let counter = 0;

app.use((req, res, next) => {
  req.rawBody = '';
  // req.setEncoding('base64');
  req.setEncoding(null);
  req.on('data', function(chunk) {
    req.rawBody += chunk;
  });
  req.on('end', function() {
    next();
  });
});

//returns count of calls
app.get('/count', (req, res) => res.send('Api calls: '+counter));

//returns parsed text
app.post('/file', (req, res) => {
  console.log('Input:');
  console.log(req.rawBody);

  var fs = require('fs');
  var array = fs.readFileSync('keywords_example.txt').toString().split("\n"); 
  let result = req.rawBody;
  for(i in array) {
    console.log(array[i]);
    let re = new RegExp(array[i].trim(),'gi');
    console.log(re); 
    result = result.replace(re,array[i]+ " ©" );
    console.log(result);
}
  counter++;
  console.log('Result:');
  console.log(result);
  res.set({"Content-Disposition":"attachment; filename=\"result.txt\""});
  res.send(result);
});

var port = process.env.PORT || 3000;

// settings needed for script to be working on Heroku 
app.listen(port, "0.0.0.0", function() {
console.log("Listening on Port 3000");
});

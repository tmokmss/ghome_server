express = require('express');
var app = express();

app.get('/', function(req, res){
  res.set('Content-Type', 'application/json');
  res.json({ name: 'テストユーザー' });
});

app.get('/test', function(req, res){
  res.set('Content-Type', 'application/json');
  res.json({ name: 'test user' });
});

app.listen(9000);

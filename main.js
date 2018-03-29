const exec = require('child_process').exec;

const googlehome = require('google-home-notifier')
const bodyParser = require('body-parser');
const express = require('express');

const language = 'ja';
const addr = process.env.GHOME_ADDR;
const password = process.env.IFTTT_PASSWORD;

googlehome.ip(addr, language);
var app = express();

app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.set('Content-Type', 'application/json');
  res.json({ name: 'テストユーザー' });
  googlehome.notify('了解です', function (res2) {
    console.log(res2);
  });
  //googlehome.play('https://tmokmss.ddns.net/captures/wolf.mp3', function (res2) {
  //  console.log(res2);
  //});
});

app.post('/lightoff', function (req, res) {
  var isValid = isValidRequest(req.body["password"]);
  if (!isValid) {
    res.json({ status: 'failure' });
    return;
  }
  res.json({ status: 'success' });
  exec('irsend SEND_ONCE light LightOff', (err, stdout, stderr) => {
  });
  googlehome.notify("電気を消しました", function (res2) {
  });
});

app.post('/lighton', function (req, res) {
  var isValid = isValidRequest(req.body["password"]);
  if (!isValid) {
    res.json({ status: 'failure' });
    return;
  }
  res.json({ status: 'success' });
  exec('irsend SEND_ONCE light LightFavorite', (err, stdout, stderr) => {
  });
  googlehome.notify("電気を付けました", function (res2) {
  });
});

function isValidRequest(pass) {
  return pass == password;
}

app.listen(9000);

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
  handleLight(req, res, "Off");
});

app.post('/lighton', function (req, res) {
  handleLight(req, res, "On");
});

function isValidRequest(pass) {
  return pass == password;
}

function handleLight(req, res, mode) {
  var isValid = isValidRequest(req.body["password"]);
  res.set('Content-Type', 'application/json');
  if (!isValid) {
    res.json({ status: 'failure' });
    return;
  }
  res.json({ status: 'success' });
  exec(getIrCommand(mode), (err, stdout, stderr) => {
  });
  googlehome.notify(getNotifyMessage(mode), (res_notify) => {
  });
}

function getIrCommand(mode) {
  if (mode == "On") return 'irsend SEND_ONCE light LightFavorite';
  if (mode == "Off") return 'irsend SEND_ONCE light LightOff';
  return "";
}

function getNotifyMessage(mode) {
  if (mode == "On") return "電気をつけました";
  if (mode == "Off") return "電気を消しました";
  return "";
}

app.listen(9000);

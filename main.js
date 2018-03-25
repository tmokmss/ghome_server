const exec = require('child_process').exec;

const googlehome = require('google-home-notifier')
const language = 'ja';
const addr = process.env.GHOME_ADDR;
googlehome.ip(addr, language);

express = require('express');
var app = express();

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

app.get('/lightoff', function (req, res) {
  res.set('Content-Type', 'application/json');
  res.json({ name: 'test user' });
  exec('irsend SEND_ONCE light LightOff', (err, stdout, stderr) => {
  });
  googlehome.notify("電気を消しました", function (res2) {
    console.log(res2);
  });
});

app.get('/lighton', function (req, res) {
  res.set('Content-Type', 'application/json');
  res.json({ name: 'test user' });
  exec('irsend SEND_ONCE light LightFavorite', (err, stdout, stderr) => {
  });
  googlehome.notify("電気を付けました", function (res2) {
    console.log(res2);
  });
});

app.listen(9000);

const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/key');
const { User } = require('./models/User');

//postman을 통해서 받아온 정보를 처리해주기 위해 선언
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect(config.mongoURI,{
  useNewUrlParser: true,
  useUnifiedTopology : true,
  useCreateIndex : true,
  useFindAndModify : false
}).then(() => console.log('connected ok'))
  .catch(err => console.log('error :' + err));

app.get('/', (req, res) => res.send('Hello World!!!!'));

app.post('/register', (req, res) => {
  // postman에서 보내준 정보를 처리함
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) {
      return res.json({success: false, err});
    } else {
      return res.status(200).json({success: true});
    }
  });
});

app.listen(port, () => console.log('app listening on port'));
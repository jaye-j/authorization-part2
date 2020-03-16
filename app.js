const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
let sessions = require('express-session');
let cookieParser = require('cookie-parser');
let db = require('./models');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  sessions({
    secret: 'my puppy',
    cookie: { secure: false, maxAge: 14 * 24 * 60 * 60 * 1000 }
  })
);

app.use(require('./routes/'));
app.use(require('./routes/blogs.js'));
app.use(require('./routes/editblogs.js'));

let auth = (req, res, next) => {
  // if user is logged in, execute next function. Otherwise redirect user ot /login.
  if (req.session.userid) {
    next();
  } else {
    res.redirect('/login');
  }
};

app.get('/login', (req, res) => {
  res.render('login');
});
app.post('/login', (req, res) => {
  let username = req.body.username;

  let password = req.body.password;

  db.users
    .findAll({ where: { username: username } })
    .then(results => {
      if (results.length > 0) {
        bcrypt.compare(password, results[0].password, (err, response) => {
          console.log(results[0].password);
          console.log(password);
          if (response) {
            req.session.userid = username;
            res.redirect('/');
          } else {
            res.redirect('/error');
          }
        });
      } else {
        res.redirect('/registration');
      }
    })
    .catch(err => {
      res.send(err);
    });
});
app.get('/registration', (req, res) => {
  let error = req.query.error;
  let err = 'hidden';

  if (error) {
    err = 'visible';
  }
  //encrypt the password
  //add information to database

  res.render('registration', {
    error: err
  });
});
app.post('/registration', (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  console.log(req.body);

  let passwordEncrypted = bcrypt.hashSync(password, 8);
  console.log(passwordEncrypted);
  db.users
    .create({
      username: username,
      email: email,
      password: passwordEncrypted
    })
    .then(user => {
      // res.send('post registration');
      res.redirect('/login');
    })
    .catch(err => {
      res.redirect('/registration?error=visible');
    });
});

app.get('/error', (req, res) => {
  res.send('error');
});

app.get('/protected', auth, (req, res) => {
  res.send('protected');
});

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    console.log(err);
  });
  res.redirect('/');
});
app.listen(3000, () => {
  console.log('Listening on 3000');
});
const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcryptjs');

//node receiveds request =>  middleware =>request, response
router.get('/login', (req, res) => {

    res.render('login')
})

router.post('/login', (req, res) => {

    let username = req.body.username;

    let password = req.body.password;

    db.users.findAll({ where: { username: username } })
        .then(results => {
            //[{usrname: value, email: value, password},{}, {}]

            //authenticated
            if (results.length > 0) {
                //user has been found,

                //test the pasword

                bcrypt.compare(password, results[0].password, (err, response) => {

                    console.log(results[0].password);
                    console.log(password);

                    if (response) {
                        req.session.userid = username;
                        res.redirect('/');
                    }
                    else {
                        res.redirect('/error')
                    }
                })
            }
            else {
                res.redirect('/registration')
            }
        })

    // res.send('post login')
})


router.get('/logout', (req, res) => {

    req.session.destroy((err) => {
        res.redirect('/')
    })

})

module.exports = router;
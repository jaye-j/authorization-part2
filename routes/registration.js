const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcryptjs');

router.get('/registration', (req, res) => {

    let error = req.query.error;
    let err = "hidden";

    if (error) {
        err = "visible"
    }
    //encrypt the password
    //add information to database 

    res.render('registration', {
        error: err
    })
})


router.post('/registration', (req, res) => {

    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;


    // test to make sure no duplicate username

    // db.users.findAll({where: {username: username}})
    // then(results =>{
    //   if (results.length == 0){
    //     //no other user in database
    //   }
    //   else {
    //     //duplicates redicred
    //   }
    // })
    // // console.log(req.body);

    let passwordEncrypted = bcrypt.hashSync(password, 8);

    db.users.create({
        username: username,
        email: email,
        password: passwordEncrypted
    })
        .then((user) => {

            // res.send('post registration');

            res.redirect('/login')
        })
        .catch(error => {
            // res.send('error duplicate entry');
            res.redirect('/registration?error=visible')
        })
    // console.log(passwordEncrypted);

})

module.exports = router;

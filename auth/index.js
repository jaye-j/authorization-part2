let auth = (req, res, next) => {

    //if there session then allow user to see page
    //otherwise redirect user to /login

    if (req.session.userid) {
        next();
    }
    else {
        res.redirect('/login');
    }

}

module.exports = auth;
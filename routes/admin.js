const express = require('express');
const router = express.Router();

router.get('/admin/dashboard', (req, res) => {

    res.send('admin dashboard')
})

router.get('/admin/user', (req, res) => {

    res.send('admin user')
})

router.get('/admin/timesheet', (req, res) => {
    res.send('admin timecard')
})

module.exports = router;
const express = require('express');
const Project = require('../models/project');
const { route } = require('./login');

const router = express.Router();

router.get('/index', async (req, res) => {
    const projects = await Project.find({});
    res.render('./admin/index', { projects });
});

router.get('/new', (req, res) => {
    res.render('new');
});

route.post('/', (req, res) => {
    
});

module.exports = router; 

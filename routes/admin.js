const express = require('express');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '.pdf') //Appending .pdf
    }
});
var upload = multer({ storage: storage });

const Project = require('../models/project');
const { isLoggedIn } = require('../middleware');

const router = express.Router();

// Show
router.get('/index', isLoggedIn, async (req, res) => {
    const location = req.user.location;
    const projects = await Project.find({"location": location});
    res.render('./admin/index', { projects });
});

// Create
router.get('/new', isLoggedIn, (req, res) => {
    res.render('./admin/new');
});

router.post('/', isLoggedIn, upload.single('file'), async (req, res) => {   
    const { name, description, startDate, endDate } = req.body;
    const location = req.user.location;
    const image = 'https://images.unsplash.com/photo-1583751636643-94790958040a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1182&q=80';
    const project = new Project({ name, description, startDate, endDate, location, image });
    await project.save();
    res.redirect('/admin/index');
});

// Edit
router.get('/:id/edit', isLoggedIn, async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (!project) {
        return res.redirect('/admin/index');
    }
    res.render('./admin/edit', { project });
});

router.put('/:id', isLoggedIn, async (req, res) => {
    const project = await Project.findByIdAndUpdate(req.params.id, { ...req.body });
    await project.save();
    res.redirect('/admin/index');
});

// Delete
router.delete('/:id', isLoggedIn, async (req, res) => {
    await Project.findByIdAndDelete(req.params.id);
    res.redirect('/admin/index');
});

module.exports = router; 

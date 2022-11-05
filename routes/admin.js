const express = require('express');
var multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '.pdf') //Appending .jpg
    }
  })
  
  var upload = multer({ storage: storage });

const Project = require('../models/project');
const { isLoggedIn } = require('../middleware');

const router = express.Router();

// Show
router.get('/index', isLoggedIn, async (req, res) => {
    const projects = await Project.find({});
    res.render('./admin/index', { projects });
});

// Create
router.get('/new', isLoggedIn, (req, res) => {
    res.render('./admin/new');
});

router.post('/', isLoggedIn, upload.single('file'), async (req, res) => {   
    const project = new Project(req.body);
    await project.save();
    res.redirect('/admin/index');
});

// Edit
router.get('/:id/edit', isLoggedIn, async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (!project) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
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

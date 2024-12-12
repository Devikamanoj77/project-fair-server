const express = require('express')
const userController = require('../controllers/userController')
const projectController = require('../controllers/projectController')
const jwtMiddleware = require('../middleware/jwtMiddleware')
const multerMiddleware = require('../middleware/multerMiddleware')
const router = new express.Router()

// register
router.post('/register',userController.registerController)

// login
router.post('/login',userController.loginController)

// add-project
router.post('/add-projects',jwtMiddleware,multerMiddleware.single('projectImage'),projectController.addProjectController)

// home projects - get
router.get('/home-projects',projectController.getHomeProjectsController)

// user project - get
router.get('/user-projects',jwtMiddleware,projectController.getUserProjectsController)

// all project - get
router.get('/all-projects',jwtMiddleware,projectController.getAllProjectsController)

// update project - update
router.put('/projects/:id/edit',jwtMiddleware,multerMiddleware.single("projectImage"),
projectController.editProjectController)

// delete a project - use deleteById
router.delete('/projects/:id/remove',jwtMiddleware,projectController.removeProjectController)

// edit user
router.put('/user/edit',jwtMiddleware,multerMiddleware.single("profilePic"),userController.editUserController)

module.exports =  router
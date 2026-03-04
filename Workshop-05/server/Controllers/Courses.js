const express = require('express');
const router = express.Router(); //enrutador para manejar las rutas de cursos
const Course = require('../models/course'); //modelo de la bd

//agregar con jwt
const { authenticateToken } = require('./Auth-jwt'); //importamos la función de autenticación

//Create a new course
const coursePost = async (req, res) => {
    
    const course = new Course({
        name: req.body.name,
        code: req.body.code,
        description: req.body.description,
        professor: req.body.professor // obtenemos el id del profesor desde el body
    })

    try {
        const courseCreated = await course.save();
        res.header('Location', `/course?id=${courseCreated._id}`); 
        res.status(201).json(courseCreated)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
};

//Get courses
const courseGet = async (req, res) => {
    try{
        if(!req.query.id){
            const data = await Course.find();
            return res.status(200).json(data)
        }
        const data = await Course.findById(req.query.id);
        res.status(200).json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
};

//Update a course
const coursePut = async (req, res) => {
    try{
        const course = await Course.findById(req.query.id); 
        if(!course){
            return res.status(404);
        }
        course.name = req.body.name;
        course.code = req.body.code;
        course.description = req.body.description;
        course.professor = req.body.professor;
        const updatedCourse = await course.save(); 
        res.status(200).json(updatedCourse)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
};

//Delete a course
const courseDelete = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.query.id);

        if (!course) {
            return res.status(404);
        }

        res.status(200);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    coursePost,
    courseGet,
    coursePut,
    courseDelete
};

const express = require('express');
const router = express.Router();
const Professor = require('../models/professor');

//Create a new professor
router.post('/', async (req, res) => {
    const professor = new Professor({
        name: req.body.name,
        lastname: req.body.lastname,
        id: req.body.id,
        age: req.body.age
    })

    try {
        const professorCreated = await professor.save();
        res.header('Location', `/professor?id=${professorCreated._id}`);
        res.status(201).json(professorCreated)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

//Get professors
router.get('/', async (req, res) => {
    try{
       
        if(!req.query.id){ //si no se pasa el id, devuelve todos los profesores
            const data = await Professor.find(); 
            return res.status(200).json(data)
        }
        const data = await Professor.findById(req.query.id);//si se pasa el id, devuelve el profesor con ese id
        res.status(200).json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update a professor
router.put('/', async (req, res) => { 
    try{
        const professor = await Professor.findById(req.query.id);
        if(!professor){
            return res.status(404);
        }
        professor.name = req.body.name;
        professor.lastname = req.body.lastname;
        professor.age = req.body.age;
        const updatedProfessor = await professor.save();
        res.status(200).json(updatedProfessor)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

//Delete a professor
router.delete('/', async (req, res) => {
    try {
        const professor = await Professor.findByIdAndDelete(req.query.id);

        if (!professor) {
            return res.status(404);
        }
        res.status(200);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

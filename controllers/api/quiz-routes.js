//post request from front end interacts with this
//server processess quiz submission
const express = require('express');
const router = require('.');
const {User, Pokemon} = require('../../models');

function personalPokemon(answers){
    //implement logic to determine which pokemon matches the users answers
    //implement scoring
}

router.post('/quiz', async (req,res) => {
    try{
        const {userId} = req.session;
        const {answers} = req.body;

        const assignedPokemon = personalPokemon(answers);
        const user = await User.findByPk(userId);
        if(!user){
            throw new Error('User not found');
        }
        const createdPokemon = await Pokemon.create({
            name: assignedPokemon.name,
            type: assignedPokemon.type,
            trainer_id: userId,
        });
        res.status(200).json({message: 'Quiz submitted successfully', pokemon: createdPokemon});
        //returns pokemon for user
    }catch(error){
        console.error('Error submiting quiz:', error);
        res.status(500).json({ error: 'Failed to submit quiz'});
    }
});

module.exports = router;
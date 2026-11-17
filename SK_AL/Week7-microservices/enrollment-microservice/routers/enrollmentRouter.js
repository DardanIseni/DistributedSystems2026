const express = require('express');
const router = express.Router();
const enrollmentService = require('../services/enrollmentService');


router.post("/enroll",async(req,res) => {
    try{
        const enroll = await enrollmentService.addEnrollment(req.body);
        res.json(enroll)
    }
    catch(e){
        res.json(e).status(400)
    }
})


module.exports = router;
const userModel = require("../../models/userModel")

async function updateUser(req, res) {

    try{

        const sessionUser = req.userId

        const{userId, email, name , number, role} = req.body

        const payload ={
            ...(name && {name : name}),
            ...(email && {email : email}),
            ...( number && {number  : number}),
            ...(role && {role : role}),
        }

        const user = await userModel.findById(sessionUser)

        const updateUser = await userModel.findByIdAndUpdate(userId, payload)

        res.json({
            data : updateUser,
            message : "user  Role Updated",
            success : true,
            error : false 
        })

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success: false
        })
    }
    
}

module.exports = updateUser
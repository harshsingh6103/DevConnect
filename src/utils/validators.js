const validator = require("validator");

const validateSignUpData = (req)=>{
    const {email,firstName,lastName,password} = req.body;

    if(!firstName|| !lastName){
        throw new Error("Enter your first and last name")
    }
    else if(!validator.isEmail(email)){
        throw new Error("Please enter a valid emailId")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password")
    }


    
}

module.exports = {
    validateSignUpData,
}
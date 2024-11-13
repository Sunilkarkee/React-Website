const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address'],  // Email format validation
    },
    password: {
        type: String,
        required: true,
        minlength: 6,  
    },
    number: {
        type: String,
        match: [/^\d{10}$/, 'Please enter a valid 10-digit number'],  // Number validation (e.g., 10 digits)
    },
    role : {
        type: String,
        enum : ['GENERAL', 'ADMIN']
    }
}, {
    timestamps: true, 
});


// Create the model
const userModel = mongoose.model("User", userSchema);  

module.exports = userModel;
 
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { 
        type: String, 
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true
    }, 
    password: {
        type: String, // Corrected this
        required: true, 
    },
    bio: { 
        type: String, 
        default: ""
    }, 
    occupation: {
        type: String, 
        default: ""
    }, 
    photoURL: { // Corrected this line to be inside an object
        type: String,
        default: "" 
    },
    instagram: {type: String, default: ""},
    linkedin: {type: String, default: ""},
    github: {type: String, default: ""},
    facebook: {type: String, default: ""},
}, {timestamps: true});

export const User = mongoose.model("User", userSchema); // Fixed the Model constructor


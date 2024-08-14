import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"]
    },
    username:{
        type: String,
        required: [true, "Username is required"],
    },
    image: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmrRzXrFTFNGnLFzJ-T8o9OcoNgjJSvRi-6Q&s" //default profile image
    }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User
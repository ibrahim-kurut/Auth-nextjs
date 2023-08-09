import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Please enter your full name']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true
    },
    password: {
        type: String,
        required: true

    },
    confirmPassword: {
        type: String,
        required: true

    },
    phoneNumber: {
        type: String,
        // required: true
    },
    address: {
        type: String,
    },
    job: {
        type: String,
    },
    bio: {
        type: String,
    }

},
    { timestamps: true }
)

export default mongoose.models.User || mongoose.model("User", UserSchema)
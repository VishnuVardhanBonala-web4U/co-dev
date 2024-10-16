import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

// Create a singleton for the User model
let UserModel;

if (mongoose.connection && mongoose.connection.models) {
    UserModel = mongoose.connection.models.User || mongoose.model('User', userSchema);
} else {
    UserModel = mongoose.model('User', userSchema);
}

export default UserModel;

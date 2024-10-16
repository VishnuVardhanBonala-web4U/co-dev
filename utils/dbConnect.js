import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI; // Make sure this is set in your .env file

const dbConnect = async () => {
    if (mongoose.connection.readyState >= 1) {
        return; // Already connected
    }

    return mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

export default dbConnect;

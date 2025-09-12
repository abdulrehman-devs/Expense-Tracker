import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URL);
        console.log("DB connection successful")
    }
    catch (e) {
        console.log("Error connecting to DB", e)
    }
};

export default connectDB;
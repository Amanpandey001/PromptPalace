import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'promptpalace',
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        isConnected = true;
        console.log('MongoDB connected');

        mongoose.connection.on('error', (error) => {
            console.error('MongoDB connection error:', error);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw new Error('Error connecting to MongoDB');
    }
};

export default connectDB;

import mongoose from "mongoose"
const { MongoMemoryServer } =  require('mongodb-memory-server');


async function connectToDatabase() {
    // const mongod = await MongoMemoryServer.create();
    // const getUri = mongod.getUri();

    if (!process.env.MONGODB_URI) {
        throw new Error('Error connection String');
    }

    if (mongoose.connection.readyState >= 1) {
        return;
    }

    const MONGODB_URI = process.env.MONGODB_URI;

    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error.message);

    }

}

export default connectToDatabase;
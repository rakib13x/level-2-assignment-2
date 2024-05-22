import mongoose from 'mongoose';

const connectDB = async (uri: string) => {
  try {
    await mongoose.connect(uri, {
      dbName: 'assignment-2',
    });
    console.log('Db Connected');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error; // Rethrow the error to propagate it further
  }
};

export default connectDB;

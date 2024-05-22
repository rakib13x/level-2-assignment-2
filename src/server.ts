import mongoose from 'mongoose';

const connectDB = async (uri: string) => {
  try {
    console.log('Connecting to the database:', uri);
    await mongoose.connect(uri, {
      dbName: 'assignment-2',
    });
    console.log('Db Connected');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
};

export default connectDB;

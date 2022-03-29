import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(`${process.env.MONGODB_URI}`);

    console.log(
      colors.cyan(`mongodb connected: ${connect.connection.host}`).underline
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export { connectDB };

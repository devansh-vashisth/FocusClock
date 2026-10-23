import mongoose from 'mongoose';

/**
 * Connects to MongoDB using the MONGODB_URI environment variable.
 * Throws an error (and exits cleanly) if the URI is absent.
 * Never logs credentials; only logs the sanitised host.
 */
const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error(
      '[DB] ✖  MONGODB_URI is not set.\n' +
        '       Copy server/.env.example → server/.env and fill in your connection string.'
    );
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri, {
      // These options are the defaults in Mongoose 8, listed for clarity:
      serverSelectionTimeoutMS: 5000, // fail fast during dev
    });

    // Log only the host — never log the full URI (it may contain a password)
    console.log(`[DB] ✔  MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`[DB] ✖  MongoDB connection failed: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;

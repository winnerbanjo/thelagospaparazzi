import mongoose from 'mongoose';

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://nileagencyafrica_db_user:jf2y0dLmetfak6GI@cluster0.fl2ppdk.mongodb.net/lagospaparazzi_2026?retryWrites=true&w=majority';

if (!global.__lagosPaparazziMongoose) {
  global.__lagosPaparazziMongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (global.__lagosPaparazziMongoose.conn) {
    return global.__lagosPaparazziMongoose.conn;
  }

  if (!global.__lagosPaparazziMongoose.promise) {
    global.__lagosPaparazziMongoose.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false
    });
  }

  global.__lagosPaparazziMongoose.conn = await global.__lagosPaparazziMongoose.promise;
  return global.__lagosPaparazziMongoose.conn;
}

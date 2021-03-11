const secret = process.env.JWT_SECRET || 'secret';
const timeToLive = process.env.JWT_TTL || '7d';
const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/bitfilmsdb';

module.exports = {
  secret, timeToLive, mongoURL,
};

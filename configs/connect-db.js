const mongoose = require("mongoose");

async function connectDB() {
  await mongoose.connect(process.env.URI, {
    useUniversalTopology: true,
  });
}

module.exports = { connectDB };

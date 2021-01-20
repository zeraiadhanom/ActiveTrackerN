"use strict";
exports.DATABASE_URL =
  process.env.DATABASE_URL || "mongodb+srv://project1:run123@project1.torum.mongodb.net/project1?retryWrites=true&w=majority";
  
exports.TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL || "mongodb://localhost:27017/run";
exports.PORT = process.env.PORT || 8080;

global.DATABASE_URL || "mongodb+srv://project1:run123@project1.torum.mongodb.net/project1?retryWrites=true&w=majority";
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';




















"use strict";
exports.DATABASE_URL =
  process.env.DATABASE_URL || "mongodb://sports:Letmein12@ds159164.mlab.com:59164/sportsdb"; 
exports.TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL || "mongodb://localhost:27017/run";
exports.PORT = process.env.PORT || 8080;

global.DATABASE_URL || "mongodb://sports:Letmein12@ds159164.mlab.com:59164/sportsdb";
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';





















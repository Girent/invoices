const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  transactionType: {
    type: String,
    required: true,
    maxLenght: 50,
  },

  amount: {
    type: Number,
    required: true,
  },

  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

const userSchema = new Schema({
  wallet: {
    type: Number,
    required: true,
  },

  transactions: [transactionSchema],

  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

(module.exports = mongoose.model("users", userSchema)), transactionSchema;

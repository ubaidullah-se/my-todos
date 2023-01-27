const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updated_at: {
    type: Date,
    default: () => Date.now(),
  },
});

userSchema.pre("save", async function (next) {
  let user = this;

  if (!user.isModified("password")) return next();

  try {
    let salt = await bcrypt.genSalt(SALT_ROUNDS);
    let hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (e) {
    next(e);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    let isMatch = await bcrypt.compare(candidatePassword, this.password);
    return Promise.resolve(isMatch);
  } catch (e) {
    Promise.reject(e);
  }
};

module.exports = mongoose.model("User", userSchema);

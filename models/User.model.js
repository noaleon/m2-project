const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['user', 'artist'],
    },
    skills: [String],
    favorites: {
      type: [Schema.Types.ObjectId],
      ref: 'Project',
    },
    phoneNumber: Number,
    location: String,
    profession: String,
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const User = model('User', userSchema);

module.exports = User;

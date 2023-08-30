import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  createdBy: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
});

export default mongoose.model("User", UserSchema);

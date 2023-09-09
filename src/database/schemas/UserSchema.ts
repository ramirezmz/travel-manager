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
  },
  createdBy: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  updatedAt: {
    type: Date,
  },
  updatedBy: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
});

UserSchema.pre("save", function (next) {
  const now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
    this.updatedAt = now;
  }
  next();
});

UserSchema.pre<any>("updateOne", function (next) {
  const now = new Date();
  console.log("cai aqui");
  this.updatedAt = now;
  next();
});

export default mongoose.model("User", UserSchema);

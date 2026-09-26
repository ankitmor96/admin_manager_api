import mongoose from "mongoose";

const managerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    salary: {
      type: String,
      required: true,
      trim: true
    },
    designation: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: Boolean,
      default: true
    },
    created_date: {
      type: String,
      required: true
    },
    updated_date: {
      type: String,
      required: true
    }
  },
  {
   timestamps:true
  }
);

const Manager = mongoose.model("Manager", managerSchema);

export default Manager;
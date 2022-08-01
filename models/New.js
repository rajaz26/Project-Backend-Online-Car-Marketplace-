import mongoose from "mongoose";

// const dateposted = {
//   timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
// };

const NewSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  yearmodel: {
    type: Number,
    required: true,
    default: Date.now,
  },
  color: {
    type: String,
    required: true,
  },
  transmission: {
    type: String,
    required: true,
  },
  average: {
    type: Number,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("New", NewSchema);

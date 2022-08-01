import mongoose from "mongoose";

// const dateposted = {
//   timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
// };

const UsedSchema = new mongoose.Schema(
  {
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
    mileage: {
      type: Number,
      required: true,
    },
    average: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
    },

    contact: {
      type: Number,
    },
    condition: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Used", UsedSchema);

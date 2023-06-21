import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    ads: {
      type: [String],
    },
  },
  { timestamps: true }
);

UserSchema.methods.comparePassword = async function (password) {
  try {
    const isPasswordValid = await bcrypt.compare(password, this.password);
    return isPasswordValid;
  } catch (error) {
    throw error;
  }
};
export default mongoose.model("User", UserSchema);

import mongoose, { Document } from "mongoose";

export enum Features {
  NO_SWIPE_LIMIT = "no_swipe_limit",
  VERIFIED = "verified",
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  // Add fields for swipe history (optional)
  swipeHistory: { [T: string]: "left" | "right" };
  premiumFeatures: Features[]; // Array of unlocked premium features (e.g., 'no_swipe_limit', 'verified')
  swipesLeft: number; // Track remaining swipes for rate limiting
}

const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
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
    // Add swipe history schema (optional)
    swipeHistory: { type: Object },
    premiumFeatures: {
      type: [String],
      default: [],
    },
    swipesLeft: {
      type: Number,
      default: 10, // Change to desired initial daily swipe limit
    },
  },
  { timestamps: true }
); // Enable timestamps for document creation/update

export default mongoose.model<IUser>("User", userSchema);

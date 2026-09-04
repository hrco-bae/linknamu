import mongoose, { Schema, Document } from "mongoose";

export interface ILink extends Document {
  title: string;
  url: string;
  icon: string;
  clicks: number;
  createdAt: Date;
}

const linkSchema = new Schema<ILink>(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    icon: { type: String, required: true },
    clicks: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Link || mongoose.model<ILink>("Link", linkSchema);

import mongoose, { Document, Schema } from 'mongoose';

export interface SessionDocument extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  valid: boolean;
  userAagent: string;
  createdAt: Date;
  updatedAt: Date;
}

const SessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
  },
  { timestamps: true }
);

const SessionModel = mongoose.model('Session', SessionSchema);

export default SessionModel;

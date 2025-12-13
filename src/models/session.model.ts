import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';
import { UserDocument } from './user.model';

export interface SchemaDocument extends mongoose.Document {
  user: UserDocument['_id'];
  valid: boolean;
  userAagent: string;
  createdAt: Date;
  updatedAt: Date;
  camparePassword(candidatePassword: string): Promise<Boolean>;
}

const SessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    valid: { type: Boolean, default: true },
    userAagent: { type: String },
  },
  { timestamps: true }
);

const SessionModel = mongoose.model('Session', SessionSchema);

export default SessionModel;

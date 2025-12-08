import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  camparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, require: true, unique: true },
    name: { type: String, require: true },
    password: { type: String, require: true },
  },
  { timestamps: true }
);

userSchema.pre<Document>('save', async function () {
  let user = this as UserDocument;

  if (!user.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor') || 10);

  const hashedPassword = await bcrypt.hashSync(user.password, salt);

  user.password = hashedPassword;

  return;
});

userSchema.methods.camparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const UserModel = mongoose.model('User', userSchema);

export default UserModel;

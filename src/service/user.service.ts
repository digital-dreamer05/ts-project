import mongoose from 'mongoose';
import UserModel, { UserDocument } from '../models/user.model';

export type UserInput = Omit<
  UserDocument,
  keyof mongoose.Document | 'createdAt' | 'updatedAt' | 'camparePassword'
>;

export async function createUser(input: UserInput) {
  try {
    return await UserModel.create(input);
  } catch (e: any) {
    throw new Error(e);
  }
}

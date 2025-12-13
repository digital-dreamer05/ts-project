import mongoose from 'mongoose';
import UserModel, { UserDocument } from '../models/user.model';
import { email } from 'zod';
import { fa } from 'zod/v4/locales';
import { omit } from 'lodash';

export type UserInput = Omit<
  UserDocument,
  keyof mongoose.Document | 'createdAt' | 'updatedAt' | 'camparePassword'
>;

export async function createUser(input: UserInput) {
  try {
    const user = await UserModel.create(input);

    return omit(user.toJSON(), 'password');
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function validatPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.camparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), 'password');
}

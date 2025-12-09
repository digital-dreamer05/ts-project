import { TypeOf, object, string } from 'zod';

export const creatUserSchema = object({
  body: object({
    name: string().min(2, 'Name is required'),
    email: string().email('Invalid email format'),
    password: string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: string().min(6),
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Password do not match!',
    path: ['confirmPassword'],
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof creatUserSchema>,
  'body.confirmPassword'
>;

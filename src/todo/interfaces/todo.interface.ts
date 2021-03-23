import { Document } from 'mongoose';

export interface Todo extends Document {
  _id?: string;
  title: string;
}

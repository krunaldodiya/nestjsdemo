import * as mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema({
  title: { type: String },
  completed: { type: Boolean, default: false },
});

import * as mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema({ _id: String, title: String });

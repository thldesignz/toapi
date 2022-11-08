import { Document } from 'mongoose';

export interface Todo extends Document {
    text: string;
    creator: string;
}
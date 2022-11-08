import * as mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
  timestamps: true
});

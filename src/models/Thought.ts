import { Schema, Document, model, Types } from 'mongoose';
import reactionSchema from './Reaction.js';

interface IThought extends Document {
    thoughtText: string;
    createdAt: Date | string;
    username: string;
    reactions: {
        reactionId: Types.ObjectId;
        reactionBody: string;
        username: string;
        createdAt: Date;
      }[];
}

const thoughtSchema = new Schema<IThought>(
{
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp: Date) => timestamp.toLocaleString(),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
}
);
thoughtSchema.virtual('reactionCount').get(function (this: any) {
    return this.reactions?.length
});

const Thought = model('thought', thoughtSchema);

export default Thought;
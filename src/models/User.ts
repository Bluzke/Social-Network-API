import { Schema, Document, model, ObjectId } from 'mongoose';

// interface for a user
interface IUser extends Document {
    username: string;
    email: string;
    thoughts: ObjectId[];
    friends: ObjectId[];
}

// Schema to create the user model
const userSchema = new Schema<IUser> (
    {
       username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
       },
       email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
       },
       thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'thought'
        },
       ],
       friends: [
        {
        type: Schema.Types.ObjectId,
        ref: 'user',
       },
      ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// vitual property 'friendCount' that retrives the lenght of the user's friendws array field on query.
userSchema.virtual('friendCount').get(function(this: any){
    return this.friends?.length;
});

// initialize our user model
const User = model('user', userSchema)

export default User;

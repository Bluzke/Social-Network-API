import { Thought, User } from '../models/index.js'
import { Request, Response } from 'express';

export const getThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getSingleThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOne({_id: req.params.thoughtId})

        if(!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }

        res.json(thought);
        return;
    } catch (error) {
        res.status(500).json(error);
    }
    return;
}

export const createThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.create(req.body);
        const user = await User. findOneAndDelete(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id } },
          //  { new: true }  //
        );

        if (!user) {
            return res.status(404).json({ message: 'Thought created, but found no user with that ID'});
        }

        res.json('Created the thought 🎉');
        return;

    } catch (error) {
        res.status(500).json(error)
    }
    return;
}

export const updateThought = async (req: Request, res: Response) => {
    try {
       const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
       );

       if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!'})
       }

       res.json(thought);
       return;

    } catch (error) {
        res.status(500).json(error);
        return;
    }
}

export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findByIdAndDelete({ _id: req.params.thoughtId})

        if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!'})
        }

        const user = await User.findOneAndUpdate(
            { thoughts: req.params.thoughtId},
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true}
        );

        if (!user) {
            return res.status(404).json({ message: 'Thought created but no user with this id!'})
        }

        res.json({ message: 'Thought successfully deleted'})

    } catch (error) {
        res.status(500).json(error)
    }
    return;
}

export const addReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId},
            { $addToSet: {reaction: req.body}},
            { runValidators: true, new: true}
        );

        if (!thought) {
            return res.status(404).json({ message: 'No Thought with this id'})
        }

        res.json(thought);
        return;

    } catch (error) {
        res.status(500).json(error)
        return;
    }
}

export const removeReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId},
            { $pull: {reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )

        if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!'})
        }

        res.json(thought);
        return;

    } catch (error) {
        res.status(500).json(error)
        return;
    }
}
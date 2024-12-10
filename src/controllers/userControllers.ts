import User from '../models/User.js'
import { Request, Response } from 'express'

// GET all users
export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json(error);
    }
}

// GET single user by ID
export const getSingleUser = async(req: Request, res: Response) => {
    try {
        const user = await User.findOne({_id: req.params.userId})
        .select('-__v')
        .populate('thoughts')
        .populate('friends');

        if (!user) {
            res.status(404).json({ message: 'No user with that ID' });
          } else {
            res.json(user);
          }
    } catch (error) {
        res.status(500).json(error);
    }
}

// POST a new user
export const createUser = async (req:Request, res: Response) => {
    try {
        const dbUserData = await User.create(req.body);
        res.json(dbUserData)
    } catch (error) {
        res.status(500).json(error)
    }
}

// PUT to update user by ID
export const updateUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.videoId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }
  
      res.json(user);
      return;
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
      return; 
    }
  }

  export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({_id: req.params.userId});

        if(!user) {
            return res.status(404).json({message: 'No user with this id!'});
        }

        res.json({ message: 'User successfully deleted!'})
    } catch (error) {
        res.status(500).json(error);
    }

    return;
  }

// //   POST to add a new friedn to a user's friend list
// export const addFriend = async (req: Request, res: Response) => {
//     try {
//         const user = await User.findOne({_id: req.params.userId})
//         const friend = await User.findOne({_id: req.params.friendId})

//         if(!user || !friend) {
//             return res.status(404).json({message: ' No user or friend found'})
//         }

//         user.friends.push(friend)
//         await user.save();

//         res.json({ message: 'Friend added succesfully'})
//     } catch (error) {
//         res.status(500).json(error);
//     }
//     return;
// }

// // DELETE to remove a friend from a user's friend list
// export const removeFriend = async (req: Request, res: Response) => {
//     try {
//         const user = await User.findOne({_id: req.params.userId});

//         if (!user) {
//             return res.status(404).json({ message: 'User not found'})
//         }

//         const friendIndex = user.friends.indexOf(friendId);

//         user.friends.splice(friendIndex, 1)
//     }
// }
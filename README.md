# Social-Network-API

## Description

Using Express.js, MongoDB, and Mongoose, this project demonstrates how modern social networking platforms manage and structure their data. The foundation of this application is the API, making it essential to understand how to build and structure it effectively.

### Key Features:
 Users
- GET /api/users - Retrieve all users
- GET /api/users/:id - Retrieve a single user by ID
- POST /api/users - Create a new user
- PUT /api/users/:id - Update a user by ID
- DELETE /api/users/:id - Delete a user by ID

Thoughts
- GET /api/thoughts - Retrieve all thoughts
- GET /api/thoughts/:id - Retrieve a single thought by ID
- POST /api/thoughts - Create a new thought
- PUT /api/thoughts/:id - Update a thought by ID
- DELETE /api/thoughts/:id - Delete a thought by ID

Reactions
- POST /api/thoughts/:thoughtId/reactions - Add a reaction to a thought
- DELETE /api/thoughts/:thoughtId/reactions/:reactionId - Remove a reaction from a thought
- Friends
- POST /api/users/:userId/friends/:friendId - Add a friend to a user's friend list
- DELETE /api/users/:userId/friends/:friendId - Remove a friend from a user's friend list

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Questions](#questions)


## Installation

1. open in terminal and run NPM i && npm run build.
2. run npm run start and it should open up a sever on port 3001.
3. open up insomnia and type in all the necessary routes

## Usage

Video URL: https://drive.google.com/file/d/1b4CGw4eJwwJfV352pHfIn0aBLrSkfWQw/view

GitHub Code: https://github.com/Bluzke/Social-Network-API
const usersRouter = require('express').Router();
const { createUser, getUserByUsername, getUser, getUserById } = require('../db');
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const bcrypt = require("bcrypt");

usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");
  next();
});

// post /api/users/register
usersRouter.post('/register', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const { user, token } = await createUser(username, password);
    res.json({ user, token });
  } catch (error) {
    console.error('Error creating user', error);
    next(error);
  }
});

// post /api/users/login
usersRouter.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await getUser(username, password);
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ userId: user.id }, 'your-secret-key');
    res.json({ user, token });
  } catch (error) {
    console.error('Error during login', error);
    next(error);
  }
});



// get /api/users/me
usersRouter.get('/:username/:id', async (req, res, next) => {
  const { id, username } = req.params;
  console.log(id, username);
  try {
    let user;
    if (isNaN(id) || isNaN(username)) {
      user = await getUserByUsername(username);
    } else {
      user = await getUserById(id);
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
});
  
  // usersRouter.get("/:username/routines", async (req, res, next) => {
  //   try {
  //     const {username} = req.params;
  //     const token = req.headers.authorization?.split(" ")[1];
  
  //     const decodedToken = jwt.verify(token, JWT_SECRET);
  //     const loggedInUsername = decodedToken.username;
  
  //     if (loggedInUsername === username) {
  //       const routines = await getAllRoutinesByUser({username});
  //       res.send(routines);
  //     } else {
  //       const routines = await getPublicRoutinesByUser({username});
  //       res.send(routines);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     next(error);
  //   }
  // });

module.exports = usersRouter;


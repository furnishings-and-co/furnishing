const usersRouter = require('express').Router();
const { createUser, getUserByUsername, getUser, getUserById, getUserByToken, checkAdminByToken } = require('../db');
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
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.json({ user, token });
  } catch (error) {
    console.error('Error during login', error);
    next(error);
  }
});



// get /api/users/me
usersRouter.get('/me', async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1]
  console.log("token", token);
  try {
      // get user by token
      console.log("made it into the try")
     const user = await getUserByToken(token);
     console.log("this is the user", user)
     res.send(user)
  }catch(error){
    console.log(error)
  }
});

// get /api/users/admin
usersRouter.get('/admin', async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1]

  try {
    await checkAdminByToken(token);
    // You can perform additional logic or send a response if needed
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    next(error); // Pass the error to the error handler middleware
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


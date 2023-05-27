const usersRouter = require('express').Router();
const { createUser, createCart, getUser, getUserByToken, checkAdminByToken } = require('../db');
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;


usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");
  next();
});

// post /api/users/register
usersRouter.post('/register', async (req, res, next) => { 
  const { username, password} = req.body;
  try {
    // console.log("user.id", user.id)
    const { user, token } = await createUser(username, password);
    const {cart} = await createCart(user.id);
    res.json({ user, token, cart});
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
    const {cart} = await createCart(user.id);
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.json({ user, token, cart });
  } catch (error) {
    console.error('Error during login', error);
    next(error);
  }
});



// get /api/users/me
usersRouter.get('/me', async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1]
  try {
      // get user by token
     const user = await getUserByToken(token);
     res.send(user)
  }catch(error){
    console.log(error)
  }
});

// get /api/users/admin
usersRouter.get("/admin", async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    const isAdmin = await checkAdminByToken(token);
    res.send(isAdmin); // Send the isAdmin value as the response
  } catch (error) {
    console.error(error);
    next(error); // Pass the error to the error handler middleware
  }
});


module.exports = usersRouter;


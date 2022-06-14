import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

const secret = "test";
// This is where the entire backend logic for the post request to the endpoint
// "http://localhost:3000/user/signIn" happens. 
export const signIn = async (req, res) => {
  // 1.SignIn details are caught in "req.body" object which are send through axios and are parsed (hex to JS object) using BodyParser 
  const { email, password } = req.body;
  try {
    // 2. Check if there is any user with the given email
    const oldUser = await UserModel.findOne({ email });
    // 3. If there is no such email exists then return "response: {data: {message: "User doesn't exist"}, status: 404}"
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });
    // 4. Then check where the entered password matches the password in the database.
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    // 5. If there is a mismatch then return "response: {data: {message: "Invalid Password"}, status: 400}"
    // Note: This response.data === action.payload in the redux store
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid password" });
    // 6. Create a token using secret and this token expires in 1h (experiment with "120" 120ms)
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });

    // 7. Then return "response: {data: {email: "...", username: "...", password: "..."}, status: 200}"
    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    // Server's got crashed!
    res.status(500).json({ message: "Something went wrong" });
  }
};

// This is where the entire backend logic for the post request to the endpoint
// "http://localhost:3000/user/signUp" happens. So Focus here...

export const signUp = async (req, res) => {
  // SignUp details are caught in "req.body" object and are parsed (hex to JS object) using BodyParser
  const { email, password, username } = req.body;
  try {
    // 1. Check if there is any user with given email in the database
    const oldUser = await UserModel.findOne({ email });
    // 2. If the user exists then return {data: {message: "User already exists"}}
    if (oldUser)
      return res.status(400).json({ message: "User already exists" });
    // 3. Hash the password (10 salt rounds)
    const hashedPassword = await bcrypt.hash(password, 10);
    // 4. Store the username, email, password in the database
    const result = await UserModel.create({
      email,
      password: hashedPassword,
      username: username,
    });
    // 5. Create a token using a secret and this token expires in 1h as mentioned below
    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });
    
    //6. Send back the response containing one of the object "response: {data: {result: ..., token: ...}, status: 201}" 
    res.status(201).json({ result, token });
  } catch (error) {
    // This indicates something's wrong with our server i.e., our server's crashed!!
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

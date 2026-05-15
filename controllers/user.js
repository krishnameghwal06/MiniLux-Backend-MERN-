import TryCatch from "../utils/TryCatch.js";
import sendOtp from "../utils/sendOtp.js";
// import Otp from "../models/Otp.js";
import {OTP} from "../models/Otp.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const loginUser = TryCatch(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const subject = "MiniLux App";

  const otp = Math.floor(100000 + Math.random() * 900000);

  const prevOtp = await OTP.findOne({ email });

  if (prevOtp) {
    await prevOtp.deleteOne();
  }

  await OTP.create({
    email,
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000
  });

  await sendOtp({ email, subject, otp });

  res.json({
    message: "OTP sent to your email",
  });
});


export const verifyUser = TryCatch(async (req, res) => {
  const { email, otp } = req.body;

  // basic validation
  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  // find OTP record (IMPORTANT: match otp also)
  const record = await OTP.findOne({
    email,
    otp: Number(otp),
  });

  if (!record) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  // check expiry
  if (record.expiresAt < Date.now()) {
    await record.deleteOne();
    return res.status(400).json({ message: "OTP expired" });
  }

  // find or create user
  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({ email });
  }

  // generate JWT
  const token = jwt.sign(
    { _id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  // delete OTP after successful verification
  await record.deleteOne();

  res.json({
    message: "Login successful",
    token,
    user,
  });
});

export const myProfile = TryCatch(async (req, res) => {
    const user = await User.findById(req.user._id);
    res.json(user)
    
})



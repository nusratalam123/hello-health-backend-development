import { NextFunction, Request, Response } from "express";
import Blacklist from "../model/blacklist.model";
import User from "./../model/user.model";
import { generateToken, getBearerToken } from "./../utils/token";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    
    const savedUser = await User.create(req.body);
    await savedUser.save({ validateBeforeSave: false });

    return res.status(200).json({
      message: "User signup successful",
    });
  } catch (err) {
    next(err);
  }
};

// user login
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({
        message: "Please provide your credentials",
      });
    }

    const user = await User.findOne({ name:name });

    if (!user) {
      return res.status(400).json({
        message: "No user found. Please create an account",
      });
    }

    //@ts-expect-error
    const isPasswordValid = user.comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(403).json({
        message: "Password is not correct",
      });
    }

    if (user.status === "BANNED") {
      return res.status(400).json({
        message: "The user is banned",
      });
    }

    const token = generateToken(user);
    const { password: pwd, ...info } = user.toObject();

    return res.status(200).json({
      message: "Login successful",
      data: {
        ...info,
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = await getBearerToken(req);
    await Blacklist.create({ token: token });

    res.status(200).json({
      message: "Logout successful",
    });
  } catch (err) {
    next(err);
  }
};


export const loggedInUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
     // @ts-expect-error: Assuming req.authId is set by authentication middleware
     const userID = req.authId;

     const user = await User.find({_id:userID});

     if (!user) {
       res.status(400).json({
         message: "User not found",
       });
     };
    res.status(200).json({
      message: "get Logged in user successfully",
    });
  } catch (err) {
    next(err);
  }
};

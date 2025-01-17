import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { jwtAuth } from "../utils/jwt-auth";
import path from "path";

const app = express();

//middleware
app.use(cors({
  origin: 'https://hello-health-iosf-git-main-nusrat-alams-projects.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true // If cookies or credentials are required
}));
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
app.use(jwtAuth);
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));

export default app;

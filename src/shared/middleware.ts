import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { jwtAuth } from "../utils/jwt-auth";
import path from "path";

const app = express();

//middleware
//Allowed origins for CORS
const allowedOrigins = [
  "http://localhost:3000", 
  "https://hello-health-iosf-qia8j8ft7-nusrat-alams-projects.vercel.app", 
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., mobile apps or Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, 
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
app.use(jwtAuth);
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));

export default app;

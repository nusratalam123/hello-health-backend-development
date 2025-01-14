import { Router } from "express";
import authRoutes from "./../routes/auth.route";
import userRoutes from "./../routes/user.route";
import healthDataRoutes from "../routes/healthData.route";
import bookingRoutes from "../routes/notification.route";
import medicationRoutes from "../routes/medication.route";
import doctorRoutes from "../routes/doctor.route";
import appointmentRoutes from "../routes/appointment.route";
import testimonialRoutes from "../routes/testimonial.route";
import eventRoutes from "../routes/event.route";
import foodRoutes from "../routes/food.route";
import healthSuggestionRoutes from "../routes/healthSuggestionData.route";







const router = Router();

// Root route
router.get("/", (_, res) => {
  res.send("App Working successfully");
});

// general Routes
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/health-data", healthDataRoutes);
router.use("/book", bookingRoutes);
router.use("/medications", medicationRoutes);
router.use("/doctor", doctorRoutes);
router.use("/appointment", appointmentRoutes);
router.use("/testimonial", testimonialRoutes);
router.use("/event", eventRoutes);
router.use("/food", foodRoutes);
router.use("/health-suggestion", healthSuggestionRoutes);





// Handle not found
router.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

export default router;

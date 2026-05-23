import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
import { connectDB,sequelize} from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import qualityRoutes from "./routes/qualityRoutes.js";
import learningRoutes from "./routes/learningRoute.js";

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/users", userRoutes);
app.use("/api/quality", qualityRoutes);
app.use("/api/learning", learningRoutes);

app.get("/", (req, res) => {
  res.send("Express backend is running!");
});

sequelize.sync()
  .then(() => {
    console.log("Database synced successfully");
  })
  .catch((err) => {
    console.error("Database sync error:", err);
  });

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
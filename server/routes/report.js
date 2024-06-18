import express from "express"
import { addReport, getReport, getReports, removeReport, updateReport } from "../controllers/report.js";

const router = express.Router()

router.get("/reports/:type", getReports);
router.get("/report/:id", getReport);
router.post("/add_report", addReport);
router.put("/update_report/:id", updateReport);
router.delete("/remove_report/:id", removeReport);

export default router;
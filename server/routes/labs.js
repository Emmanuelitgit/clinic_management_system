import express from "express"
import { 
        addLabResult,
        addRequest, 
        getLabResult, 
        getLabResultList, 
        getRequest, 
        getRequests, 
        removeLabResult, 
        removeRequest, 
        updateLabResult, 
        updateRequest,
        updateStatus } from "../controllers/labs.js";

const router = express.Router()

// LAB REQUEST ROUTES HERE
router.get("/requests", getRequests);
router.get("/request/:id", getRequest);
router.post("/add_request", addRequest);
router.put("/update_request/:id", updateRequest);
router.put("/update_lab_status/:id", updateStatus);
router.delete("/remove_request/:id", removeRequest);

// LAB RESULT ROUTES HERE
router.get("/lab_result_list", getLabResultList);
router.get("/lab_result/:id", getLabResult);
router.post("/add_lab_result", addLabResult);
router.put("/update_lab_result/:id", updateLabResult);
router.delete("/remove_lab_result/:id", removeLabResult);

export default router;
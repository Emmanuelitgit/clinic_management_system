import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import authRoute from "./routes/auth.js";
import staffRoute from "./routes/staff.js"
import patientAuth from "./routes/patient.js"
import appointmentRoute from "./routes/appointment.js"
import bedRoute from "./routes/bed.js"
import bloodBankRoute from "./routes/bloodBank.js"
import reportRoute from "./routes/report.js"
import medicationRoute from "./routes/medication.js"
import requestRoute from "./routes/labs.js"
import invoiceRoute from "./routes/payment.js"
import settingRoute from "./routes/setting.js"

const app = express()

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

// ROUTES DEFINITIONS
app.use("/", authRoute);
app.use("/", staffRoute);
app.use("/", patientAuth)
app.use("/", appointmentRoute);
app.use("/", bedRoute);
app.use("/", bloodBankRoute);
app.use("/", reportRoute);
app.use("/", medicationRoute);
app.use("/", requestRoute);
app.use("/", invoiceRoute);
app.use("/", settingRoute);


app.listen(5000, ()=>{
    console.log("app is running on port 5000")
})
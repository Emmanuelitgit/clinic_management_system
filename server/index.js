import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import authRoute from "./routes/auth.js";
import staffRoute from "./routes/staff.js";
import patientAuth from "./routes/patient.js";
import appointmentRoute from "./routes/appointment.js";
import bedRoute from "./routes/bed.js";
import bloodBankRoute from "./routes/bloodBank.js";
import reportRoute from "./routes/report.js";
import medicationRoute from "./routes/medication.js";
import requestRoute from "./routes/labs.js";
import invoiceRoute from "./routes/payment.js";
import settingRoute from "./routes/setting.js";
import { Server } from "socket.io";
import db from "./db.js";
import http from "http";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"]
    }
});

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES DEFINITIONS
app.use("/", authRoute);
app.use("/", staffRoute);
app.use("/", patientAuth);
app.use("/", appointmentRoute);
app.use("/", bedRoute);
app.use("/", bloodBankRoute);
app.use("/", reportRoute);
app.use("/", medicationRoute);
app.use("/", requestRoute);
app.use("/", invoiceRoute);
app.use("/", settingRoute);

io.on('connection', (socket) => {
    console.log('A user connected', socket.id);

    socket.on('sendMessage', ({ sender, receiver, message }) => {
        const query = 'INSERT INTO messages (sender, receiver, message) VALUES (?, ?, ?)';
        db.query(query, [sender, receiver, message], (err, result) => {
            if (err) {
                console.error('Error inserting message into database', err);
                return;
            }
            io.to(receiver).emit('receiveMessage', { sender, message });
            io.to(receiver).emit('receiveNotification', { sender, message });
        });
    });

    socket.on('joinRoom', (userId) => {
        socket.join(userId);
        console.log(`${userId} joined the room`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
    });
});


app.post('/messages', (req, res) => {
    const { sender, receiver } = req.body;
    const query = 'SELECT * FROM messages WHERE (sender = ? AND receiver = ?) OR (sender = ? AND receiver = ?)';
    db.query(query, [sender, receiver, receiver, sender], (err, results) => {
        if (err) {
            console.error('Error fetching messages from database', err);
            res.status(500).send('Server error');
            return;
        }
        res.json(results);
    });
});

server.listen(5000, () => {
    console.log("App is running on port 5000");
});
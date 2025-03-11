const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const winston = require("winston");
const WebSocket = require("ws");
const mysql = require("mysql2");
const csurf = require("csurf");
const sanitizeHtml = require("sanitize-html");
const multer = require("multer");

const secretKey = "lanolmcarrotistegardas";

// Middleware
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors({ origin: "https://iyi-olacagim.info", credentials: true }));
app.use(csurf({ cookie: true }));

// Rate Limiting (IP ve Kullanıcı Bazlı)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Çok fazla istek attınız, lütfen sonra tekrar deneyin."
});
app.use(limiter);

// Logger
const logger = winston.createLogger({
    level: "info",
    transports: [new winston.transports.File({ filename: "server.log" })],
});
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url} - ${req.ip}`);
    next();
});

// Güvenli Çerezler
app.get("/set-cookie", (req, res) => {
    res.cookie("sessionID", "123456789", {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 3600000,
    });
    res.send("Güvenli çerez ayarlandı.");
});

// Kullanıcı Şifreleme
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

// JWT Token
function generateToken(user) {
    return jwt.sign({ userId: user.id, role: user.role }, secretKey, { expiresIn: "1h" });
}

// SQL Injection Önleme
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql şifreniz",
    database: "mydb"
});
app.get("/user", (req, res) => {
    let userId = req.query.id;
    db.query("SELECT * FROM users WHERE id = ?", [userId], (err, result) => {
        res.send(result);
    });
});

// WebSocket Güvenliği
const wss = new WebSocket.Server({ port: 8080 });
wss.on("connection", (ws, req) => {
    const token = req.headers.authorization;
    if (!token || !verifyToken(token)) {
        ws.close();
    }
});
function verifyToken(token) {
    try {
        return jwt.verify(token, secretKey);
    } catch {
        return false;
    }
}

// XSS Koruması
app.use((req, res, next) => {
    if (req.body) {
        for (let key in req.body) {
            req.body[key] = sanitizeHtml(req.body[key]);
        }
    }
    next();
});

// Dosya Yükleme Güvenliği
const upload = multer({
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            return cb(new Error("Sadece resim dosyalarına izin verilmektedir."));
        }
        cb(null, true);
    }
});
app.post("/upload", upload.single("file"), (req, res) => {
    res.send("Dosya başarıyla yüklendi.");
});

// Process Güvenliği
process.on("uncaughtException", (err) => {
    logger.error("Beklenmeyen hata: ", err);
});
process.on("unhandledRejection", (reason, promise) => {
    logger.error("Yakalanmamış vaad hatası: ", reason);
});

// Global Hata Yakalama
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send("Bir hata oluştu, destek ekibimiz bilgilendirildi.");
});

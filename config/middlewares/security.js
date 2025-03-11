const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const xss = require("xss-clean");
const hpp = require("hpp");

module.exports = (app) => {
  app.use(helmet()); // Güvenlik başlıkları
  app.use(xss()); // XSS saldırılarına karşı koruma
  app.use(hpp()); // HTTP parametre kirliliği koruma
  app.use(cors({ origin: ["https://seninsiten.com"] })); // CORS ayarları

  // Rate Limit (DDoS koruma)
  const limiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 15 dakika
    max: 300, 
    message: "Çok fazla istek gönderdiniz, lütfen daha sonra tekrar deneyin.",
  });
  app.use(limiter);
};

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 dakika
  max: 100, // Her IP için 2 dakikada 100 istek
  message: 'Too many requests, please try again later.'
});
app.use(limiter);

// Statik dosyalara erişimi tamamen kapatır
app.use((req, res, next) => {
    if (req.path.match(/\.(css|js|json|map|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|otf)$/)) {
        return res.status(403).send("Erişim engellendi.");
    }
    next();
});

// Sayfa Yönlendirmeleri (.html uzantısını gizle)
const pages = ['biz-kimiz', 'bağış', 'depremler', 'gönüllü-ol', 'iletişim', 'index'];

// Dinamik olarak tüm sayfaları yönlendirme
pages.forEach(page => {
  app.get(`/${page}`, (req, res) => {
    // Dosyalar sunucuda kök dizinde yer alacak, public klasörüne gerek yok
    res.sendFile(path.join(__dirname, `${page}.html`));
  });
});

// Ana Sayfa
app.get('/', (req, res) => {
  // Ana sayfa yine kök dizinden alınacak
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Belirli dosya türlerine erişimi engelle
app.use((req, res, next) => {
  if (req.url.match(/\.(js|css|json|txt|md|xml)$/)) {
      res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
  } else {
      next();
  }
});

// Varsayılan 404 yönlendirmesi
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});

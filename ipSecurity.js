const getIPInfo = require('./ipInfo');
const isSuspicious = require('./aiSecurity');
const express = require('express');
const app = express();

let ipRequestCounts = {};

const MAX_REQUESTS_PER_MINUTE = 20; // IP başına dakikada izin verilen maksimum istek

async function handleIPRequest(req, res, next) {
  const ip = req.ip;

  if (!ipRequestCounts[ip]) {
    ipRequestCounts[ip] = { count: 1, lastRequestTime: Date.now() };
  } else {
    const timeDiff = (Date.now() - ipRequestCounts[ip].lastRequestTime) / 1000; // saniye cinsinden
    if (timeDiff < 60) {
      ipRequestCounts[ip].count += 1;
    } else {
      ipRequestCounts[ip].count = 1; 
    }
    ipRequestCounts[ip].lastRequestTime = Date.now();
  }

  // Eğer talepler çok sıksa, şüpheli olarak işaretle
  const reqPerMinute = ipRequestCounts[ip].count;
  if (reqPerMinute > MAX_REQUESTS_PER_MINUTE || isSuspicious(reqPerMinute)) {
    const ipInfo = await getIPInfo(ip);
    console.log(`Şüpheli IP tespit edildi: ${ipInfo.query}, ${ipInfo.city}, ${ipInfo.country}`);

    // Şüpheli IP'yi engelle
    return res.status(403).json({ message: 'Bu IP adresi yasaklanmıştır.' });
  }

  next();
}

// Güvenlik middleware'ini uygulama
app.use(handleIPRequest);

// Anasayfa route
app.get('/', (req, res) => {
  res.send('Hoşgeldiniz!');
});

app.listen(3000, () => {
  console.log('Sunucu çalışıyor...');
});

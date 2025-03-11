const helmet = require('helmet');

app.use(helmet.hsts({
  maxAge: 31536000, // 1 yıl
  includeSubDomains: true, // Alt domainler de dahil
  preload: true, // HSTS preloading listesine eklenir
}));

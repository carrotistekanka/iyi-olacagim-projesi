const { logRequest, analyzeRequests } = require('./timeSeriesAnalysis');

async function realTimeRequestAnalysis(req, res, next) {
  const ip = req.ip;
  logRequest(ip);

  const suspicious = await analyzeRequests(ip);

  if (suspicious) {
    return res.status(403).json({ message: 'Bu IP adresi şüpheli aktivitelerden dolayı yasaklanmıştır.' });
  }

  next();
}

module.exports = { realTimeRequestAnalysis };

const moment = require('moment');
const { analyzeIP } = require('./anomalyDetection');

let ipRequests = {}; // IP isteklerinin zaman içindeki verilerini tutar

function logRequest(ip) {
  const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
  if (!ipRequests[ip]) {
    ipRequests[ip] = [];
  }
  ipRequests[ip].push(timestamp);
}

async function analyzeRequests(ip) {
  const requests = ipRequests[ip] || [];
  const recentRequests = requests.filter(timestamp => moment(timestamp).isAfter(moment().subtract(1, 'minute')));
  
  if (recentRequests.length > 100) { // Eğer 1 dakikada 100'den fazla istek varsa, şüpheli
    const suspicious = await analyzeIP(ip, recentRequests.length, moment().diff(moment(recentRequests[0]), 'seconds'));
    if (suspicious) {
      console.log(`Şüpheli IP tespit edildi: ${ip}`);
      return true;
    }
  }
  return false;
}

module.exports = { logRequest, analyzeRequests };

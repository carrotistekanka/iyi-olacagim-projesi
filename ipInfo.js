const axios = require('axios');

// IP üzerinden geolocation bilgisi alma
async function getIPInfo(ip) {
  const apiUrl = `http://ip-api.com/json/${ip}?fields=country,region,city,isp,query,org`;
  
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('IP Bilgisi alınamadı:', error);
    return null;
  }
}

module.exports = getIPInfo;

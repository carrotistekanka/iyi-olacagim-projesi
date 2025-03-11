// Siteye her bir kullanıcı girdiğinde webhook adresine bilgi gönderen bir sistem.

/**

const webhookURL = "DİSCORD WEBHOOK URLSİ GİRİNİZ"; // Buraya kendi webhook URL'ni yaz
const fraudLabsAPIKey = "FraudLabs API"; // FraudLabs API anahtarınızı buraya ekleyin

// Kullanıcı bilgilerini al
function getUserInfo() {
  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    cookiesEnabled: navigator.cookieEnabled,
    screenSize: `${screen.width}x${screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    referrer: document.referrer || "Doğrudan giriş",
    ip: "Tespit ediliyor...",
    isBot: /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent),
    ddosSuspected: false
  };
}

// IP Adresini Al (Ücretsiz API Kullanarak)
async function fetchIPAddress() {
  try {
    const res = await fetch("https://api64.ipify.org?format=json");
    const data = await res.json();
    return data.ip;
  } catch (error) {
    console.error("IP alınamadı:", error);
    return "Bilinmiyor";
  }
}

// FraudLabs API'yi kullanarak IP'yi kontrol et (Bot ve DDoS şüphesi)
async function checkBotDdosSuspected(ip) {
  try {
    const res = await fetch(`https://api.fraudlabspro.com/v1/verify?key=${fraudLabsAPIKey}&ip_address=${ip}`);
    const data = await res.json();
    
    return data.is_bot || data.fraud_score > 80 || data.is_proxy;
  } catch (error) {
    console.error("DDoS ve bot kontrolü sırasında hata:", error);
    return false;
  }
}

// Discord Webhook'a Mesaj Gönder
async function sendToDiscord() {
  const userInfo = getUserInfo();
  userInfo.ip = await fetchIPAddress();
  userInfo.ddosSuspected = await checkBotDdosSuspected(userInfo.ip);

  const message = {
    username: "Tarayıcı Logger",
    avatar_url: "https://cdn-icons-png.flaticon.com/512/733/733579.png",
    embeds: [
      {
        title: "Yeni Ziyaretçi Bilgileri",
        color: 3447003,
        fields: [
          { name: "IP Adresi", value: `\`${userInfo.ip}\``, inline: false },
          { name: "Tarayıcı", value: `\`${userInfo.userAgent}\``, inline: false },
          { name: "Platform", value: `\`${userInfo.platform}\``, inline: true },
          { name: "Dil", value: `\`${userInfo.language}\``, inline: true },
          { name: "Çerezler Açık mı?", value: userInfo.cookiesEnabled ? "✅ Evet" : "❌ Hayır", inline: true },
          { name: "Ekran Boyutu", value: `\`${userInfo.screenSize}\``, inline: true },
          { name: "Zaman Dilimi", value: `\`${userInfo.timezone}\``, inline: true },
          { name: "Geldiği Sayfa", value: `\`${userInfo.referrer}\``, inline: false },
          { name: "Bot mu?", value: userInfo.isBot ? "✅ Evet" : "❌ Hayır", inline: true },
          { name: "DDoS Şüphesi", value: userInfo.ddosSuspected ? "⚠️ Evet" : "❌ Hayır", inline: true }
        ],
        timestamp: new Date().toISOString()
      }
    ]
  };

  fetch(webhookURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message)
  })
    .then(response => console.log("Webhook gönderildi:", response))
    .catch(error => console.error("Hata oluştu:", error));
}
 */
// Sayfa yüklendiğinde çalıştır
/* sendToDiscord(); */
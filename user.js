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
  
  async function sendToMongoDB() {
    const userInfo = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      cookiesEnabled: navigator.cookieEnabled,
      screenSize: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      referrer: document.referrer || "Doğrudan giriş",
      ip: await fetchIPAddress() // IP'yi çek
    };
  
    fetch("http://localhost:3000/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo)
    })
      .then(response => response.json())
      .then(data => console.log("MongoDB'ye gönderildi:", data))
      .catch(error => console.error("Hata oluştu:", error));
  }
  
  // Sayfa açıldığında MongoDB'ye veri gönder
  sendToMongoDB();
  
document.getElementById("infoForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const surname = document.getElementById("surname").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const mail = document.getElementById("mail").value.trim();
    const description = document.getElementById("description").value.trim() || "Açıklama yazılmamış.";

    const webhookURL = "DİSCORD WEBHOOK URLSİ GİRİNİZ";

    const payload = {
        content: "**Yeni İletişim Gönderisi!**",
        embeds: [{
            title: "📄 İletişim Bilgileri",
            color: 3447003,
            fields: [
                { name: "👤 İsim", value: `${name} ${surname}`, inline: true },
                { name: "📞 Telefon", value: phone },
                { name: "✉️ Mail", value: mail, inline: true },
                { name: "📝 Açıklama", value: description }
            ],
            timestamp: new Date()
        }]
    };

    try {
        const response = await fetch(webhookURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            showNotification("✅ Başarı!", "İletişim bilgileriniz başarıyla gönderildi.", "success");
        } else {
            showNotification("❌ Hata!", "İletişim bilgileriniz gönderilirken bir hata oluştu.", "error");
        }
    } catch (error) {
        console.log("❌ bilgiler alınırken bir hata oluştu.", "error");
    }
});

function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

function showNotification(title, message, type) {
    const notification = document.createElement("div");
    notification.classList.add("notification", type);
    notification.innerHTML = `<strong>${title}</strong><br>${message}`;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = "0";
        setTimeout(() => notification.remove(), 500);
    }, 5000);
}


document.addEventListener("DOMContentLoaded", function () {
    /* -------------------------------
       1. Alt Menü Toggle İşlemi
    ------------------------------- */
    document.getElementById('menuToggle').addEventListener('click', function() {
      this.classList.toggle('open');
      document.getElementById('submenu').classList.toggle('open');
  });
  
  document.addEventListener('click', function(event) {
      const menu = document.getElementById('menuToggle');
      const submenu = document.getElementById('submenu');
      if (!menu.contains(event.target) && !submenu.contains(event.target)) {
          menu.classList.remove('open');
          submenu.classList.remove('open');
      }
  });
});
document.getElementById("feedbackForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Sayfanın yenilenmesini engelle

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const webhookURL = "DİSCORD WEBHOOK URLSİ GİRİNİZ";

    const payload = {
        content: "**Yeni Geri Bildirim!**",
        embeds: [{
            title: "📩 Geri Bildirim",
            color: 3447003,
            fields: [
                { name: "👤 Ad", value: name, inline: true },
                { name: "✉️ E-posta", value: email, inline: true },
                { name: "💬 Mesaj", value: message }
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
            showNotification("✅ Başarı!", "Geri bildiriminiz başarıyla gönderildi.", "success");
            document.getElementById("feedbackForm").reset();
        } else {
            showNotification("❌ Hata!", "Geri bildirim gönderilirken bir hata oluştu.", "error");
        }
    } catch (error) {
        showNotification("❌ Hata!", "Geri bildirim gönderilirken bir hata oluştu.", "error");
    }
});

// Başarı/Hata mesajı gösteren fonksiyon
function showNotification(title, message, type) {
    const notification = document.createElement("div");
    notification.classList.add("notification", type);
    notification.innerHTML = `<strong>${title}</strong><br>${message}`;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.bottom = "50px";
        setTimeout(() => {
            notification.style.opacity = "0";
            setTimeout(() => notification.remove(), 500);
        }, 4000);
    }, 100);
}

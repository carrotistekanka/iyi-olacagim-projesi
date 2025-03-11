document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("infoForm").addEventListener("submit", async function (event) {
        event.preventDefault(); // Sayfanın yenilenmesini engelle

        // Form verilerini al
        const name = document.getElementById("name").value.trim();
        const surname = document.getElementById("surname").value.trim();
        const birthdateRaw = document.getElementById("birthdate").value;
        const birthdate = birthdateRaw ? formatDate(birthdateRaw) : "Belirtilmemiş";
        const address = document.getElementById("address").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const mail = document.getElementById("mail").value.trim();
        const description = document.getElementById("description").value.trim() || "Açıklama yazılmamış.";

        // Form verilerini konsola yazdırarak kontrol edelim
        console.log({ name, surname, birthdate, address, phone, mail, description });

        // Webhook URL'si (Güvenlik nedeniyle paylaşırken değiştirdiğinden emin ol)
        const webhookURL = "DİSCORD WEBHOOK URLSİ GİRİNİZ";

        // Gönderilecek veriler
        const payload = {
            content: "**Yeni Gönüllü Başvurusu!**",
            embeds: [{
                title: "📄 Gönüllü Bilgileri",
                color: 3447003,
                fields: [
                    { name: "👤 İsim", value: `${name} ${surname}`, inline: true },
                    { name: "📅 Doğum Tarihi", value: birthdate, inline: true },
                    { name: "📍 Konum", value: address },
                    { name: "📞 Telefon", value: phone },
                    { name: "📧 Mail", value: mail },
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

            // Response kontrolü
            if (response.ok) {
                showNotification("✅ Başarı!", "Başvurunuz başarıyla gönderildi.", "success");
                document.getElementById("infoForm").reset(); // Formu temizle
            } else {
                showNotification("❌ Hata!", "Başvuru gönderilirken bir hata oluştu.", "error");
            }
        } catch (error) {
            console.error("Webhook gönderim hatası:", error);
            showNotification("❌ Hata!", "Formu gönderirken bir hata oluştu.", "error");
        }
    });
});

// Tarih formatını düzenleyen fonksiyon
function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

// Bildirim mesajı gösteren fonksiyon
function showNotification(title, message, type) {
    const notification = document.getElementById("notification");
    const responseTitle = document.getElementById("responseTitle");
    const responseDetails = document.getElementById("responseDetails");

    responseTitle.textContent = title;
    responseDetails.textContent = message;
    notification.style.display = "block";
}

async function getUserInfo() {
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();
    const ipAddress = ipData.ip;

    const apiKey = 'fc8b6e9cfd408b'; // ipinfo.io API anahtarı
    const locationResponse = await fetch(`https://ipinfo.io/${ipAddress}/json?token=${apiKey}`);
    const locationData = await locationResponse.json();

    return {
        ipAddress: ipData.ip,
        country: locationData.country,
        city: locationData.city,
        region: locationData.region,
    };
}

// Durum seçildiğinde fotoğraf yükleme alanını göster/gizle
const situationSelect = document.getElementById("situation");
const photoUpload = document.getElementById("photoUpload");

function updatePhotoUploadVisibility() {
    if (situationSelect.value === "kayıp-bildirimi") {
        photoUpload.style.display = "block";
    } else {
        photoUpload.style.display = "none";
        photoUpload.value = ""; // Dosya seçimini temizle
    }
}

updatePhotoUploadVisibility();

situationSelect.addEventListener("change", updatePhotoUploadVisibility);

// Yalnızca resim dosyalarının seçilmesine izin ver
photoUpload.addEventListener("change", function () {
    if (photoUpload.files.length > 0) {
        const file = photoUpload.files[0];
        const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];

        if (!allowedTypes.includes(file.type)) {
            alert("Yalnızca PNG, JPG, JPEG veya GIF formatındaki resim dosyalarını yükleyebilirsiniz.");
            photoUpload.value = ""; // Seçimi temizle
        }
    }
});

document.getElementById("infoForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const userInfo = await getUserInfo();

    const webhookURL = "DİSCORD WEBHOOK URLSİ GİRİNİZ";

    let embedObject = {
        fields: [
            { name: "Durum", value: document.getElementById("situation").value },
            { name: "Konum", value: document.getElementById("address").value },
            { name: "Detaylar", value: document.getElementById(`description`).value || "Açıklama yazılmamış." },
            { name: "Gönderen IP", value: userInfo.ipAddress },
            { name: "Ülke", value: userInfo.country },
            { name: "Şehir", value: userInfo.city },
            { name: "İlçe", value: userInfo.region },
        ],
        color: 15158332
    };

    const photoUpload = document.getElementById("photoUpload");
    const file = photoUpload.files[0];

    const payload = {
        content: "Acil Yardım Çağrısı",
        embeds: [embedObject]
    };

    if (file) {
        const formData = new FormData();
        formData.append("payload_json", JSON.stringify(payload));
        formData.append("file", file, "photo.jpg");

        fetch(webhookURL, {
            method: "POST",
            body: formData
        }).then(response => {
            if (response.ok) {
                displayMessage("Acil yardım çağrınız başarıyla iletildi!", "success");
                document.getElementById("infoForm").reset();
                photoUpload.style.display = "none";
            } else {
                displayMessage("Gönderme başarısız oldu, lütfen tekrar deneyin.", "error");
            }
        }).catch(error => {
            console.error("Hata:", error);
            displayMessage("Bir hata oluştu, lütfen tekrar deneyin.", "error");
        });
    } else {
        fetch(webhookURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        }).then(response => {
            if (response.ok) {
                displayMessage("Acil yardım çağrınız başarıyla iletildi!", "success");
                document.getElementById("infoForm").reset();
                photoUpload.style.display = "none";
            } else {
                displayMessage("Gönderme başarısız oldu, lütfen tekrar deneyin.", "error");
            }
        }).catch(error => {
            console.error("Hata:", error);
            displayMessage("Bir hata oluştu, lütfen tekrar deneyin.", "error");
        });
    }
});

function displayMessage(message, type) {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = "0";
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

window.onload = function() {
    setTimeout(() => {
        document.getElementById("loading-screen").style.display = "none";
    }, 2000); 
  };
  
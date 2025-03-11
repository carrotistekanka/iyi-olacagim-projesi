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
  /* -------------------------------
     2. Resim
  ------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    const galleryItems = document.querySelectorAll(".gallery-item");
    const leftBtn = document.querySelector(".left-btn");
    const rightBtn = document.querySelector(".right-btn");
    let currentIndex = 0;

    function showImage(index) {
      galleryItems.forEach((item) => {
        item.style.display = "none";
      });
      galleryItems[index].style.display = "block";
    }

    leftBtn.addEventListener("click", function () {
      currentIndex =
        currentIndex === 0 ? galleryItems.length - 1 : currentIndex - 1;
      showImage(currentIndex);
    });

    rightBtn.addEventListener("click", function () {
      currentIndex =
        currentIndex === galleryItems.length - 1 ? 0 : currentIndex + 1;
      showImage(currentIndex);
    });

    showImage(currentIndex);
  });

  /* -------------------------------
     3. Haberler
  ------------------------------- */
  const newsItems = document.querySelectorAll(".news-item");
  newsItems.forEach((item) => {
    item.addEventListener("click", function () {
      item.classList.toggle("expanded");
    });
  });

  /* -------------------------------
     4. Deprem Verileri
  ------------------------------- */
  function fetchEarthquakeData() {
    fetch("https://api.orhanaydogdu.com.tr/deprem/kandilli/live")
      .then((response) => response.json())
      .then((data) => {
        const eqContainer = document.getElementById("earthquakeData");
        let eqHtml = "";
        if (data && data.result && Array.isArray(data.result) && data.result.length > 0) {
          data.result.slice(0, 20).forEach((eq) => {
            const earthquakeDate = new Date(eq.date);
            const localDate = earthquakeDate.toLocaleDateString("tr-TR", {
              timeZone: "Europe/Istanbul",
            });
            const localTime = earthquakeDate.toLocaleTimeString("tr-TR", {
              timeZone: "Europe/Istanbul",
            });
  
            eqHtml += `
              <div class="eq-item">
                <p><strong>Tarih:</strong> ${localDate || "Bilinmiyor"}</p>
                <p><strong>Saat:</strong> ${localTime || "Bilinmiyor"}</p>
                <p><strong>Büyüklük:</strong> ${eq.mag || "Bilinmiyor"}</p>
                <p><strong>Yer:</strong> ${eq.lokasyon || eq.location || eq.title || "Bilinmiyor"}</p>
                <p><strong>Derinlik:</strong> ${eq.depth ? eq.depth + " km" : "N/A"}</p>
                <p><strong>Enlem:</strong> ${
                  eq.geojson && eq.geojson.coordinates
                    ? eq.geojson.coordinates[1]
                    : "N/A"
                }</p>
                <p><strong>Boylam:</strong> ${
                  eq.geojson && eq.geojson.coordinates
                    ? eq.geojson.coordinates[0]
                    : "N/A"
                }</p>
              </div>
            `;
          });
        } else {
          eqHtml = "<p>Deprem verisi alınamadı.</p>";
        }
        eqContainer.innerHTML = eqHtml;
      })
      .catch((error) => {
        console.error("Deprem verileri alınırken hata oluştu:", error);
        document.getElementById("earthquakeData").innerHTML =
          "<p>Deprem verileri alınırken hata oluştu.</p>";
      });
  }  
  fetchEarthquakeData();
  setInterval(fetchEarthquakeData, 30000);

  /* -------------------------------
     5. Bağış
  ------------------------------- */
  const donationForm = document.getElementById("donationForm");
  donationForm.addEventListener("submit", function (e) {
    e.preventDefault(); 
    const donationAmount = document.getElementById("donationAmount").value;
    alert(`Teşekkürler! ${donationAmount} TL bağış yaptınız.`);
    donationForm.reset();
  });
});

window.onload = function() {
  setTimeout(() => {
      document.getElementById("loading-screen").style.display = "none";
  }, 2000);
};

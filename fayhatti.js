let cities = [];

// Türkiye API'sinden şehir ve ilçeleri alalım
async function fetchCities() {
    try {
        const response = await fetch('https://api.turkiye-api.com/cities');
        const data = await response.json();
        cities = data || [];
    } catch (error) {
        console.error('Şehir verileri alınırken bir hata oluştu', error);
    }
}

// Şehir araması ve sonuçları gösterme
function searchCity() {
    const citySearchInput = document.getElementById('citySearch').value.trim();
    if (!citySearchInput) {
        alert('Lütfen bir şehir veya ilçe girin!');
        return;
    }

    
    document.getElementById('loadingMessage').style.display = 'block';
    document.getElementById('riskMessage').innerText = ''; 
    document.getElementById('faultLinesList').innerHTML = ''; 

    const matchedCity = cities.find(city =>
        city.name.toLowerCase().includes(citySearchInput.toLowerCase())
    );

    if (matchedCity) {
        getRiskInfo(matchedCity.name);
    } else {
        document.getElementById('loadingMessage').style.display = 'none';
        document.getElementById('riskMessage').innerText = 'Bu şehir ya da ilçe bulunamadı.';
    }
}

async function getRiskInfo(city) {
    try {
        const response = await fetch('https://api.orhanaydogdu.com.tr/deprem/kandilli/live');
        const data = await response.json();

        console.log('API Yanıtı:', data);

        if (!data || !data.result) {
            document.getElementById('loadingMessage').style.display = 'none';
            document.getElementById('riskMessage').innerText = 'Veri alınırken bir hata oluştu.';
            return;
        }

        const riskData = data.result.filter(risk =>
            risk.city.toLowerCase().includes(city.toLowerCase().trim())
        );

        if (riskData.length > 0) {
            document.getElementById('loadingMessage').style.display = 'none'; 
            document.getElementById('riskMessage').innerText = `${city} için fay hattı riski bilgileri:`;
            displayFaultLines(riskData);
        } else {
            document.getElementById('loadingMessage').style.display = 'none';
            document.getElementById('riskMessage').innerText = `${city} için fay hattı riski bilgisi bulunamadı.`;
        }
    } catch (error) {
        document.getElementById('loadingMessage').style.display = 'none';
        document.getElementById('riskMessage').innerText = 'Fay hattı riski verisi alınırken bir hata oluştu.';
        console.error('Hata:', error);
    }
}

function displayFaultLines(riskData) {
    const faultLinesList = document.getElementById('faultLinesList');
    faultLinesList.innerHTML = ''; 
    riskData.forEach(risk => {
        const listItem = document.createElement('li');
        listItem.innerText = `Fay Hattı: ${risk.faultLine} - Risk Durumu: ${risk.risk}`;
        faultLinesList.appendChild(listItem);
    });
}

document.addEventListener('DOMContentLoaded', fetchCities);

window.onload = function() {
    setTimeout(() => {
        document.getElementById("loading-screen").style.display = "none";
    }, 2000); 
};
  
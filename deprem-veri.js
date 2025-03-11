$(document).ready(function() {
    function fetchEarthquakeData() {
        $.ajax({
            url: 'https://api.orhanaydogdu.com.tr/deprem/kandilli/live',
            method: 'GET',
            dataType: 'json',
            success: function(response) {
                let earthquakes = response.result;
                let html = '';
                if (earthquakes && Array.isArray(earthquakes) && earthquakes.length > 0) {
                    earthquakes.forEach(function(eq) {
                        html += '<div class="earthquake-item" style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">'; // Çerçeve
                        html += '<p><strong>Zaman:</strong> ' + (eq.date || 'Bilinmiyor') + '</p>';
                        html += '<p><strong>Büyüklük:</strong> ' + (eq.mag || 'N/A') + '</p>';
                        html += '<p><strong>Yer:</strong> ' + (eq.title || 'Bilinmiyor') + '</p>';
                        html += '<p><strong>Derinlik:</strong> ' + (eq.depth || 'N/A') + ' km</p>';
                        html += '<p><strong>Enlem:</strong> ' + (eq.geojson?.coordinates[1] || 'N/A') + '</p>';
                        html += '<p><strong>Boylam:</strong> ' + (eq.geojson?.coordinates[0] || 'N/A') + '</p>';
                        html += '</div>';
                        html += '<pre style="font-family: monospace; color: #777;">\n\n</pre>'; // Çerçeve ve yeni satır
                    });
                } else {
                    html = '<p>Deprem verisi bulunamadı.</p>';
                }
                $('#earthquakeData').html(html);
            },
            error: function() {
                $('#earthquakeData').html('<p>Deprem verileri alınamadı.</p>');
            }
        });
    }

    fetchEarthquakeData();
    setInterval(fetchEarthquakeData, 30000);
});

window.onload = function() {
    setTimeout(() => {
        document.getElementById("loading-screen").style.display = "none";
    }, 2000);
};

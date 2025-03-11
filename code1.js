// Developer Konsolunun açılması engelli.
// Eğer ki ilgili kod dosyasını silerseniz bu kod rahatlıkla çalışacaktır.


// Gelişmiş hata yakalama ve loglama
window.addEventListener('error', (event) => {
    console.error('Hata yakalandı:', event.message, 'Kaynak:', event.filename, 'Satır:', event.lineno);
});
window.addEventListener('unhandledrejection', (event) => {
    console.error('Yakalanmamış Promise hatası:', event.reason);
});

// Sayfa performansını detaylı takip etme
setInterval(() => {
    console.log('Sayfa yükleme süresi:', performance.now(), 'ms');
    console.log('Bellek kullanımı:', performance.memory?.usedJSHeapSize, 'byte');
}, 5000);

// Ağ bağlantısını izleme ve offline desteği
document.addEventListener('DOMContentLoaded', () => {
    const targetStatus = document.getElementById('network-status');
    function updateStatus() {
        if (navigator.onLine) {
            console.log('Bağlantı geri geldi!');
            targetStatus.textContent = 'Online';
            targetStatus.style.color = 'green';
        } else {
            console.warn('Bağlantı koptu!');
            targetStatus.textContent = 'Offline';
            targetStatus.style.color = 'red';
        }
    }
    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);
    updateStatus();
});

// Gelişmiş LocalStorage ve sessionStorage yönetimi
const StorageManager = {
    setItem: (key, value, persist = true) => {
        const storage = persist ? localStorage : sessionStorage;
        storage.setItem(key, JSON.stringify(value));
    },
    getItem: (key, persist = true) => {
        const storage = persist ? localStorage : sessionStorage;
        return JSON.parse(storage.getItem(key));
    },
    removeItem: (key, persist = true) => {
        const storage = persist ? localStorage : sessionStorage;
        storage.removeItem(key);
    },
    clear: (persist = true) => {
        const storage = persist ? localStorage : sessionStorage;
        storage.clear();
    }
};

// Gelişmiş DOM işlemleri ve yardımcı fonksiyonlar
const DomHelper = {
    createElement: (tag, { className = '', text = '', attributes = {} } = {}) => {
        const elem = document.createElement(tag);
        if (className) elem.className = className;
        if (text) elem.textContent = text;
        Object.keys(attributes).forEach(attr => elem.setAttribute(attr, attributes[attr]));
        return elem;
    },
    addClass: (element, className) => element.classList.add(className),
    removeClass: (element, className) => element.classList.remove(className),
    toggleClass: (element, className) => element.classList.toggle(className),
    setText: (element, text) => element.textContent = text,
    setHTML: (element, html) => element.innerHTML = html
};

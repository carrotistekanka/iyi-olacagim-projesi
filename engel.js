// Sağ tıklamayı engelle
document.addEventListener("contextmenu", (e) => e.preventDefault());

// Klavye kısayollarını engelle
document.addEventListener("keydown", (e) => {
    if (
        e.key === "F12" || 
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) || 
        (e.ctrlKey && e.key === "U")
    ) {
        e.preventDefault();
    }
});

// DevTools açık mı kontrol et
(function() {
    const devtools = new Function("debugger");
    setInterval(() => {
        devtools();
    }, 100);
})();

// DevTools açıldığında sayfayı kapat veya yönlendir
setInterval(() => {
    if (window.outerHeight - window.innerHeight > 200 || window.outerWidth - window.innerWidth > 200) {
        window.location.href = "about:blank"; // Boş sayfaya yönlendir
    }
}, 500);

document.querySelector("#phone").addEventListener("input", function (event) {
    let phone = event.target.value.replace(/\D/g, ''); // Sadece rakamları al
    if (phone.length < 4) {
        event.target.value = phone;
    } else if (phone.length < 7) {
        event.target.value = phone.replace(/(\d{3})(\d{0,3})/, '$1 $2');
    } else if (phone.length < 10) {
        event.target.value = phone.replace(/(\d{3})(\d{3})(\d{0,2})/, '$1 $2 $3');
    } else {
        event.target.value = phone.replace(/(\d{3})(\d{3})(\d{2})(\d{0,2})/, '$1 $2 $3 $4');
    }
});

// Doğum tarihi alanının kontrolü: Yıl 2025'ten büyük olmasın
document.querySelector("#birthdate").addEventListener("input", function (event) {
    var selectedDate = new Date(event.target.value);
    var currentYear = new Date().getFullYear();
    if (selectedDate.getFullYear() > currentYear) {
        alert("Doğum yılı 2025'ten büyük olamaz.");
        event.target.value = "";
    }
});
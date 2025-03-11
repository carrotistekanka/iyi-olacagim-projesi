document.addEventListener("DOMContentLoaded", function () {
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
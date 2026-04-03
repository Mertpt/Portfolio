   const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');
        const html = document.documentElement;

        themeToggle.addEventListener('click', () => {
            const theme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
        });

        // Sayfa yüklendiğinde tercihi hatırla
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            html.setAttribute('data-theme', savedTheme);
            themeIcon.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
        }

        function closeModal() {
    const modal = document.getElementById('patchNotesModal');
    modal.style.display = 'none';
}

// İleride "Sadece bir kez göster" yapmayı planladığım zaman için >:3c :
// if (localStorage.getItem('modalSeen')) { closeModal(); }
// function closeModal() { ... localStorage.setItem('modalSeen', 'true'); }
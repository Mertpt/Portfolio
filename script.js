   // Last.fm Ayarları
const LFM_API_KEY = '5a01d518d1079f76e22fff6f4a436da6';
const LFM_USER = 'Mertiktik';

async function fetchLastFM() {
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LFM_USER}&api_key=${LFM_API_KEY}&format=json&limit=1`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        const track = data.recenttracks.track[0];
        
        // HTML elementlerini yakala
        const trackNameEl = document.getElementById('track-name');
        const artistNameEl = document.getElementById('artist-name');
        const statusLabelEl = document.getElementById('status-label');
        const musicBox = document.querySelector('.music-box'); // Senin bento kutunun class'ı

        // Şarkı bilgilerini yerleştir
        trackNameEl.innerText = track.name.toUpperCase();
        artistNameEl.innerText = track.artist['#text'];

        // Dinleme durumu kontrolü (Şu an mı çalıyor?)
        const isNowPlaying = track['@attr'] && track['@attr'].nowplaying === 'true';

        if (isNowPlaying) {
            statusLabelEl.innerText = "ŞU AN ÇALINIYOR 🎵";
            statusLabelEl.style.background = "var(--accent-gold)";
            statusLabelEl.style.color = "#000";
            musicBox.style.animation = "pulse-border 2s infinite"; // Çalıyorsa parlasın!
        } else {
            statusLabelEl.innerText = "SON DİNLENEN 💤";
            statusLabelEl.style.background = "#333";
            statusLabelEl.style.color = "#fff";
            musicBox.style.animation = "none";
        }

    } catch (error) {
        console.error("Müzik verisi çekilemedi:", error);
    }
}

// Sayfa yüklenince çalıştır ve her 30 saniyede bir güncelle
fetchLastFM();
setInterval(fetchLastFM, 30000);
   
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
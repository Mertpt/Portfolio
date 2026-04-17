   // Last.fm Ayarları
const LFM_API_KEY = '5a01d518d1079f76e22fff6f4a436da6';
const LFM_USER = 'Mertiktik';

async function fetchLastFM() {
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LFM_USER}&api_key=${LFM_API_KEY}&format=json&limit=1`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        const track = data.recenttracks.track[0];
        data?.recenttracks?.track?.[0]?.name || "Dinleniyor...";
        
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

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let scrambleInterval = null;
let isAnimating = false; // Animasyonun çalışıp çalışmadığını takip eder

const scrambleText = (event) => {
  // Eğer animasyon zaten çalışıyorsa, fonksiyonu durdur ve baştan başlatma
  if (isAnimating) return; 
  
  isAnimating = true;
  let iteration = 0;
  const target = event.target;
  const originalText = target.dataset.value || target.innerText; 
  
  clearInterval(scrambleInterval);
  
  scrambleInterval = setInterval(() => {
    target.innerText = target.innerText
      .split("")
      .map((letter, index) => {
        if(index < iteration) {
          return originalText[index];
        }
        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");
    
    if(iteration >= originalText.length){ 
      target.innerText = originalText; 
      clearInterval(scrambleInterval);
      isAnimating = false; // Animasyon bittiğinde kilidi aç
    }
    
    iteration += 1 / 3;
  }, 30);
}

// hover event'i
document.querySelector("h1").onmouseenter = scrambleText;

//MAtch the Cards project's JavaScript
const icons = ['💀', '🔐', '💻', '🧪', '📟', '🔌', '🕹️', '📡'];
let cards = [...icons, ...icons];
let flippedCards = [];
let moves = 0;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    const grid = document.getElementById('game-grid');
    grid.innerHTML = '';
    shuffle(cards).forEach((icon, index) => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.icon = icon;
        card.dataset.index = index;
        card.onclick = () => flipCard(card);
        grid.appendChild(card);
    });
}

function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.innerText = card.dataset.icon;
        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            moves++;
            document.getElementById('moves').innerText = moves;
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.icon === card2.dataset.icon) {
        flippedCards = [];
    } else {
        setTimeout(() => {
            card1.innerText = '';
            card2.innerText = '';
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

// Yenile butonunun çalışması için:
function resetGame() {
    moves = 0;
    document.getElementById('moves').innerText = moves;
    flippedCards = [];
    createBoard(); // Tahtayı yeniden dağıt
}

// SAYFA YÜKLENDİĞİNDE OYUNU BAŞLATAN O SİHİRLİ SATIR:
createBoard();
//==============================================
// Seçicileri eşitleyelim
const contactBtn = document.querySelector('.btn.btn-primary'); 
const modal = document.querySelector('#contact-modal');
const closeBtn = document.querySelector('.close-button'); // HTML'deki class

// Modalı Aç
contactBtn.addEventListener('click', () => {
    modal.classList.add('active');
});

// Kapat
closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

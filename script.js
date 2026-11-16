
function openInvitation() {
  document.querySelector(".cover").style.display = "none";

  const invitation = document.getElementById("invitation");
  invitation.style.display = "block";

  const music = document.getElementById("backgroundMusic");

  if (music) {
    music.volume = 0.5;
    music.play().catch(function(error) {
      console.log("Musik belum dapat diputar:", error);
    });
  }

  window.scrollTo(0, 0);
}
function updateCountdown() {
  const weddingDate = new Date("2026-12-08T08:00:00+07:00").getTime();

  const now = Date.now();
  const distance = weddingDate - now;

  const days = document.getElementById("days");
  const hours = document.getElementById("hours");
  const minutes = document.getElementById("minutes");
  const seconds = document.getElementById("seconds");

  if (!days || !hours || !minutes || !seconds) return;

  if (distance <= 0) {
    days.textContent = "0";
    hours.textContent = "0";
    minutes.textContent = "0";
    seconds.textContent = "0";
    return;
  }

  days.textContent = Math.floor(distance / 86400000);
  hours.textContent = Math.floor((distance % 86400000) / 3600000);
  minutes.textContent = Math.floor((distance % 3600000) / 60000);
  seconds.textContent = Math.floor((distance % 60000) / 1000);
}

updateCountdown();
setInterval(updateCountdown, 1000);
const rsvpForm = document.getElementById("rsvpForm");

if (rsvpForm) {
  rsvpForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const nama = document.getElementById("nama").value;
    const kehadiran = document.getElementById("kehadiran").value;
    const jumlah = document.getElementById("jumlah").value;
    const pesan = document.getElementById("rsvpMessage");
    const tombol = document.getElementById("rsvpButton");

    const scriptURL = "https://script.google.com/macros/s/AKfycbxzf8c6EKsrHeKIqso9npgeweNHuFNObKf2ZZGKeDYV18z44TUgTOAtdbYPbF9iYk_m/exec";

    tombol.disabled = true;
    tombol.textContent = "MENGIRIM...";

    fetch(scriptURL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify({
        nama: nama,
        kehadiran: kehadiran,
        jumlah: jumlah
      })
    })
    .then(function() {
      pesan.textContent = "Terima kasih, konfirmasi Anda telah dikirim.";
      rsvpForm.reset();
    })
    .catch(function(error) {
      pesan.textContent = "Maaf, konfirmasi gagal dikirim. Silakan coba lagi.";
      console.error(error);
    })
    .finally(function() {
      tombol.disabled = false;
      tombol.textContent = "KIRIM KONFIRMASI";
    });
  });
}
function toggleMusic() {
  const music = document.getElementById("backgroundMusic");
  const button = document.getElementById("musicButton");

  if (music.paused) {
    music.play();
    button.textContent = "♫";
  } else {
    music.pause();
    button.textContent = "Ⅱ";
  }
}
// ANIMASI SAAT SCROLL
// ANIMASI ELEMEN SAAT SCROLL
document.addEventListener("DOMContentLoaded", function() {

  const elements = document.querySelectorAll(
    "h1, h2, h3, p, img, button:not(#musicButton), .gold-line"
  );

  const directions = [
    "from-bottom",
    "from-left",
    "from-right",
    "from-top"
  ];

  elements.forEach(function(element, index) {
    element.classList.add("reveal-item");
    element.classList.add(directions[index % 4]);
    element.style.transitionDelay = (index % 4) * 150 + "ms";
  });

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("show-item");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.10
  });

  elements.forEach(function(element) {
    observer.observe(element);
  });

});
// NAMA TAMU UNDANGAN
const params = new URLSearchParams(window.location.search);
const namaTamu = params.get("to");
const guestName = document.getElementById("guestName");

if (namaTamu && guestName) {
  guestName.textContent = namaTamu;
}
// FITUR UCAPAN DAN DOA

const wishesForm = document.getElementById("wishesForm");

const scriptURL = "https://script.google.com/macros/s/AKfycbxzf8c6EKsrHeKIqso9npgeweNHuFNObKf2ZZGKeDYV18z44TUgTOAtdbYPbF9iYk_m/exec";

function loadWishes() {
  fetch(scriptURL)
    .then(response => response.json())
    .then(data => {
      const list = document.getElementById("wishesList");

      if (!list) return;

      if (data.length === 0) {
        list.innerHTML = "<p>Belum ada ucapan. Jadilah yang pertama!</p>";
        return;
      }

      list.innerHTML = "";

      data.forEach(item => {
        const card = document.createElement("div");
        card.className = "wish-card";

        const name = document.createElement("h3");
        name.textContent = item.nama;

        const message = document.createElement("p");
        message.textContent = item.ucapan;

        card.appendChild(name);
        card.appendChild(message);

        list.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Gagal memuat ucapan:", error);
    });
}

if (wishesForm) {
  wishesForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const nama = document.getElementById("wishesName").value.trim();
    const ucapan = document.getElementById("wishesMessage").value.trim();
    const button = document.getElementById("wishesButton");
    const status = document.getElementById("wishesStatus");

    if (!nama || !ucapan) return;

    button.disabled = true;
    button.textContent = "MENGIRIM...";

    fetch(scriptURL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify({
        jenis: "ucapan",
        nama: nama,
        ucapan: ucapan
      })
    })
    .then(() => {
      status.textContent = "Terima kasih! Ucapan sedang disimpan.";
      wishesForm.reset();

      setTimeout(loadWishes, 2000);
    })
    .catch(error => {
      status.textContent = "Gagal mengirim ucapan.";
      console.error(error);
    })
    .finally(() => {
      button.disabled = false;
      button.textContent = "KIRIM UCAPAN";
    });
  });
}

loadWishes();

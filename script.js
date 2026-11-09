
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
document.addEventListener("DOMContentLoaded", function() {
  const sections = document.querySelectorAll(
    ".couple-section, .location-section, .gallery-section, .rsvp-section, .closing-section"
  );

  sections.forEach(function(section) {
    section.classList.add("scroll-reveal");
  });

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  sections.forEach(function(section) {
    observer.observe(section);
  });
});
// ANIMASI SAAT SCROLL
document.addEventListener("DOMContentLoaded", function() {
  const sections = document.querySelectorAll(
    ".couple-section, .location-section, .gallery-section, .rsvp-section, .closing-section"
  );

  sections.forEach(function(section) {
    section.classList.add("scroll-reveal");
  });

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  sections.forEach(function(section) {
    observer.observe(section);
  });
});

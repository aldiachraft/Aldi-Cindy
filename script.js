
function openInvitation() {
  document.querySelector(".cover").style.display = "none";

  const invitation = document.getElementById("invitation");

  invitation.style.display = "block";

  window.scrollTo(0, 0);
}

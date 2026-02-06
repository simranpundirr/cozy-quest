function selectAvatar(path) {
  const avatar = document.getElementById("avatar");

  // Save avatar choice
  localStorage.setItem("avatar", path);

  // Update preview avatar
  avatar.src = path.startsWith("assets/")
    ? path
    : "assets/" + path;

  // Play animation
  avatar.classList.remove("idle");
  avatar.classList.add("happy");

  setTimeout(() => {
    avatar.classList.remove("happy");
    avatar.classList.add("idle");

    // 🚀 MOVE TO GAME PAGE
    window.location.href = "plan.html";
  }, 800);
}


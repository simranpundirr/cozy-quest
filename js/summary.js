window.onload = () => {
  const avatar = document.getElementById("avatar");
  const savedAvatar = localStorage.getItem("avatar");

  avatar.src = "assets/" + savedAvatar;

  document.getElementById("tasksDone").textContent =
    localStorage.getItem("tasksDone");

  document.getElementById("finalLevel").textContent =
    localStorage.getItem("finalLevel");

  document.getElementById("totalXP").textContent =
    localStorage.getItem("finalXP");

  updateLeaderboard();
};

function updateLeaderboard() {
  let board = JSON.parse(localStorage.getItem("leaderboard")) || [];

  const score = {
    name: "You",
    xp: Number(localStorage.getItem("finalXP"))
  };

  function updateLeaderboard() {
    let board = JSON.parse(localStorage.getItem("leaderboard")) || [];

    // Remove old "You" entry if exists
    board = board.filter(entry => entry.name !== "You");

    const score = {
      name: "You",
      xp: Number(localStorage.getItem("finalXP"))
    };

    board.push(score);

    board.sort((a, b) => b.xp - a.xp);
    board = board.slice(0, 5);

    localStorage.setItem("leaderboard", JSON.stringify(board));

    const ul = document.getElementById("leaderboard");
    ul.innerHTML = "";

    board.forEach((entry, i) => {
      const li = document.createElement("li");
      li.textContent = `${i + 1}. ${entry.name} — ${entry.xp} XP`;
      ul.appendChild(li);
    });
  }

  board.sort((a, b) => b.xp - a.xp);
  board = board.slice(0, 5);

  localStorage.setItem("leaderboard", JSON.stringify(board));

  const ul = document.getElementById("leaderboard");
  ul.innerHTML = "";

  board.forEach((entry, i) => {
    const li = document.createElement("li");
    li.textContent = `${i + 1}. ${entry.name} — ${entry.xp} XP`;
    ul.appendChild(li);
  });
}

function restart() {
  localStorage.removeItem("tasks");
  window.location.href = "index.html";
}

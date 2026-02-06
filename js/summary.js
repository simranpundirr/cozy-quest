window.onload = () => {
  const avatar = document.getElementById("avatar");
  const savedAvatar = localStorage.getItem("avatar");

  if (savedAvatar) {
    avatar.src = "assets/" + savedAvatar;
  }

  const tasksDone = Number(localStorage.getItem("tasksDone")) || 0;
  const finalXP = Number(localStorage.getItem("finalXP")) || 0;
  const finalLevel = Number(localStorage.getItem("finalLevel")) || 1;

  document.getElementById("tasksDone").textContent =
    `Tasks Completed: ${tasksDone}`;

  document.getElementById("finalLevel").textContent =
    `Final Level: ${finalLevel}`;

  document.getElementById("totalXP").textContent =
    `Total XP Earned: ${finalXP}`;

  updateLeaderboard(finalXP);
};

function updateLeaderboard(finalXP) {
  let board = JSON.parse(localStorage.getItem("leaderboard")) || [];

  // remove old "You"
  board = board.filter(entry => entry.name !== "You");

  // add updated score
  board.push({
    name: "You",
    xp: finalXP
  });

  // sort + keep top 5
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

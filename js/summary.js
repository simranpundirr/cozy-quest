window.onload = () => {
  const tasksEl = document.getElementById("tasksDone");
  const levelEl = document.getElementById("finalLevel");
  const xpEl = document.getElementById("totalXP");
  const avatar = document.getElementById("avatar");

  if (!tasksEl || !levelEl || !xpEl) {
    console.error("Summary elements missing from HTML");
    return;
  }

  const tasksDone = Number(localStorage.getItem("tasksDone")) || 0;
  const finalXP = Number(localStorage.getItem("finalXP")) || 0;
  const finalLevel = Number(localStorage.getItem("finalLevel")) || 1;
  const savedAvatar = localStorage.getItem("avatar");

  if (savedAvatar && avatar) {
    avatar.src = "assets/" + savedAvatar;
  }

  tasksEl.textContent = `Tasks Completed: ${tasksDone}`;
  levelEl.textContent = `Final Level: ${finalLevel}`;
  xpEl.textContent = `Total XP Earned: ${finalXP}`;

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

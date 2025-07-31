export function getUserFromStorage() {
  try {
    return JSON.parse(localStorage.getItem("archid_user"));
  } catch {
    return null;
  }
}
export function setUserToStorage(user) {
  localStorage.setItem("archid_user", JSON.stringify(user));
}
export function clearUserFromStorage() {
  localStorage.removeItem("archid_user");
}
export function getGamesFromStorage() {
  try {
    return JSON.parse(localStorage.getItem("archid_games"));
  } catch {
    return [];
  }
}
export function setGamesToStorage(games) {
  localStorage.setItem("archid_games", JSON.stringify(games));
}
export function getLeaderboardFromStorage() {
  try {
    return JSON.parse(localStorage.getItem("archid_leaderboard"));
  } catch {
    return [];
  }
}
export function setLeaderboardToStorage(data) {
  localStorage.setItem("archid_leaderboard", JSON.stringify(data));
}

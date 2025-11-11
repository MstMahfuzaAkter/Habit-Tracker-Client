export const calculateStreak = (history = []) => {
  if (!history.length) return 0;

  const sorted = [...history]
    .map(d => new Date(d).toISOString().split("T")[0])
    .sort((a, b) => new Date(b) - new Date(a));

  let streak = 0;
  let current = new Date();

  for (let dateStr of sorted) {
    const diff = Math.floor((current - new Date(dateStr)) / (1000 * 60 * 60 * 24));
    if (diff === 0 || diff === 1) {
      streak++;
      current = new Date(dateStr);
    } else break;
  }
  return streak;
};

export const calculateStreak = (dates) => {
  if (!dates || dates.length === 0) return 0;

  const sorted = dates.sort((a, b) => new Date(b) - new Date(a));
  const today = new Date();
  let streak = 0;
  let allowedMiss = 1; 

  for (let i = 0; i < sorted.length; i++) {
    const date = new Date(sorted[i]);
    const diffDays = Math.floor((today - date) / (1000 * 60 * 60 * 24));

    if (diffDays === streak) {
      
      streak++;
    } else if (diffDays === streak + 1 && allowedMiss > 0) {
      allowedMiss--;
      streak++;
    } else {
      break; 
    }
  }

  return streak;
};

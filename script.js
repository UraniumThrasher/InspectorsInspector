function calculateEfficiencyRating(inputs) {
  const { 
    kills, 
    accuracy, 
    shotsFired, 
    shotsMissed, 
    deaths, 
    stimsUsed, 
    accidentals, 
    timesReinforced, 
    teamSize
  } = inputs;

  // Kill calculation with diminishing returns
  const maxKillsFor100Percent = 400;
  const killBonus = Math.min(kills / maxKillsFor100Percent, 1) * 100;
  const excessKillsBonus = kills > maxKillsFor100Percent 
    ? (kills - maxKillsFor100Percent) * 0.05 // Bonus for excess kills
    : 0;

  // Accuracy calculation with scaling
  const effectiveAccuracy = shotsFired > 20 
    ? accuracy * Math.log10(shotsFired) / 2 // More shots fired = more weight
    : accuracy; 

  // Death penalty
  const baseDeathPenalty = deaths <= 5 ? deaths * 10 : 50 + (deaths - 5) * 15;

  // Stim usage penalty
  const stimPenalty = stimsUsed > 12 ? (stimsUsed - 12) * 1.5 : 0;

  // Accidentals penalty
  const accidentalPenalty = accidentals * 15;

  // Reinforcement bonus (ignored for team sizes 2 or less)
  const reinforcementBonus = teamSize > 2 ? timesReinforced * 10 : 0;

  // Team size multiplier
  const teamSizeMultiplier = teamSize === 1 ? 15 : teamSize === 2 ? 10 : teamSize === 3 ? 5 : 0;

  // Final rating calculation
  let rating = (killBonus + excessKillsBonus + effectiveAccuracy - baseDeathPenalty - stimPenalty - accidentalPenalty + reinforcementBonus) / 5;
  rating += teamSizeMultiplier;

  // Ensure rating is within 0-100
  rating = Math.max(0, Math.min(rating, 100));

  // Determine rank
  const rank = calculateRank(rating);

  return { rating, rank };
}

function calculateRank(rating) {
  if (rating <= 12.5) return 'D';
  if (rating <= 25) return 'D+';
  if (rating <= 37.5) return 'C';
  if (rating <= 50) return 'C+';
  if (rating <= 62.5) return 'B';
  if (rating <= 75) return 'B+';
  if (rating <= 87.5) return 'A';
  if (rating < 100) return 'A+';
  return 'S';
}

// Example Input
const inputs = {
  kills: 450,
  accuracy: 85,
  shotsFired: 200,
  shotsMissed: 30,
  deaths: 6,
  stimsUsed: 15,
  accidentals: 2,
  timesReinforced: 3,
  teamSize: 3
};

const result = calculateEfficiencyRating(inputs);
console.log(result);

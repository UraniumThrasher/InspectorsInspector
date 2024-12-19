document.getElementById('calculate-btn').addEventListener('click', function () {
  // Get values from input fields
  const teamSize = parseInt(document.getElementById('teamSize').value);
  const kills = parseInt(document.getElementById('kills').value);
  const accuracy = parseFloat(document.getElementById('accuracy').value);
  const shotsFired = parseInt(document.getElementById('shotsFired').value);
  const shotsMissed = parseInt(document.getElementById('shotsMissed').value);
  const deaths = parseInt(document.getElementById('deaths').value);
  const stims = parseInt(document.getElementById('stims').value);
  const accidentals = parseInt(document.getElementById('accidentals').value);
  const reinforcements = parseInt(document.getElementById('reinforcements').value);

  // Set defaults for NaN inputs
  const validKills = kills || 0;
  const validAccuracy = accuracy || 0;
  const validShotsFired = shotsFired || 0;
  const validShotsMissed = shotsMissed || 0;
  const validDeaths = deaths || 0;
  const validStims = stims || 0;
  const validAccidentals = accidentals || 0;
  const validReinforcements = reinforcements || 0;
  const validTeamSize = teamSize || 4;

  // Accuracy bonus based on shots fired and hits
  const shotsHit = validShotsFired - validShotsMissed;
  let accuracyBonus = 0;
  if (shotsHit > 0) {
    accuracyBonus = validAccuracy * Math.log10(shotsHit + 1);
  }

  // Kills contribution (diminishing returns after 400 kills)
  let killBonus = validKills;
  if (validKills > 400) {
    killBonus = 400 + (validKills - 400) * 0.5; // Reduce impact beyond 400
  }

  // Death penalty
  let deathPenalty = validDeaths * 10;
  if (validDeaths > 5) {
    deathPenalty += (validDeaths - 5) * 5; // Extra penalty after 5 deaths
  }

  // Stim penalty
  const stimPenalty = Math.max(0, validStims - 12) * 1.5;

  // Accidental penalty
  const accidentalPenalty = validAccidentals * 15;

  // Reinforcement bonus
  const reinforcementBonus = validTeamSize > 2 ? validReinforcements * 10 : 0;

  // Team size bonus
  const teamSizeBonus = validTeamSize === 1 ? 15 : validTeamSize === 2 ? 10 : validTeamSize === 3 ? 5 : 0;

  // Calculate efficiency rating
  const rating =
    (killBonus + accuracyBonus - deathPenalty - stimPenalty - accidentalPenalty + reinforcementBonus + teamSizeBonus) / 5;

  // Clamp rating to [0, 100]
  const finalRating = Math.max(0, Math.min(100, rating));

  // Determine rank
  const rank = finalRating >= 87.5
    ? 'S'
    : finalRating >= 75
    ? 'A+'
    : finalRating >= 62.5
    ? 'A'
    : finalRating >= 50
    ? 'B+'
    : finalRating >= 37.5
    ? 'B'
    : finalRating >= 25
    ? 'C+'
    : finalRating >= 12.5
    ? 'C'
    : 'D';

  // Display result
  document.getElementById('result').innerHTML = `Efficiency Rating: ${finalRating.toFixed(2)}% (${rank})`;
});

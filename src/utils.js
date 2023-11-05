export async function loadPianoRollData(setData) {
    try {
      const response = await fetch('https://pianoroll.ai/random_notes');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const jsonData = await response.json();
      let combinedData = []
  
      for (let i = 0; i < 20; i++) {
        const start = i * 60;
        const end = start + 60;
        const partData = jsonData.slice(start, end);
        combinedData.push(partData);
      }
      setData(combinedData)
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }


// Function to blend between two colors based on a percentage
const blendColor = (color1, color2, percentage) => {
  // Break down the colors into their components
  const [r1, g1, b1] = color1.match(/\w\w/g).map((c) => parseInt(c, 16));
  const [r2, g2, b2] = color2.match(/\w\w/g).map((c) => parseInt(c, 16));

  // Interpolate between each component based on the percentage
  const r = Math.round(r1 + (r2 - r1) * percentage).toString(16).padStart(2, '0');
  const g = Math.round(g1 + (g2 - g1) * percentage).toString(16).padStart(2, '0');
  const b = Math.round(b1 + (b2 - b1) * percentage).toString(16).padStart(2, '0');

  return `#${r}${g}${b}`;
};

const gammaColors = [
  '#FF0000', // Red
  '#00FF00', // Green
  '#0000FF', // Blue
  '#FFFF00', // Yellow
  '#FF00FF', // Magenta
  '#00FFFF', // Cyan
  '#FF2A58', //Orange
  '#00FF9C', //Teal

];

export const getRandomGammaColor = () => {
  const randomIndex = Math.floor(Math.random() * gammaColors.length);
  return gammaColors[randomIndex];
};

export const velocityToColor = (gamma,velocity) => {
  const maxVelocity = 127; // Max MIDI velocity
  const percentage = velocity / maxVelocity;
  return blendColor(gamma, '#ffffff', 1 - percentage);
};
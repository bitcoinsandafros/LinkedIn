const form = document.getElementById("wrappedForm");
const output = document.getElementById("output");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const company = document.getElementById("company").value;
  const summary = document.getElementById("summary").value;
  const accomplishments = document
    .getElementById("accomplishments")
    .value.split("\n")
    .filter(Boolean)
    .map(item => `• ${item}`)
    .join("\n");

  const numbers = document
    .getElementById("numbers")
    .value.split("\n")
    .filter(Boolean)
    .map(item => `• ${item}`)
    .join("\n");

  const prompt = `
Create a high-resolution, two-panel professional “Year Wrapped” graphic in the exact visual style of Spotify Wrapped.

STYLE & THEME:
• Dark gradient background with deep black, magenta, hot pink, and neon red tones
• Futuristic abstract shapes and layered motion graphics
• Bold typography with strong contrast
• Rounded panel edges
• Clean, modern, editorial layout
• High visual hierarchy and legible text

LAYOUT:
Two panels side by side.

LEFT PANEL:
Title: “MY PROFESSIONAL YEAR WRAPPED”
Subtitle: “Recapping 2025 at ${company}”

Intro Summary:
${summary}

Accomplishments:
${accomplishments}

RIGHT PANEL:
Title: “BY THE NUMBERS”

Numbers:
${numbers}

OUTPUT REQUIREMENTS:
• Polished, executive-ready, social-shareable
• Fully legible at mobile size
• No overlapping text
• Maintain the same color palette and visual tone
`;

  output.textContent = prompt.trim();
  output.hidden = false;
});

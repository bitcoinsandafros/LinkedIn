const form = document.getElementById("wrappedForm");
const output = document.getElementById("output");
const outputWrap = document.getElementById("outputWrap");
const copyBtn = document.getElementById("copyBtn");
const openChatGPT = document.getElementById("openChatGPT");

// Hide Open ChatGPT button initially
openChatGPT.style.display = "none";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const company = document.getElementById("company").value;
  const summary = document.getElementById("summary").value;
  const accomplishments = listify("accomplishments");
  const numbers = listify("numbers");
  const variation = document.getElementById("variation").checked;

  const variationText = variation
    ? "Create a slightly different layout variation while keeping the same color palette and overall style."
    : "";

  const prompt = `
Create a high-resolution, two-panel professional “Year Wrapped” graphic in the exact visual style of Spotify Wrapped.

STYLE:
Dark gradients, neon magenta and pink tones, abstract motion shapes, bold typography, rounded panels.

LAYOUT:
Two panels side by side.

LEFT PANEL:
Title: MY PROFESSIONAL YEAR WRAPPED
Subtitle: Recapping 2025 at ${company}

Summary:
${summary}

Accomplishments:
${accomplishments}

RIGHT PANEL:
Title: BY THE NUMBERS
${numbers}

${variationText}

Ensure text is fully legible and polished.
`;

  output.textContent = prompt.trim();
  outputWrap.hidden = false;
  selectText();

  // Hide Open ChatGPT button again in case of regeneration
  openChatGPT.style.display = "none";
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(output.textContent).then(() => {
    copyBtn.textContent = "Copied!";
    openChatGPT.style.display = "inline-block"; // Show button after copy
    setTimeout(() => (copyBtn.textContent = "Copy Prompt"), 1500);
  }).catch((err) => {
    alert("Failed to copy: " + err);
  });
});

function listify(id) {
  return document.getElementById(id).value
    .split("\n")
    .filter(Boolean)
    .map(item => `• ${item}`)
    .join("\n");
}

function selectText() {
  const range = document.createRange();
  range.selectNodeContents(output);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

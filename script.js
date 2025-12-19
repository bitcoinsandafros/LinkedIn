const form = document.getElementById("wrappedForm");
const output = document.getElementById("output");
const outputWrap = document.getElementById("outputWrap");
const copyBtn = document.getElementById("copyBtn");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const company = companyInput();
  const summary = summaryInput();
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
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(output.textContent);
  copyBtn.textContent = "Copied!";
  setTimeout(() => (copyBtn.textContent = "Copy Prompt"), 1500);
});

function listify(id) {
  return document.getElementById(id).value
    .split("\n")
    .filter(Boolean)
    .map(item => `• ${item}`)
    .join("\n");
}

function companyInput() {
  return document.getElementById("company").value;
}

function summaryInput() {
  return document.getElementById("summary").value;
}

function selectText() {
  const range = document.createRange();
  range.selectNodeContents(output);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

const button = document.querySelector("button");

button.addEventListener("click", async () => {
  const company = document.querySelector("input").value;
  const textareas = document.querySelectorAll("textarea");
  const accomplishments = textareas[0].value;
  const numbers = textareas[1].value;

  if (!company || !accomplishments) {
    alert("Please fill in company and accomplishments");
    return;
  }

  button.textContent = "Generating...";

  try {
    // Call Netlify Function for GPT text
    const response = await fetch("/.netlify/functions/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company, accomplishments, numbers })
    });

    const data = await response.json();
    const summary = data.result;

    // Display summary in hidden pre (for html2canvas)
    const pre = document.getElementById("output");
    pre.style.display = "block";
    pre.textContent = summary;

    // Render wrap-container to image
    const wrapCard = document.getElementById("wrap-card");
    const canvas = await html2canvas(wrapCard, { backgroundColor: null });
    const imgData = canvas.toDataURL("image/png");

    // Create or update an <img> for the generated image
    let outputImg = document.getElementById("output-image");
    if (!outputImg) {
      outputImg = document.createElement("img");
      outputImg.id = "output-image";
      outputImg.style.maxWidth = "100%";
      wrapCard.appendChild(outputImg);
    }
    outputImg.src = imgData;

    // Hide pre again
    pre.style.display = "none";

    button.textContent = "Generate";
  } catch (err) {
    console.error(err);
    alert("Error generating Wrapped image. Check console.");
    button.textContent = "Generate";
  }
});

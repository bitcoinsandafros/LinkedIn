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
    // 1️⃣ Call Netlify Function for GPT text
    const response = await fetch("/.netlify/functions/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company, accomplishments, numbers })
    });

    const data = await response.json();
    const summary = data.result;

    // 2️⃣ Insert text into overlay
    const summaryText = document.getElementById("summary-text");
    summaryText.textContent = summary;

    // Optional: dynamically reduce font if text is too long
    let fontSize = 18;
    summaryText.style.fontSize = fontSize + "px";

    while (summaryText.scrollHeight > summaryText.clientHeight && fontSize > 10) {
      fontSize -= 1;
      summaryText.style.fontSize = fontSize + "px";
    }

    // 3️⃣ Render wrap-container to image
    const wrapCard = document.getElementById("wrap-card");
    const canvas = await html2canvas(wrapCard, { backgroundColor: null });
    const imgData = canvas.toDataURL("image/png");

    // 4️⃣ Create or update the generated image element
    let outputImg = document.getElementById("output-image");
    if (!outputImg) {
      outputImg = document.createElement("img");
      outputImg.id = "output-image";
      outputImg.style.maxWidth = "100%";
      outputImg.style.marginTop = "20px";
      wrapCard.appendChild(outputImg);
    }
    outputImg.src = imgData;

    button.textContent = "Generate";
  } catch (err) {
    console.error(err);
    alert("Error generating Wrapped image. Check console.");
    button.textContent = "Generate";
  }
});

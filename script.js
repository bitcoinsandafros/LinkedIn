const button = document.querySelector("button");

button.addEventListener("click", async () => {
  console.log("Generate button clicked");

  const company = document.querySelector("input").value;
  const textareas = document.querySelectorAll("textarea");
  const accomplishments = textareas[0].value;
  const numbers = textareas[1].value;

  if (!company || !accomplishments) {
    alert("Please fill in company and accomplishments");
    console.log("Validation failed: missing company or accomplishments");
    return;
  }

  button.textContent = "Generating...";

  try {
    const response = await fetch("/.netlify/functions/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        company,
        accomplishments,
        numbers
      })
    });

    if (!response.ok) {
      throw new Error(`Network error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Response received from function:", data);

    let output = document.querySelector("pre");
    if (!output) {
      output = document.createElement("pre");
      document.querySelector(".wrap-container").appendChild(output);
    }

    output.textContent = data.result || "No result returned";
    button.textContent = "Generate";
  } catch (error) {
    console.error("Error calling Netlify function:", error);
    alert("Something went wrong. Check the console for details.");
    button.textContent = "Generate";
  }
});

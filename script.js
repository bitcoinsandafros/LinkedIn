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

  const response = await fetch("/.netlify/functions/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      company,
      accomplishments,
      numbers
    })
  });

  const data = await response.json();

  let output = document.querySelector("pre");
  if (!output) {
    output = document.createElement("pre");
    document.querySelector(".wrap-container").appendChild(output);
  }

  output.textContent = data.result;
  button.textContent = "Generate";
});
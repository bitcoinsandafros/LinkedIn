export async function handler(event) {
  try {
    const { company, accomplishments, numbers } = JSON.parse(event.body);

    const prompt = `
Create a professional "Year Wrapped" summary.

Company: ${company}

Accomplishments:
${accomplishments}

Metrics:
${numbers}

Tone:
Intentional, confident, strategic, modern.
Keep it concise and polished.
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        result: data.choices[0].message.content
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Something went wrong" })
    };
  }
}

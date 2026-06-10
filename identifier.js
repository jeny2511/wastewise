async function searchWaste() {
  const input = document.getElementById("searchInput").value.trim();

  const resultDiv = document.getElementById("result");

  const loadingDiv = document.getElementById("loading");

  if (!input) {
    resultDiv.innerHTML = `
            <div class="result-card">
                Please enter a waste item.
            </div>
        `;

    return;
  }

  loadingDiv.innerHTML = "Analyzing waste item...";

  resultDiv.innerHTML = "";

  try {
    const response = await fetch("/.netlify/functions/identify", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        item: input,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Function Error");
    }

    const answer = data.candidates[0].content.parts[0].text;

    loadingDiv.innerHTML = "";

    resultDiv.innerHTML = `
            <div class="result-card">
                ${answer}
            </div>
        `;
  } catch (error) {
    loadingDiv.innerHTML = "";

    resultDiv.innerHTML = `
            <div class="result-card">
                Error fetching result.
                Please try again.
            </div>
        `;

    console.error(error);
  }
}

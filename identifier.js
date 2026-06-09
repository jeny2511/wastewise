const API_KEY = "AIzaSyCnRvx85G-FM46ALIIYpKzufkDXMuPcHz8";

async function searchWaste() {

    const input = document
        .getElementById("searchInput")
        .value
        .trim();

    const resultDiv =
        document.getElementById("result");

    const loadingDiv =
        document.getElementById("loading");

    if(!input){

        resultDiv.innerHTML = `
            <div class="result-card">
                Please enter a waste item.
            </div>
        `;

        return;
    }

    loadingDiv.innerHTML =
        "Analyzing waste item...";

    resultDiv.innerHTML = "";

    try{

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text:
`
Classify the following waste item.

Item: ${input}

Return ONLY in this format:

Category:
Disposal Method:
Reason:

Category must be one of:
- Wet Waste
- Dry Waste
- E-Waste
- Biomedical Waste
`
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        const answer =
            data.candidates[0]
            .content.parts[0].text;

        loadingDiv.innerHTML = "";

        resultDiv.innerHTML = `
            <div class="result-card">
                ${answer}
            </div>
        `;

    }
    catch(error){

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
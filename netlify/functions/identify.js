exports.handler = async (event) => {

    const { item } = JSON.parse(event.body);

    try {

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
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
                                    text: `
Classify the following waste item.

Item: ${item}

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

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };

    } catch (error) {

        return {
            statusCode: 500,
            body: JSON.stringify({
                error: error.message
            })
        };

    }

};

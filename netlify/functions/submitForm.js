const fetch = require("node-fetch");

exports.handler = async (event) => {
  const data = JSON.parse(event.body);
  const formspreeURL = process.env.FRSPEL; // Replace with your URL

  try {
    const response = await fetch(formspreeURL, {
      method: "POST",
      headers: { "Accept": "application/json" },
      body: new URLSearchParams(data),
    });

    return {
      statusCode: response.ok ? 200 : 500,
      body: JSON.stringify({ message: response.ok ? "Message sent!" : "Failed to send." }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Server error", error: error.message }),
    };
  }
};
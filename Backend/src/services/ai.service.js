const axios = require("axios");

exports.reviewCode = async (code) => {
  try {
    if (!code || code.trim().length < 3) {
      return "⚠️ Please enter valid code.";
    }

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        // ✅ SAFE MODEL (MOST COMPATIBLE)
        model: "llama-3.1-8b-instant",

        messages: [
          {
            role: "system",
            content:
              "You are a senior software engineer. If the code has errors, fix them and return the corrected code. If the code is correct, say: ✅ No errors found. The code is correct.",
          },
          {
            role: "user",
            content: code,
          },
        ],
        temperature: 0,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );

    return response.data.choices[0].message.content;

  } catch (error) {
    // 🔴 LOG REAL GROQ ERROR
    console.error("GROQ FULL ERROR:");
    console.error(error.response?.status);
    console.error(error.response?.data || error.message);

    return "❌ AI service failed (Groq rejected the request).";
  }
};

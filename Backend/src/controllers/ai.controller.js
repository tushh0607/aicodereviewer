// const aiService = require("../services/ai.service");

// module.exports.getReview = async (req, res) => {
//   const code = req.body.prompt;

//   if (!code || code.trim() === "") {
//     return res.status(400).send("❌ Enter valid code.");
//   }

//   try {
//     const response = await aiService(code);
//     res.send(response);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("❌ Server error.");
//   }
// };


const aiService = require("../services/ai.service");

exports.getReview = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code || code.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "No code provided",
      });
    }

    const review = await aiService.reviewCode(code);

    res.json({
      success: true,
      review,
    });
  } catch (error) {
    console.error("Controller Error:", error.message);
    res.status(500).json({
      success: false,
      message: "AI review failed",
    });
  }
};

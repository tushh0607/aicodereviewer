import { useState, useEffect,useRef } from "react";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import axios from "axios";
import Markdown from "react-markdown";
import "./App.css";

function App() {
  const [code, setCode] = useState("");
  const [review, setReview] = useState("");
  const editorRef = useRef(null);


  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    // ✅ SHOW MESSAGE IN RIGHT PANEL INSTEAD OF ALERT
    if (!code.trim()) {
      setReview("❌ **Please enter some code to review.**");
      return;
    }

    try {
      // ✅ Loading message
      setReview("⏳ **Reviewing your code...**");

      const res = await axios.post("https://aicodereviewer-backend-z9et.onrender.com/ai/review", {
        code,
      });

      setReview(res.data.review);
    } catch (error) {
      console.error(error);
      setReview("❌ **Backend error. Please try again.**");
    }
  }

  return (
    <main>
      <div className="left">
<div
  className="code"
  onClick={() => editorRef.current?.focus()}
>
  <Editor
    ref={editorRef}
    value={code}
    onValueChange={setCode}
    highlight={(code) =>
      prism.highlight(code, prism.languages.javascript, "javascript")
    }
    padding={10}
    textareaClassName="editor-textarea"
    style={{
      fontFamily: '"Fira Code", monospace',
      fontSize: 16,
      minHeight: "100%",
      width: "100%",
      backgroundColor: "#0c0c0c",
    }}
  />
</div>


        <div className="review" onClick={reviewCode}>
          REVIEW
        </div>
      </div>

      <div className="right">
        <Markdown>{review}</Markdown>
      </div>
    </main>
  );
}

export default App;

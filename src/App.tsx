import Editor from "@monaco-editor/react";
import axios from "axios";
import { useState } from "react";

const App = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  // https://emkc.org/api/v2/piston

  const Runcode = async () => {
    setLoading(true);
    const response = await axios.post(
      "https://emkc.org/api/v2/piston/execute",
      {
        language: "javascript",
        version: "18.15.0",
        files: [
          {
            name: "my_cool_code.js",
            content: code,
          },
        ],
      }
    );
    if (response.data) {
      setOutput(response.data.run.output);
    }
    setLoading(false);
  };

  return (
    <div>
      <Editor
        height="70vh"
        width="90vw"
        value={code}
        theme="vs-dark"
        onChange={(value) => {
          setOutput("");
          setCode(value || "");
        }}
        defaultLanguage="javascript"
        defaultValue={code}
      />
      <button onClick={Runcode}>{loading ? "loading..." : "run"}</button>
      {loading ? (
        ""
      ) : (
        <div>
          <h3>output</h3>
          {output}
        </div>
      )}
    </div>
  );
};

export default App;

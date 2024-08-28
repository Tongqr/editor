import React, { useEffect, useState } from "react";
import MonacoEditor from "react-monaco-editor";

const App: React.FC = () => {
  const [code, setCode] = useState("");
  const [size, setSize] = useState({
    width: document.body.clientWidth,
    height: document.body.clientHeight,
  });
  const options = {
    selectOnLineNumbers: true,
    minimap: {
      enabled: false,
    },
  };
  useEffect(() => {
    setSize({
      width: document.body.clientWidth,
      height: document.body.clientHeight,
    });
    console.log("hello", document.body.clientWidth, document.body.clientHeight);
    window.addEventListener("resize", handleSize);
    return () => {
      window.removeEventListener("resize", handleSize);
    };
    // 获取宽高
  }, []);

  const handleSize = () => {
    setSize({
      width: document.body.clientWidth,
      height: document.body.clientHeight,
    });
    console.log("size", document.body.clientWidth, document.body.clientHeight);
  };
  // return <div>hello 000</div>;
  const editorDidMount = (editor: any, monaco: any) => {
    console.log("editorDidMount", monaco.languages.getLanguages());
    editor.focus();
  };
  const onChange = (newValue: string, e: any) => {
    console.log("onChange", newValue, e);
    setCode(newValue);
  };

  return (
    <MonacoEditor
      // width={window.innerWidth - 100}
      width={size.width - 100}
      height={size.height - 10}
      language="javascript"
      theme="vs-dark"
      value={code}
      options={options}
      onChange={onChange}
      editorDidMount={editorDidMount}
    />
  );
};

export default App;

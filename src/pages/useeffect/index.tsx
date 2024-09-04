import React, { useState, useEffect } from "react";
import { Button } from "antd";
const App = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("useEffect----------runs", `点击了${count}次`);
    // document.title = `点击了${count}次`;
  });

  console.count("component rendered!");

  return (
    <div>
      <span>you click {count} times</span>
      <Button onClick={() => setCount(count + 1)}>click</Button>
    </div>
  );
};
export default App;

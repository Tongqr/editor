import React, { useCallback, useState } from "react";
import EditorMonaco from "./editor";
import FileList from "./filelist";

const Editor = () => {
  return (
    <div class="flex">
      {/* <h1>Editor</h1> */}
      <FileList />
      <EditorMonaco />
    </div>
  );
};
export default Editor;

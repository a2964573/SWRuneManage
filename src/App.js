import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import FormFileExample from "./component/fileinput.js";
import HorizontalResponsiveExample from "./component/runlist.js";

import { useState } from "react";

function App() {
  const [file, setFile] = useState();
  const [check, setCheck] = useState(false);
  return (
    <div>
      <FormFileExample
        file={file}
        setFile={setFile}
        check={check}
        setCheck={setCheck}
      />
      <HorizontalResponsiveExample
        file={file}
        setFile={setFile}
        check={check}
        setCheck={setCheck}
      />
    </div>
  );
}

export default App;

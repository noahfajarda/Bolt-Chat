import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import ToggleColorMode from "./components/ToggleColorMode";
import Views from "./components/Views";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Views />
      <ToggleColorMode />
    </>
  );
}

export default App;

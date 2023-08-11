import ToggleColorMode from "./components/ToggleColorMode";
import Views from "./components/Views";
import { UserContext } from "./components/AccountContext";

function App() {
  return (
    <UserContext>
      <Views />
      <ToggleColorMode />
    </UserContext>
  );
}

export default App;

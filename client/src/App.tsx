import { useAuth } from "./context/AuthContext";
import { Button } from "./components/Button";
import { InputField } from "./components/InputField";
import PostJournal from "./components/JournalFormulaire";

function App() {
  return (
    <div>
      <PostJournal />
    </div>
  );
}

export default App;

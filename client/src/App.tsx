import { useAuth } from "./context/AuthContext";
import { Button } from "./components/Button";
import { InputField } from "./components/InputField";
import PostJournal from "./components/JournalFormulaire";
import { LoginPage } from "./pages/LoginPage";

function App() {
  const { estConnecte } = useAuth();

  return <div>{!estConnecte ? <LoginPage /> : <PostJournal />}</div>;
}

export default App;

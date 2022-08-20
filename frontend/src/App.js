import "./App.css";
import UserGitProfile from "./Components/UserGitProfile";

function App() {
  return (
    <div>
      <header className="App-header">
        <div>
          <h2 className="user-header">Let's Track User Profile</h2>
        </div>
        <main>
          <UserGitProfile />
        </main>
      </header>
    </div>
  );
}

export default App;

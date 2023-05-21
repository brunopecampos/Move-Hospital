import logo from "./logo.svg";
import "./App.css";

function App() {
  const fetchApi = async () => {
    await fetch("http://localhost:5000/");
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button
          onClick={fetchApi}
          style={{
            fontSize: 30,
            backgroundColor: "lightblue",
            borderRadius: 5,
          }}
        >
          <code>Aumentar Salário</code>
        </button>
      </header>
    </div>
  );
}

export default App;

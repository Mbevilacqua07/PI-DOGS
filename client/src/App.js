import "./App.css";
import { Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Formulario from "./components/Formulario";
import Details from "./components/Details";
function App() {
  return (
    <div className="App">
      <h1>Henry Dogs</h1>
      <Route exact path="/" component={LandingPage} />
      <Route path="/Home" component={Home} />
      <Route path="/dogs" component={Formulario} />
      <Route path="/Details/:id" component={Details} />
    </div>
  );
}

export default App;

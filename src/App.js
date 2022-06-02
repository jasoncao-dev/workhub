import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Dashboard, Login, Signup, Project, Create } from "./pages";
import { Navbar, Sidebar } from "./components";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user, authIsReady } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Sidebar />
          <div className="container">
            <Navbar />
            <Switch>
              <Route exact path="/">
                {user ? <Dashboard /> : <Redirect to="/login" />}
              </Route>
              <Route path="/signup">
                {!user ? <Signup /> : <Redirect to="/" />}
              </Route>
              <Route path="/login">
                {!user ? <Login /> : <Redirect to="/" />}
              </Route>
              <Route path="/projects/:id">
                {user ? <Project /> : <Redirect to="/login" />}
              </Route>
              <Route path="/create">
                {user ? <Create /> : <Redirect to="/login" />}
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;

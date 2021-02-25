import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import Department from './components/Department/Department.js';
import Employee from './components/Employee/Employee.js';

function App() {
  return (
    <div className="container text-center mt-3">
      <div className="d-flex flex-column justify-content-center align-items-center mb-3">
        <h3>React Test</h3>
        <h5>Employee Management Portal</h5>
      </div>

      <Router>
        <nav className="navbar navbar-expand-sm bg-light navbar-dark">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/department">
                <button className="m-1 btn btn-light btn-outline-primary">
                  Department
                </button>
              </Link>
              <Link to="/employee">
                <button className="m-1 btn btn-light btn-outline-primary">
                  Employees
                </button>
              </Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/department">
            <Department />
          </Route>
          <Route path="/employee">
            <Employee />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

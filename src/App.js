import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AddTodo from "./components/add-todo.component";
import Todo from "./components/todo.component";
import TodoList from "./components/todo-list.component";

class App extends Component {
  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/todos"} className="navbar-brand">
            Notuta
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/todos"} className="nav-link">
                Todos
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/todos"]} component={TodoList} />
            <Route exact path="/add" component={AddTodo} />
            <Route exact path="/todos/:id" component={Todo} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
import React, { Component } from "react";
import { connect } from "react-redux";
import { retrieveTodo, findTodoByTitle } from "../actions/todos";
import { Link } from "react-router-dom";

class TodoList extends Component {
    constructor(props) {
        super(props)
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.setActiveTodo = this.setActiveTodo.bind(this);
        this.findByTitle = this.findByTitle.bind(this);
        
        this.state = {
            currentTodo: null,
            currentIndex: -1,
            searchTitle: "",
        }
    }

    componentDidMount() {
        this.props.retrieveTodo();
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle,
        });
    }

    refreshData() {
        this.setState({
            currentTodo: null,
            currentIndex: -1,
        });
    }

    setActiveTodo(todo, index) {
        this.setState({
            currentTodo: todo,
            currentIndex: index,
        });
    }

    findByTitle() {
        this.refreshData();

        this.props.findTodoByTitle(this.state.searchTitle);
    }

    render() {
      const { searchTitle, currentTodo, currentIndex } = this.state;
      const { todos } = this.props;

      return (
        <div className="list row">
          <div className="col-md-8">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by title"
                value={searchTitle}
                onChange={this.onChangeSearchTitle}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.findByTitle}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h4>Todos List</h4>

            <ul className="list-group">
              {todos &&
                todos.map((todo, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveTodo(todo, index)}
                    key={index}
                  >
                    {todo.title}
                  </li>
                ))}
            </ul>
          </div>
          <div className="col-md-6">
            {currentTodo ? (
              <div>
                <h4>Todo</h4>
                <div>
                  <label>
                    <strong>Title:</strong>
                  </label>{" "}
                  {currentTodo.title}
                </div>
                <div>
                  <label>
                    <strong>Description:</strong>
                  </label>{" "}
                  {currentTodo.description}
                </div>
                <div>
                  <label>
                    <strong>Status:</strong>
                  </label>{" "}
                  {currentTodo.published ? "Published" : "Pending"}
                </div>

                <Link
                  to={"/todo/" + currentTodo.id}
                  className="badge badge-warning"
                >
                  Edit
                </Link>
              </div>
            ) : (
              <div>
                <br />
                <p>Please click on a Todo...</p>
              </div>
            )}
          </div>
        </div>
      );
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos
    }
}

export default connect(mapStateToProps, { retrieveTodo, findTodoByTitle })(TodoList);
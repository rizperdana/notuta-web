import React, { Component } from "react";
import { connect } from "react-redux";
import { updateTodo, deleteTodo } from "../actions/todos";
import TodoDataService from "../services/todo.service";

class Todo extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.getTodo = this.getTodo.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
        this.updateContent = this.updateContent.bind(this);
        this.removeTodo = this.removeTodo.bind(this);

        this.state = {
            currentTodo: {
                id: null,
                title: "",
                description: "",
                completed: false,
            },
            message: "",
        };
    }

    componentDidMount() {
        this.getTodo(this.props.match.params.id);
    }

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function (prevState) {
            return {
                currentTodo: {
                    ...prevState.currentTodo,
                    title: title
                },
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState((prevState) => ({
            currentTodo: {
                ...prevState.currentTodo,
                description: description,
            },
        }));
    }

    getTodo(id) {
        TodoDataService.get(id)
            .then((response) => {
                this.setState({
                    currentTodo: response.data,
                });
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    updateStatus(status) {
        var data = {
            id: this.state.currentTodo.id,
            title: this.state.currentTodo.title,
            description: this.state.currentTodo.description,
            completed: status,
        };

        this.props
            .updateTodo(this.state.currentTodo.id, data)
            .then((response) => {
                console.log(response);

                this.setState((prevState) => ({
                    currentTodo: {
                        ...prevState.currentTodo,
                        completed: status,
                    },
                }));

                this.setState({ message: "The status was update successfully" });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    updateContent() {
        this.props
            .updateTodo(this.state.currentTodo.id, this.state.currentTodo)
            .then((response) => {
                console.log(response);

                this.setState({ message: "The todo was update successfully!" });
            })
            .catch((e) => {
                console.log(e);
            })
    }

    removeTodo() {
        this.props
            .deleteTodo(this.state.currentTodo.id)
            .then(() => {
                this.props.hisotry.push("/todo");
            })
            .catch((e) => {
                console.log(e)
            });
    }

    render() {
        const { currentTodo } = this.state;

        return (
            <div>
                {currentTodo ? (
                <div className="edit-form">
                    <h4>Todo</h4>
                    <form>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={currentTodo.title}
                        onChange={this.onChangeTitle}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                        type="text"
                        className="form-control"
                        id="description"
                        value={currentTodo.description}
                        onChange={this.onChangeDescription}
                        />
                    </div>

                    <div className="form-group">
                        <label>
                        <strong>Status:</strong>
                        </label>
                        {currentTodo.completed ? "Completed" : "To Do"}
                    </div>
                    </form>

                    {currentTodo.completed ? (
                    <button
                        className="badge badge-primary mr-2"
                        onClick={() => this.updateStatus(false)}
                    >
                        Uncomplete
                    </button>
                    ) : (
                    <button
                        className="badge badge-primary mr-2"
                        onClick={() => this.updateStatus(true)}
                    >
                        Complete
                    </button>
                    )}

                    <button
                        className="badge badge-danger mr-2"
                        onClick={this.removeTodo}
                        >
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={this.updateContent}
                    >
                        Update
                    </button>
                    <p>{this.state.message}</p>
                </div>
                ) : (
                <div>
                    <br />
                    <p>Please click on a Todo...</p>
                </div>
                )}
            </div>
            );
    }
}

export default connect(null, { updateTodo, deleteTodo })(Todo);
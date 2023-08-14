import React, { Component } from "react";
import { connect } from "react-redux";
import { createTodo } from "../actions/todos";

class AddTodo extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.saveTodo = this.saveTodo.bind(this);
        this.newTodo = this.newTodo.bind(this);

        this.state = {
            id: null,
            title: "",
            description: "",
            completed: false,

            submitted: false, 
        };
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value,
        });
    }

    onChangeDescription(e) {
        this.setState({
            title: e.target.value
        })
    }

    saveTodo() {
        const { title, description } = this.state;

        this.props
            .createTodo(title, description)
            .then((data) => {
                this.setState({
                    id: data.id,
                    description: data.description,
                    completed: data.completed,

                    submitted: true,
                });
                console.log(data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    newTodo() {
        this.setState({
            id: null,
            title: "",
            description: "",
            completed: false,

            submitted: false,
        });
    }

    render() {
        return (
          <div className="submit-form">
            {this.state.submitted ? (
              <div>
                <h4>You submitted successfully!</h4>
                <button className="btn btn-success" onClick={this.newTodo}>
                  Add
                </button>
              </div>
            ) : (
              <div>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    required
                    value={this.state.title}
                    onChange={this.onChangeTitle}
                    name="title"
                  />
                </div>

                <div className="form-group">
                    <label htmlFor="description">description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        required
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                        name="description"
                    />
                </div>

                <button onClick={this.saveTodo} className="btn btn-success">
                    Submit
                </button>
              </div>
            )}
          </div>
        );
    }
}

export default connect(null, { createTodo })(AddTodo);
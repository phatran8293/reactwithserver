import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  state = {
    students: []
  };

  constructor() {
    console.log("App - Constructor");
    super();
    this.name = React.createRef();
    this.age = React.createRef();
  }

  componentDidMount() {
    // Ajax Call
    console.log("App - Mount");
    axios.get("http://localhost:8080/students").then(res => {
      const students = res.data;
      this.setState({ students });
    });
  }

  onSubmit = e => {
    e.preventDefault();
    console.log(this);
    const student = {
      name: this.name.current.value,
      age: this.age.current.value
    };

    let headers = {
      "Content-Type": "application/json"
    };

    axios
      .post(`http://localhost:8080/student/add`, JSON.stringify(student), {
        headers: headers
      })
      .then(res => {
        student.id = res.data;
        let studentList = [...this.state.students];
        studentList.push(student);
        this.setState({ students: studentList });
        document.getElementById("create-student-form").reset();
      });
  };

  render() {
    console.log("App - Render");
    return (
      <React.Fragment>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {this.state.students.map(student => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <form
          id="create-student-form"
          onSubmit={event => this.onSubmit(event)}
          className="form-signin"
        >
          <div className="form-group w-25">
            <label>Name: </label>
            <input
              type="text"
              name="age"
              className="form-control"
              ref={this.name}
            />
          </div>
          <div className="form-group w-25">
            <label>Age: </label>
            <input
              type="text"
              name="name"
              className="form-control"
              ref={this.age}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="ADD" className="btn btn-primary" />
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default App;

import React, { Component } from "react";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class App extends Component {
  state = {
    students: [],
    modal: false,
    studentUpdate: {}
  };

  constructor() {
    console.log("App - Constructor");
    super();
    this.name = React.createRef();
    this.age = React.createRef();
    this.updatedAge = React.createRef();
    this.updatedName = React.createRef();
  }

  toggleUpdateStudent = student => {
    this.toggle();
    this.setState({ studentUpdate: student });
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  componentDidMount() {
    // Ajax Call
    console.log("App - Mount");
    axios
      .get("http://localhost:8080/students")
      .then(res => {
        const students = res.data;
        this.setState({ students });
      })
      .catch(err => {
        console.log(err);
      });
  }

  onSubmit = e => {
    e.preventDefault();
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
      })
      .catch(err => {
        console.log(err);
      });
  };

  onDeleteStudent = studentId => {
    const url = `http://localhost:8080/student/${studentId}`;
    axios
      .delete(url)
      .then(res => {
        let studentList = [...this.state.students];
        let index = studentList.findIndex(s => s.id === studentId);
        studentList.splice(index, 1);
        this.setState({ students: studentList });
      })
      .catch(err => {
        console.log(err);
      });
  };

  onSaveUpdatedStudent = studentId => {
    const url = `http://localhost:8080/student/${studentId}`;
    let savedStudent = {
      name: this.updatedName.current.value,
      age: this.updatedAge.current.value
    };
    let headers = {
      "Content-Type": "application/json"
    };
    axios
      .put(url, JSON.stringify(savedStudent), { headers: headers })
      .then(res => {
        let studentList = [...this.state.students];
        let index = studentList.findIndex(s => s.id === studentId);
        studentList[index].name = savedStudent.name;
        studentList[index].age = savedStudent.age;
        this.setState({ students: studentList });
        this.toggle();
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    console.log("App - Render");
    return (
      <React.Fragment>
        <div className="offset-5">
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
        </div>
        <div className="table-wrapper-scroll-y my-custom-scrollbar">
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th style={{ width: 20 + "%" }}>ID</th>
                <th style={{ width: 40 + "%" }}>Name</th>
                <th style={{ width: 20 + "%" }}>Age</th>
                <th style={{ width: 20 + "%" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.students.map(student => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>
                    <input
                      type="button"
                      className="btn btn-danger"
                      value="DELETE"
                      onClick={() => this.onDeleteStudent(student.id)}
                    />
                    &nbsp;
                    <Button
                      color="success"
                      onClick={() => this.toggleUpdateStudent(student)}
                    >
                      UPDATE
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Update Student</ModalHeader>
          <ModalBody>
            <form>
              <div className="form-group">
                <label>Name: </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  defaultValue={this.state.studentUpdate.name}
                  ref={this.updatedName}
                />
              </div>
              <div className="form-group">
                <label>Age: </label>
                <input
                  type="text"
                  name="age"
                  className="form-control"
                  defaultValue={this.state.studentUpdate.age}
                  ref={this.updatedAge}
                />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>{" "}
            <Button
              color="primary"
              onClick={() =>
                this.onSaveUpdatedStudent(this.state.studentUpdate.id)
              }
            >
              Save Changes
            </Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

export default App;

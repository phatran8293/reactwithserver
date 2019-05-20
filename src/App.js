import React, { Component } from "react";
import Navbar from "./components/navbar";
import Counters from "./components/counters";
import axios from "axios";

class App extends Component {
  state = {
    students: []
  };

  constructor() {
    console.log("App - Constructor");
    super();
  }

  componentDidMount() {
    // Ajax Call
    console.log("App - Mount");
    axios.get("http://localhost:8080/students").then(res => {
      const student = res.data;
      this.setState({ students: student });
    });
  }

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

        <form>
          <table>
            <tbody>
              <tr>
                <td>Name</td>
                <td>
                  <input type="text" name="name" required />
                </td>
              </tr>
              <tr>
                <td>Age</td>
                <td>
                  <input type="text" name="age" required />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="submit" value="Submit" />
                </td>
              </tr>
            </tbody>
          </table>
        </form>

      </React.Fragment>
    );
  }
}

export default App;

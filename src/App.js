import React from "react";

import "./App.css";
import sample from "./sample";
import ApiDataList from "./apiCatcher";


const emailValid = new RegExp(/\S+@\S+\.\S+/); //email format
const bdateValid = new RegExp(
  /^((0?[1-9]|[12][0-9]|3[01])[- /.](0?[1-9]|1[012])[- /.](19|20)?[0-9]{2})*$/
); //date format

const newEntry = new Array();

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      inputs: {fname: '', lname: ''},
      input: {email: '', bdate: '', eid: ''},
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.letterOnly = this.letterOnly.bind(this);
  }

  handleChange(event) { // binds value per name
    let input = this.state.input;
    input[event.target.name] = event.target.value;

    this.setState({ input });
  }

  letterOnly(e) { // checker for letter only
    let inputs = this.state.inputs;
    inputs[e.target.name] = e.target.value;

    if (e.target.value.match("^[a-zA-Z ]*$") != null) {
      this.setState({ inputs });
    }
  }

  handleSubmit(event) {
    event.preventDefault(); //prevent the browser from executing the default action

    if (this.validate()) { // makes sure all fields have input
      
      let input = {};
      let inputs = {};

      this.newEntry(); // assign new values to an object
      this.resetEntry();

      // resets the form
      inputs["fname"] = "";
      inputs["lname"] = "";
      input["email"] = "";
      input["eid"] = "";
      input["bdate"] = "";
      this.setState({ input: input, inputs: inputs });

      alert("Data has been successfully save!");
    }
  }

  validate() {
    let inputs = this.state.inputs;
    let input = this.state.input;
    let errors = {};
    let isValid = true;

    if (!inputs["fname"]) {
      isValid = false;
      errors["fname"] = "This is a required field.";
    }

    if (!inputs["lname"]) {
      isValid = false;
      errors["lname"] = "This is a required field.";
    }

    if (!input["email"]) {
      isValid = false;
      errors["email"] = "This is a required field.";
    }

    // if (input["email"] !== "undefined") {
    //   if (!emailValid.test(input["email"])) {
    //     isValid = false;
    //     errors["email"] = "Please enter a valid email address.";
    //   }
    // }

    if (!input["eid"]) {
      isValid = false;
      errors["eid"] = "This is a required field.";
    }

    if (!input["bdate"]) {
      isValid = false;
      errors["bdate"] = "This is a required field.";
    }

    if (typeof input["bdate"] !== "undefined") {
      if (!bdateValid.test(input["bdate"])) {
        isValid = false;
        errors["bdate"] = "Please follow the correct format 'dd/mm/yyyy' (must be 18 years old or above)";
      }
    }

    this.setState({
      errors: errors
    });

    return isValid;
  }

  newEntry() {
    let entry = Object.assign(this.state.inputs, this.state.input);

    newEntry.push(...newEntry, entry)
    console.log(newEntry);

    this.setState({newEntry: newEntry})

    // this.resetEntry();    
  }

  resetEntry() {
    let entry = {};

    entry["fname"] = "";
    entry["lname"] = "";
    entry["email"] = "";
    entry["eid"] = "";
    entry["bdate"] = "";
    this.setState({ entry: entry })
  }

  render() {
    return (
      <div>
        <h1>ReactJS Assessment Form</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>First Name:</label>
            <input
              type="text"
              name="fname"
              value={this.state.inputs.fname}
              onChange={this.letterOnly}
              autoComplete="off"
              className="form-control"
              placeholder="Juan"
              id="first"
            />

            <div className="text-danger">{this.state.errors.fname}</div>
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              name="lname"
              value={this.state.inputs.lname}
              onChange={this.letterOnly}
              autoComplete="off"
              className="form-control"
              placeholder="Dela Cruz"
              id="last"
            />

            <div className="text-danger">{this.state.errors.lname}</div>
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={this.state.input.email}
              onChange={this.handleChange}
              autoComplete="off"
              className="form-control"
              placeholder="sample@sample.com"
              id="email"
            />

            <div className="text-danger">{this.state.errors.email}</div>
          </div>
          <div className="form-group">
            <label>Enterprise ID:</label>
            <input
              name="eid"
              type="number"
              value={this.state.input.eid}
              onChange={this.handleChange}
              autoComplete="off"
              placeholder="12345678"
              className="form-control"
              maxLength={8}
            />

            <div className="text-danger">{this.state.errors.eid}</div>
          </div>
          <div className="form-group">
            <label>Birthdate:</label>
            <input
              name="bdate"
              value={this.state.input.bdate}
              onChange={this.handleChange}
              autoComplete="off"              
              placeholder="dd/mm/yyyy"
              className="form-control"
              min="1931-01-01"
              max="2003-12-31"
              id="bdate"
            />

            <div className="text-danger">{this.state.errors.bdate}</div>
          </div>

          <button id="submit">Submit</button>
        </form>

        <br/>
        <div id="table">
          <h2>Employee List</h2>
          <hr/>
          <h5>JSON file</h5>
          <div id="sample">
            {newEntry.map((emp) => (
                <div id="datable" key={emp.eid}>
                  <h4>{emp.fname} {emp.lname}</h4>
                  <p>EMAIL: {emp.email}</p>
                  <p>EID: {emp.eid}</p>
                  <p>BIRTHDATE: {emp.bdate}</p>
                </div>
              ))
            }
            {sample.map((emp, index) => (
              <div id="datable" key={index}>
                <h4>{emp.fname} {emp.lname}</h4>
                <p>EMAIL: {emp.email}</p>
                <p>EID: {emp.eid}</p>
                <p>BIRTHDATE: {emp.bdate}</p>
              </div>
            ))}
          </div>
          <br/>
          <hr />
          <h5>API data</h5>
          <div id="apiSample">

            <ApiDataList />
            
          </div>
        </div>

        
      </div>
    );
  }
}

export default App;

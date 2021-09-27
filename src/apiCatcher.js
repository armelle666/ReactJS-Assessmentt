
import React from 'react';
import axios from 'axios';

export default class ApiDataList extends React.Component {
  state = {
    apiData: [],
    errorMessage: ''
  }

  componentDidMount() {
    axios.get('https://employeefakedata.free.beeceptor.com/employeefakeinfo')
      .then(response => this.setState({apiData: response.data}))
      .catch(err => { 
        this.setState({errorMessage: err.message});
      })
  }

  render() {
    return (
      <ul>
        {
            this.state.errorMessage &&
            <h3 className="error"> { this.state.errorMessage } </h3>
        }
      </ul>
    )
  }
}

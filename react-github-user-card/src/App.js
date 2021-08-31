import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  state = {
    gitUserData: {},
  };

  componentDidMount() {
    axios
      .get(`https://api.github.com/users/jMisch44`)
      .then((res) => {
        this.setState({
          ...this.state,
          gitUserData: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <div className="App">
        <img
          width={100}
          src={this.state.gitUserData.avatar_url}
          alt="placeholder"
        />
        <h1>{this.state.gitUserData.login}</h1>
        <p>{this.state.gitUserData.name}</p>
        <p>{this.state.gitUserData.bio}</p>
      </div>
    );
  }
}

export default App;

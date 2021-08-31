import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  state = {
    gitUser: "",
    gitUserData: {},
    gitUserFollowers: [],
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
    axios
      .get(`https://api.github.com/users/wlongmire/followers`)
      .then((res) => {
        this.setState({
          ...this.state,
          gitUserFollowers: res.data,
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
          alt="git avatar"
        />
        <h1>{this.state.gitUserData.login}</h1>
        <p>{this.state.gitUserData.name}</p>
        <p>{this.state.gitUserData.bio}</p>
        <h3>followers</h3>
        {this.state.gitUserFollowers.map((follower) => {
          return <p>{follower.login}</p>;
        })}
      </div>
    );
  }
}

export default App;

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
        <div className="card-container">
          <div className="non-followers card">
            <img
              width={100}
              src={this.state.gitUserData.avatar_url}
              alt="github avatar"
            />
            <div className="non-followers text">
              <h1>{this.state.gitUserData.login}</h1>
              <p>{this.state.gitUserData.name}</p>
              <p>{this.state.gitUserData.bio}</p>
            </div>
          </div>
          <h3>followers:</h3>

          {this.state.gitUserFollowers.map((follower) => {
            return <p className="followers">{follower.login}, </p>;
          })}
        </div>
      </div>
    );
  }
}

export default App;

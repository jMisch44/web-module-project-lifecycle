import React, { Component, useState } from "react";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  state = {
    gitUser: "jMisch44",
    gitUserData: {},
    gitUserFollowers: [],
  };

  componentDidMount() {
    axios
      .get(`https://api.github.com/users/${this.state.gitUser}`)
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
      .get(`https://api.github.com/users/${this.state.gitUser}/followers`)
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

  // componentDidUpdate() {

  // }
  handleChange = (e) => {
    this.setState({
      ...this.state,
      gitUser: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`https://api.github.com/users/${this.state.gitUser}`)
      .then((res) => {
        this.setState({
          ...this.state,
          gitUserData: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`https://api.github.com/users/${this.state.gitUser}/followers`)
      .then((res) => {
        this.setState({
          ...this.state,
          gitUserFollowers: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="App">
        <header>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              // value={this.state.gitUser}
              onChange={this.handleChange}
            />
            <button>Search for User</button>
          </form>
        </header>
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
          {this.state.gitUserFollowers === [] ? (
            this.state.gitUserFollowers.map((follower) => {
              return <p className="followers">{follower.login}, </p>;
            })
          ) : (
            <p>No followers</p>
          )}
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import Writer from "./Writer";
import postStorage from "./PostStorage";
import Post from "./Post"

class App extends Component {
  constructor(){
    super();
    this.state = {
      posts: [],
    };
  }



  componentDidMount() {
    postStorage.subscribe(this);
  }

  componentWillUnmount(){
    postStorage.unsubscribe(this);
  }


 render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">blockchain Short SNS</h1>
        </header>
        <div>
          <Writer />
          <div>
            {
              Object.keys(this.state.posts).map(key => <Post post= {this.state.posts[key]} />)
            }
          </div>
        </div>
      </div>
    );
  }
}
export default App;

import React, {Component} from "react";

class Post extends Component {
    render() {
        return{
            <div>
            <p className="author">{this.props.post.author}</p>
            <p>{this.props.post.contents}</p>
            <p className="date">{this.props.post.time}</p>
            </div>
        };
    }
}
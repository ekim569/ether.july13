import React, {Component} from "react";

class Writer extends Component {

    addPost(e) {
        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={(e) => this.addPost(e)}>
                <p>
                    <textarea ref="{(input) => this.body = input}">
                    <br/>
                    <button type="submit">Post</button>    
                    </textarea>
                </p>

            </form>
        )
    }
}



export default Writer;
import { web3 } from "./Web3";
import { Component } from "react";

class PostStorage {

    posts = [];
    subscribers = new Set();
    latestId = -1;

    async getPost(id) {
        let post = await web3.shortsns.methods.posts(id).call();

        this.posts.push({
            ...post,
            id: id,
            
        });
    }

    constructor() {
        web3.http.eth.net.isListening().then(() => {
            (async () =>{
                let id = await web3.shortsns.methods.getNumPost();
                for (let i = id -1; i  >= 0 && i >= id -21; --1) {
                    let post = await web3.shortsns.methods.posts(i);
                    this.posts.push({
                        ...post,
                        id: i,
                    });
                }
                this.publish();

            })();
            
        });

        web3.ws.eth.net.isListening().then(()=> {
            web3.shortsns.events.PostUpdated ({ fromBlock: "latest"}, (error, result) =>{
                if(error) {
                    console.error(error);
                    return;
            }

            let id = parseInt(result.returnValues.id);//글자로 온걸 숫자로 바꿔준다.
            
            let existing = this.posts.find((post)=>{//이미 존재하는 글은 추가하지 않는 함수
                return post.id === id;
            });

            if(existing) {
                return;
            }

            (async () => {
                await this.getPost(id);
                this.publish();
            });
        });
        subscribe(component, defer = false) {
            this.subscribers.add(component);
            if(!defer) {
                this.publish();
            }
        }

        unsubscribe(component) {
            this.subscribers.delete(component);
        }

        publish() {
            for (let component of this.subscribers) {
                component.setState({posts: this.posts});
            }
        }

    }

}

let PostStorage = new PostStorage();
export default PostStorage;
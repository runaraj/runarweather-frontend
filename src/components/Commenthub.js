import React, { Component } from 'react';
//import './Selector.css';

class Selector extends Component {
    constructor(props) {
        super (props);
        this.state = {comments: [], location: this.props.location};

        this.produrl = "https://runarweather-runarweather-separate-backend.azurewebsites.net/database/";
        this.localdb = "http://localhost:3001/database/"

        this.dburl = this.produrl; // USE THIS TO CHANGE BETWEEN TEST AND PROD


        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount() {
        console.log("Commenthub mounted");
        this.loadAllComments();
    }



    componentWillReceiveProps(nextProps){
        this.setState({location: nextProps.location});
        this.loadAllComments();

    }

    validateComment(comment){
        if (comment.length > 0){
            return true
        }
        alert("No spam please");
        return false

    }


    handleSubmit(event) {
        let new_comment = event.target.commentfield.value
        if (this.validateComment(new_comment)){
            let today = new Date().toLocaleString();
            let comment_object = {location: this.state.location, text: new_comment, timestamp: today};
            // this.setState({comments: this.state.comments.concat([JSON.stringify(comment_object)])});
            this.storeObject(comment_object);
            this.setState({comments: this.state.comments.concat([comment_object])});
        }
        event.preventDefault();

    }

    storeObject(obj) {
        fetch(this.dburl+"insertcomment", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: 
                JSON.stringify(obj)
            
        }).then(res => res.json())
        .then (data => console.log(data))
        // .then(data => console.log(data))
    }

    // Load all stored comments when component mounts
    loadAllComments() {
        fetch(this.dburl + "getcomments/"+this.state.location)
            .then(res => res.json())
            .then(data => {
                this.setState({comments: (data)});
            });
    }

    render() {

        let commentList = this.state.comments.map((item) => 
            <li key={item.text}>{item.text} : {item.timestamp}</li>
        );
        return (
            <div>

                <form onSubmit={this.handleSubmit}><p>Comments for {this.state.location}:</p>
                    <label>
                        <input type="text" name="commentfield"/>
                    </label>
                    <input type="submit" value="Submit comment"/>
                </form>
                <ul>{commentList}</ul>
            </div>

        );
    }
}

export default Selector;
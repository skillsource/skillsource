import React, { Component } from "react";
import axios from 'axios';
import Snippet from './snippet.jsx';
import ApiService from '../services/ApiService.jsx'
import AuthService from './AuthService.jsx';

class Comment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      comment: ''
    }
    this.getComments();
  }

  getComments() {
    ApiService.getCommentsForCourse(this.props.courseId)
      .then((response) => {
        this.setState({
          comments: response
        });
      })
      .catch((error) => {
        console.log("error getting comments for course:", error)
      })
  }

  addComment(e) {
    e.preventDefault();
    let comment = this.state.comment;
    let comments = this.state.comments;
    ApiService.addComment(this.props.courseId, comment)
      .then((response) => {
        comments[this.state.comments.length] = response
        this.setState({
          comments: comments
        });
      })
      .catch((error) => {
        console.log("error adding comment:", error)
      })
  }

  commentInput(e) {
    this.setState({
      comment: e.target.value
    })
  }

  render() {
    const loggedIn = AuthService.loggedIn();
    return (
      loggedIn ?
        <div>
          <h3>Add Comment:</h3>
          <div>
            <input type="text" placeholder="Comment..." onChange={(e) => this.commentInput(e)} />
            <button onClick={this.addComment.bind(this)}>Submit Comment</button>
          </div>
          <div>Comments:</div>
          {
            (this.state.comments.length >= 1) ?
            this.state.comments.map((comment, index) =>
              <div key={comment.id}>
                {comment.text}
              </div>
            )
            :
            <div></div>
          }
        </div>
        : <div>Only logged in users can see comments. Please go to Login Page in order to see login.</div>
    );
  }
}

export default Comment;
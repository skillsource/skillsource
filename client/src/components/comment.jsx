import React, { Component } from "react";
import axios from 'axios';
import Snippet from './snippet.jsx';
import ApiService from '../services/ApiService.js'
import AuthService from '../services/AuthService.js';
import Moment from 'react-moment';

class Comment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      comment: '',
      selectedComment: null
    }
    this.getComments();
  }

  handleSelectComment(id) {
    if (this.state.selectedComment === id) {
      this.setState({selectedComment: null});
    } else {
      this.setState({
        selectedComment: id
      });
    }

  }

  getComments() {
    ApiService.getCommentsForCourse(this.props.courseId)
      .then((response) => {
        console.log(response);
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
      .then(() => {
        this.getComments();
        this.inputComment.value = "";
      })
  }

  addSubComment(e) {
    console.log('SubComment fired');
  }

  renderComment(comment) {
    return (
      <div className="comment" key={comment.id} onClick={this.handleSelectComment.bind(this, comment.id)}>
        <div className="commentHeader">
          <p>Posted <Moment format="M/D/YYYY">{comment.createdAt}</Moment> at <Moment format="h:mm A">{comment.createdAt}</Moment> by <b>{comment.user.username}:</b></p>
        </div>
        <div className="commentText">
          <p>{comment.text}</p>
          <div className="comment-options">
            <div className="comment-icon">3<i className="material-icons">comment</i></div>
            <div className="comment-icon"><i className="material-icons">forum</i>Add Comment</div>
          </div>
        </div>
      </div>
    );
  }

  renderCommentThread(comment) {
    return (
      <div className="comment" key={comment.id} onClick={this.handleSelectComment.bind(this, comment.id)}>
        <div className="commentHeader">
          <p>Posted <Moment format="M/D/YYYY">{comment.createdAt}</Moment> at <Moment format="h:mm A">{comment.createdAt}</Moment> by <b>{comment.user.username}:</b></p>
        </div>
        <div className="commentText">
          <p>{comment.text}</p>
          <div className="comment-options">
            <div className="comment-icon">3<i className="material-icons">comment</i></div>
            <div className="comment-icon"><i className="material-icons">forum</i>Add Comment</div>
          </div>
        </div>

        <div className="commentWrite">
          <textarea ref={el => this.inputComment = el} rows="10" className="commentInput" placeholder="Add a comment here." onChange={(e) => this.commentInput(e)} />
          <button onClick={this.addSubComment.bind(this)}>Post comment</button>
        </div>

      </div>
    );
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
        <div className="discussionboard">
          <h3>Discussion Board</h3>
          <div className="commentWrite">
            <textarea ref={el => this.inputComment = el} rows="10" className="commentInput" placeholder="Add a comment here." onChange={(e) => this.commentInput(e)} />
            <button onClick={this.addComment.bind(this)}>Post comment</button>
          </div>
          {
            (this.state.comments.length >= 1) ?
            this.state.comments.map((comment, index) => {
              return this.state.selectedComment !== comment.id ? this.renderComment(comment) : this.renderCommentThread(comment);
            }
            )
            :
            <div>

          </div>
          }
        </div>
        : <div className="discussionboard">
          <h3>Discussion Board</h3>
          <p>Only logged in users can see comments. Please login or create an account.</p>
          </div>
    );
  }
}

export default Comment;

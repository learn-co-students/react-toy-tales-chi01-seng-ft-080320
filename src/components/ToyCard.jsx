import React, { Component } from 'react';

class ToyCard extends Component {
  state = {
    likes: this.props.toy.likes
  }


  likeHandler = () => {
    const reqObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({likes : this.props.toy.likes += 1})
    }
    fetch(`http://localhost:3000/toys/${this.props.toy.id}`, reqObj)

    this.setState({
      likes: this.state.likes += 1
    })
  }

  deleteHandler = () => {
    this.props.donateToy(this.props.toy.id)
    fetch(`http://localhost:3000/toys/${this.props.toy.id}`, {method: "DELETE"})
  }

  render() {
    return (
      <div className="card">
        <h2>{this.props.toy.name}</h2>
        <img src={this.props.toy.image} alt={this.props.toy.name} className="toy-avatar" />
        <p>{this.props.toy.likes} Likes </p>
        <button onClick={this.likeHandler} className="like-btn">Like {'<3'}</button>
        <button onClick={this.deleteHandler} className="del-btn">Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;

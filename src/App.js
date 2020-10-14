import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  state = {
    display: false,
    toys: []
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  componentDidMount() {
    fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toys => this.setState({toys: toys}))
  }

  onLike = id => {

    const toyLikes = this.state.toys.find(toy => toy.id === id).likes + 1

    const reqObj = {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({"likes": toyLikes})
    }

    fetch(`http://localhost:3000/toys/${id}`, reqObj)
    .then(resp => resp.json())
    .then(toy => this.updateLikes(toy.id))
      
  }

  updateLikes = id => {
    let newToyArray = []
      this.state.toys.forEach(toy => {
        if (toy.id === id) {
          toy.likes += 1
        }
        newToyArray.push(toy)
      })
      this.setState({toys: newToyArray})
  }

  onDonate = id => {
    fetch(`http://localhost:3000/toys/${id}`, {method: "DELETE"})
    let newToyArray = this.state.toys.filter(toy => toy.id !== id)
    this.setState({toys: newToyArray})  
    
  }

  handleSubmit = e => {
    e.preventDefault()
    const reqObj = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({"name": e.target.name.value, "image": e.target.image.value, "likes": 0})
    }
    e.target.reset()
    fetch('http://localhost:3000/toys', reqObj)
    .then(resp => resp.json())
    .then(toy => {this.setState({toys: [...this.state.toys, toy]})})
  }


  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm handleSubmit={this.handleSubmit}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer onDonate={this.onDonate} onLike={this.onLike} toys={this.state.toys}/>
      </>
    );
  }

}

export default App;

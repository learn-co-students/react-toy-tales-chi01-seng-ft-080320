import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  state = {
    toys: [],
    display: false,
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
    .then(toys => {
      this.setState({
          toys : toys
      })
    })
  }

  addToy = (newToy) => {
    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newToy)
    }
    fetch('http://localhost:3000/toys',reqObj)
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        toys: [...this.state.toys, data]
      })
    })
  }

  donateToy = (id) => {
    let theToys = this.state.toys.filter(toy => toy.id !== id)
    this.setState({
      toys: theToys
    })
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm addToy={this.addToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys}
        donateToy={this.donateToy}
        />
      </>
    );
  }

}

export default App;

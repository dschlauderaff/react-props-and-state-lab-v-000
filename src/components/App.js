import React from 'react';

import Filters from './Filters';
import PetBrowser from './PetBrowser';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      adoptedPets: [],
      filters: {
        type: 'all',
      }
    };
  }

  handleChangeFilterType = type => {
    this.setState({
      filters: {
        ...this.state.filters,
        type: type
      }
    })
  }

  handleFindPets = () => {
    const type = this.state.filters.type
    let url = '/api/pets'

    if (type !== 'all'){
      url = `${url}?type=${type}`
    }

    fetch(url)
      .then(res => res.json())
      .then(pets => this.setState({ pets }))
  }

  handleAdoptPet = petId => {
    this.setState({
      adoptedPets: [...this.state.adoptedPets, petId],
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters 
                filters={this.state.filters}
                onChangeType={this.handleChangeFilterType}
                onFindPetsClick={this.handleFindPets}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser 
                pets={this.state.pets}
                adoptedPets={this.state.adoptedPets}
                onAdoptPet={this.handleAdoptPet}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

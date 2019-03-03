import React, { Component } from 'react';

const API_URL = 'https://randomuser.me/api';
const USER_LIMIT = 10;

const fetchData = () => {
  return fetch(API_URL + '/?results=' + USER_LIMIT)
    .then((resp) => resp.json())
  // .then((resp) => console.log(resp))
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      userList: []
    }
  }

  componentDidMount() {
    fetchData()
      .then((resp) => this.setState({ userList: resp.results, isLoading: false }));
  }

  render() {
    const { userList, isLoading } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1>Get users from randomuser.me</h1>
        </header>
        {isLoading && <div>Data is loading...</div>}
        <ul className="user__list">
          {userList && userList.map(({ id, name, email, picture }) => {
            return <li key={id.value} className="user__list-item">
                    <img src={picture.thumbnail} className="user__img" alt={`${name.first} ${name.last} picture`}/>
                    <strong>{name.first} {name.last}</strong><br />
                    {email}
                  </li>
          })}

        </ul>
      </div>
    );
  }
}

export default App;

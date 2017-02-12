// 7/ set our initial state to be used before there are any actions taken
const initialState = {
  contacts: [
    {name: 'Albert Einstein', planet: 'Earth', isFavorite: true},
    {name: 'Steve Jobs', planet: 'Earth', isFavorite: false},
    {name: 'Bob the Builder', planet: 'Earth', isFavorite: false}
  ]
}

// 6/ Simplest possible reducer, with default state value if none is provided
function reducer(state = initialState, action) {
  switch (action.type) {
  default:
    return state;
  }
}

// create a Redux store
const store = Redux.createStore(reducer);

class Contact extends React.Component {
  render() { return <div>{this.props.name}</div>;}
}

class ContactList extends React.Component {
  render() {
    const sorted = this.props.contacts.slice().sort((a, b) => a.name > b.name)
    return (
      <div>
        <h2>Contacts List</h2>
        {sorted.map(contact => <Contact name={contact.name} key={contact.name}/>)}
      </div>
    );
  }
}

// 7/ wrap render in an event handler that triggers when the store is updated
store.subscribe(() => {
  // 2/ store.getState is a function that returns the current state
  ReactDOM.render(
    <ContactList contacts={store.getState().contacts} />,
    document.getElementById('root')
  )
});

// either manually call render, or fire an action to trigger subscribe which will render
// dispatch takes an "action" object with a "type" field.
store.dispatch({type:'START'});
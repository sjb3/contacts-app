const initialState = {
  contacts: [
    {name: 'Albert Einstein', planet: 'Earth', isFavorite: true},
    {name: 'Steve Jobs', planet: 'Earth', isFavorite: false},
    {name: 'Bob the Builder', planet: 'Earth', isFavorite: false},
    {name: 'Superman', planet: 'Krypton', isFavorite: true}, // alien added
    {name: 'Optimus Prime', planet: 'Cybertron', isFavorite: false} // alien added
  ],
  // 4/ 1. add more to state to manage filtering and searching
  filters: {
    onlyEarth: false,
    search: '',
  }
}

// 3/ 3. handle a SET_FILTER action
function reducer(state = initialState, action) {
  switch (action.type) {
  case 'SET_FILTER':
    // 6/ 4. use Object.assign to create a NEW object and avoid mutating state directly
    return Object.assign({}, state, {
      filters: {
        onlyEarth: action.value,
        search: state.filters.search
      }
    })
  default:
    return state;
  }
}

const store = Redux.createStore(reducer);

class Contact extends React.Component {
  render() { return <div>{this.props.name}</div>;}
}

class ContactList extends React.Component {
  // 3/ 6. calls the passed in function that updates our state with what the new value should be
  handleChange = (event) => {
    this.props.setEarthFilter(event.target.checked);
  }
  render() {
    const sorted = this.props.contacts.slice().sort((a, b) => a.name > b.name)
  // 4/ 5. render a checkbox with the value driven from redux, and tell it how to handle changes
    return (
      <div>
        <h2>Contacts List</h2>
        <input type="checkbox" checked={this.props.filters.onlyEarth} onChange={this.handleChange}/>
        Only Earth
        {sorted.map(contact => <Contact name={contact.name} key={contact.name}/>)}
      </div>
    );
  }
}

store.subscribe(() => {
  // 5/ 2. pass filters to ContactList, and a function for updating the filter value
  ReactDOM.render(
  <ContactList
    contacts={store.getState().contacts}
    filters={store.getState().filters}
    setEarthFilter={onlyEarth => store.dispatch({type: 'SET_FILTER', value: onlyEarth})}
    />, document.getElementById('root'))
});
store.dispatch({type:'START'});
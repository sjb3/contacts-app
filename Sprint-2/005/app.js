const initialState = {
  contacts: [
    {name: 'Albert Einstein', planet: 'Earth', isFavorite: true},
    {name: 'Steve Jobs', planet: 'Earth', isFavorite: false},
    {name: 'Bob the Builder', planet: 'Earth', isFavorite: false},
    {name: 'Superman', planet: 'Krypton', isFavorite: true},
    {name: 'Optimus Prime', planet: 'Cybertron', isFavorite: false}
  ],
  filters: {onlyEarth: false, search: ''}
}

function reducer(state = initialState, action) {
  switch (action.type) {
  case 'SET_FILTER':
    return Object.assign({}, state, {
      filters: { onlyEarth: action.value, search: state.filters.search }
    })
  case 'SET_SEARCH':
    return Object.assign({}, state, {
      filters: { onlyEarth: state.filters.onlyEarth, search: action.value}
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
  handleChange = (event) => {
    this.props.setEarthFilter(event.target.checked);
  }
  setSearch = (event) => {
    this.props.setSearch(event.target.value);
  }

  render() {
    const search = this.props.filters.search;
    const matchSearch = this.props.contacts.filter(contact => {
      return contact.name.toLowerCase().includes(search.toLowerCase());
    });

    const sorted = matchSearch.sort((a, b) => a.name > b.name);
    const filtered = sorted.filter(contact => {
      if (this.props.filters.onlyEarth) {
        return contact.planet === 'Earth' ? true : false;
      } else {
        return true;
      }
    })

    // 10/ using our filtered list and our original list we can show how many contacts are hidden
    return (
      <div>
        <h2>Contacts List</h2>
        Search: 
        <input type="text" value={this.props.filters.search} onChange={this.setSearch} />
        <br />
        <input type="checkbox" checked={this.props.filters.onlyEarth} onChange={this.handleChange}/>
        Only Earth
        {filtered.map(contact => <Contact name={contact.name} key={contact.name}/>)}
        {`${filtered.length} shown, ${this.props.contacts.length - filtered.length} hidden`}
      </div>
    );
  }
}

store.subscribe(() => {
  ReactDOM.render(
  <ContactList
    contacts={store.getState().contacts}
    filters={store.getState().filters}
    setEarthFilter={onlyEarth => store.dispatch({type: 'SET_FILTER', value: onlyEarth})}
    setSearch={text => store.dispatch({type: 'SET_SEARCH', value: text})}
    />, document.getElementById('root'))
});
store.dispatch({type:'START'});
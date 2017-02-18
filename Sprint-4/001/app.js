const initialState = {
  contacts: [
    {name: 'Albert Einstein', planet: 'Earth'}, {name: 'Steve Jobs', planet: 'Earth'},
    {name: 'Bob the Builder', planet: 'Earth'}, {name: 'Superman', planet: 'Krypton'},
    {name: 'Optimus Prime', planet: 'Cybertron'}
  ], favorites: [], filters: {onlyEarth: false, search: ''}
}

function reducer(state = initialState, action) {
  switch (action.type) {
  case 'SET_FILTER':
    return Object.assign({}, state, { filters: { onlyEarth: action.value, search: state.filters.search }})
  case 'SET_SEARCH':
    return Object.assign({}, state, { filters: { onlyEarth: state.filters.onlyEarth, search: action.value }})
  case 'ADD_FAVORITE':
    return Object.assign({}, state, { favorites: state.favorites.concat(action.contact) });
  // when we want to add a contact, we create a new contact list with the old + the new
  case 'ADD_CONTACT':
    return Object.assign({}, state, {
      contacts: state.contacts.concat(action.contact)
    })
  default:
    return state;
  }
}

const store = Redux.createStore(reducer);

const Contact = ({name}) => <div>{name}</div>

const FavoriteList = ({contacts}) => (
  <div><h2>Favorites</h2>{contacts.map(contact => <Contact name={contact.name} key={contact.name}/>)}</div>
);

// 21/ 1. this form handles all the logic for adding a new contact
class NewContactForm extends React.Component {
  // 2. (es2016 property initializer syntax) we need to track input box state
  state = { name: '', planet: '' }
  
  // 3/ 4. handles updating the name in our from state on every keypress
  updateName = (event) => {
    this.setState({ name: event.target.value });
  }
  
  // 3/ 5. handles updating the name in our from state on every keypress
  updatePlanet = (event) => {
    this.setState({ planet: event.target.value });
  }

  // 3/ 6. calls our redux action creator and dispatches with the current form state
  addContact = () => {
    this.props.addContact(this.state);
  }

  // 9/ 3. render two "controlled" form inputs
  render() {
    return (
      <div>
        Name: <input type="text" name="name" onChange={this.updateName} />
        Planet: <input type="text" name="planet" onChange={this.updatePlanet} />
        <button onClick={this.addContact}>Add</button>
      </div>
    )
  }
}

class ContactList extends React.Component {
  handleChange = (event) => this.props.setEarthFilter(event.target.checked);
  setSearch = (event) => this.props.setSearch(event.target.value);
  addFavorite = (contact) => this.props.addFavorite(contact);

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

    return (
      <div>
        <h2>Contacts List</h2>
        Search: 
        <input type="text" value={this.props.filters.search} onChange={this.setSearch} />
        <br />
        <input type="checkbox" checked={this.props.filters.onlyEarth} onChange={this.handleChange}/>
        Only Earth
        {filtered.map(contact => (
          <a href="#" onClick={this.addFavorite.bind(null, contact)} key={contact.name}>
            <Contact name={contact.name}/>
          </a>
        ))}
        {`${filtered.length} shown, ${this.props.contacts.length - filtered.length} hidden`}
      </div>
    );
  }
}

// 3/ 7. make sure we render our new contact form! it also needs to be able to dispatch our add action
const App = () => (
  <div>
    <NewContactForm addContact={contact => store.dispatch({type: 'ADD_CONTACT', contact})} />
    <ContactList
      contacts={store.getState().contacts}
      filters={store.getState().filters}
      setEarthFilter={onlyEarth => store.dispatch({type: 'SET_FILTER', value: onlyEarth})}
      setSearch={text => store.dispatch({type: 'SET_SEARCH', value: text})}
      addFavorite={contact => store.dispatch({type: 'ADD_FAVORITE', contact})}
    />
    <FavoriteList contacts={store.getState().favorites}/>
  </div>
);

store.subscribe(() => {ReactDOM.render(<App />, document.getElementById('root'))});
store.dispatch({type:'START'});
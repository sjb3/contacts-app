class Contact extends React.Component {
  render() {
    // Components have a "props" property. This is how we send data into a Component.
    return <div>{this.props.name}</div>;
  }
}

ReactDOM.render(
  // An HTML attribute on a JSX element will show up in "this.props" in a Component
  <Contact name="Albert Einstein" />,
  document.getElementById('root')
)
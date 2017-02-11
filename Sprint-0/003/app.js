// 12/ We can create a class when our component grows more complex
class Contact extends React.Component {

  // 3/ every component must have a render method
  // render must return a react element (JSX gets turned into a react element)
  render() {
    return <div>Albert Einstein</div>;
  }
}

ReactDOM.render(
  // back to JS to demonstrate how to use a class
  React.createElement(Contact),
  document.getElementById('root')
)
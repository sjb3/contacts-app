// 7/ We can save time and improve readability by using JSX
// The included Babel transpiler will turn this into JS that uses createElement
const contact = <div>Albert Einstein</div>;

ReactDOM.render(
  contact,
  document.getElementById('root')
)
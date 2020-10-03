import React,{Component} from 'react';
import './index.css';
import {Button} from '../Button/index';
import {Search} from '../Search';
import {Table} from '../Table';
import {
  DEFAULT_QUERY,
  DEFAULT_HPP,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP,
} from '../constants';
/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/
/*
class App extends Component {
  state = {
    todos: []
  };


  async componentDidMount() {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/'); // fetching the data from api, before the page loaded
      const todos = await res.json();
      this.setState({
        todos
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        {this.state.todos.map(item => (
          <div key={item.id}>
            <h1>{item.title}</h1>
            <span>{item.description}</span>
          </div>
        ))}
      </div>
    );
  }
}*/

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID:0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];
function isSearched(searchTerm) {
  return function(item){
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}
/*
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      list,
      searchTerm : "",
    };
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }
  onSearchChange(event){
    this.setState({ searchTerm : event.target.value});
  }
  onDismiss(id){
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({list : updatedList});
  }
  render(){
    //var helloWorld = `Welcome to the Road to learn React`;
    const { searchTerm, list } = this.state;
    return (
      <div className='page'>
        <div className="interactions">
        <Search
          value={searchTerm}
          onChange={this.onSearchChange}
        >
          Search
        </Search>
        </div>
        <Table 
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
          />
      </div>
    );
  }
}*/
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error: null,
    };
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }
  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }
  setSearchTopStories(result){
    const { hits,page } = result;
    const { searchKey, results} = this.state;
    const oldHits = results && results[searchKey]
    ? results[searchKey].hits : [];
    const updatedHits = [...oldHits,...hits]
    this.setState({results:{  ...results,[searchKey]: {hits:updatedHits,page} } });
  }
  fetchSearchTopStories(searchTerm, page = 0) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
    .then(response => response.json())
    .then(results => this.setSearchTopStories(results))
    .catch(e => this.setState({error: e}));
  }
  onSearchChange(event){
    this.setState({ searchTerm : event.target.value});
  }
  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm});
    if(this.needsToSearchTopStories(searchTerm)){
      this.fetchSearchTopStories(searchTerm);
    }
    event.preventDefault();
  }
  onDismiss(id){
    const { searchKey,results } = this.state;
    const { hits, page } = results[searchKey];
    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);
    //this.setState({hits : updatedHits});
    //const updatedResult = Object.assign({}, this.state.result, updatedHits);
    this.setState({results: {...results, [searchKey]:{hits: updatedHits}} }); 
  }
  componentDidMount(){
    const { searchTerm } = this.state;
    this.setState({ searchKey : searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }
  render(){
    const { searchTerm,results,searchKey,error } = this.state;

    const page = (results && results[searchKey] && results[searchKey].page) || 0;
    const list = (results && results[searchKey] && results[searchKey].hits) || [];
    return (
      <div className='page'>

        <Search
          value={searchTerm}
          onChange={this.onSearchChange}
          onSubmit={this.onSearchSubmit}
        >
          Search
        </Search>
        {error
         ? <div className="interactions">
           <p>Something went wrong</p>
           </div>
         : <Table 
          list={list}
          //pattern={searchTerm}
          onDismiss={this.onDismiss}
          />
        }
          <div className="interactions">
          <Button onClick={() => this.fetchSearchTopStories(searchKey,page+1)}>
            More
          </Button>
          </div>
      </div>
    );
  }
}

/*
class Search extends Component{
  render() {
    const { value, onChange, children} = this.props;
    return(
      <form>
        {children}<input
        type='text'
        value={value}
        onChange={onChange}
        />
      </form>
    );
  }
}*//*
class Table extends Component {
  render() {
    const { list, pattern, onDismiss } = this.props;
    return (
      <div>
        {list.filter(isSearched(pattern)).map(item =>
            <div key={item.objectID}>
              <span>
                <a href={item.url}>{item.title}</a>
              </span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
              <span>
                <Button onClick={() => onDismiss(item.objectID)}>
                  Dismiss
                </Button>
              </span>
            </div>
            )}
      </div>
    );
  }
}*/




export default App;

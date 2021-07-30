import React, { Component } from 'react';

class App extends Component {
	constructor(props){
	  super(props);
	  this.state = {
	    title:"",
	    description:"",
	    todos:[],
	  };
	  this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
	 }
	handleChange(event) {
    	const {name, value} = event.target
        this.setState({
            [name]: value
        })
  	}
    handleSubmit(event) {
     const requestOptions ={
	   method: 'POST',
	   headers:{'Content-Type': 'application/json'},
	   body: JSON.stringify({title:this.state.title,description:this.state.description})
	 };
	 fetch('http://127.0.0.1:8000/api/',requestOptions)
    }
  async componentDidMount() {
  	
    try {
      const res = await fetch('http://127.0.0.1:8000/api/');
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
      	<h1>Todo登録</h1>
	      <form>
	        <label>
	          タイトル
	          <br />
	          <input
	            name="title"
	            type="text"
	            value={this.state.title}
	            onChange={this.handleChange} />
	        </label>
	        <br />
	        <label>
	          内容
	          <br />
	          <input
	            name="description"
	            type="text"
	            value={this.state.description}
	            onChange={this.handleChange} />
	        </label>
	        <br />
	        <button onClick={this.handleSubmit}>作成</button>
	      </form>
	      	<p>------------------------------</p>
      	<h1>Todoリスト</h1>
        
            <div>
	        {this.state.todos.map(item => (
	          <div key={item.id}>
	            <h2>{item.title}</h2>
	            <span>{item.description}</span>
	          </div>
	        ))}
	      </div>
          
      </div>
    );
  }
}

export default App;
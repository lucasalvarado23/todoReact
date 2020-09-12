import React, { useState,useEffect } from 'react';
import './App.css';
//importin components 

import Form from "./components/Form";
import TodoList from './components/TodoList';

function App() {

  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilterTodos] = useState([]);

  //RUN ONCE 
  useEffect(() => {
    getLocalTodos();
  }, []);

   //use effect
   useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  //functions
const filterHandler = () => {
  switch(status){
    case 'completed':
    setFilterTodos(todos.filter(todo => todo.completed === true))
    break;
    case 'uncompleted': 
    setFilterTodos(todos.filter(todo => todo.completed === false))
    break;
    default:
      setFilterTodos(todos);
      break;
  }
}

//save to localstorage

const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
};
const getLocalTodos  = () => {
  if(localStorage.getItem('todos') === null){
    localStorage.setItem('todos', JSON.stringify([]));
  }else{
   let todoFromLocal = JSON.parse(localStorage.getItem("todos"));
   setTodos(todoFromLocal);
  }
};

  return (
    <div className="App">
      <header>
  <h1>TO DO LIST</h1>
      </header>
      <Form inputText={inputText} todos={todos} setTodos={setTodos} setInputText={setInputText} setStatus={setStatus} />
      <TodoList filteredTodos={filteredTodos} setTodos={setTodos} todos={todos} />
    </div>
  );
}

export default App;

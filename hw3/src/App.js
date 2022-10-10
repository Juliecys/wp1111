import './App.css';
import './styles.css';
import { useEffect, useState } from 'react';


import Header from './header';
import Section from './section';
import Footer from './footer';

function App() {
  const [TodoList, setTodoList] = useState([])
  const [ActiveTodoNum, setActiveTodoNum] = useState(0)
  const count_active = () => {
    const activeList = TodoList.filter(todo => todo.status === 'Active')
    let active_todo_num = activeList.length
    setActiveTodoNum(active_todo_num)
  }
  const [Filter, setFilter] = useState('All')

  useEffect (() => {
    count_active()
  },[TodoList])

  return (
    <div className="App">
      <div id = "root" className = "todo-app__root">
        <Header />
        <Section TodoList = {TodoList} setTodoList = {setTodoList} Filter = {Filter} count_active = {count_active}/>
        {TodoList.length !== 0?
          (<Footer todo_num = {TodoList.length} active_num = {ActiveTodoNum} setFilter = {setFilter} TodoList = {TodoList} setTodoList = {setTodoList}/>) : (<div></div>)
        }
      </div>
    </div>
  );
}

export default App;

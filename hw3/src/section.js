import { useEffect, useState } from 'react';
import TodoItem from './TodoItem';

const Section = ({TodoList, setTodoList, Filter, count_active}) => {
    const [TodoNum,setTodoNum] = useState(0)
    // const [InputValue,setInputValue] = useState("")
    const prompt_text = "What needs to be done?" 
    const [ShowList, setShowList] = useState([])

    const getInput = (e) => {
        if (e.code === "Enter"){
            let input_things = e.target.value
            let push_things = {id: TodoNum, status: 'Active', things: input_things}
            setTodoNum(TodoNum + 1)
            setTodoList([...TodoList, push_things])
            e.target.value = ''
            // console.log(TodoNum)
            // count_active()
        }
    }

    // 刪除 todo 
    const handleDelete = (delete_id) => {
        const newTodoList = TodoList.filter(todo => todo.id !== delete_id)
        setTodoList(newTodoList)
    }

    // 改變 todo item 的 status
    const setStatus = (change_id, changeStatus) => {
        setTodoList(
            TodoList.map(item => 
                item.id === change_id 
                ? {...item, status : changeStatus} 
                : item 
        ))
    }

    // 決定 ShowList
    const decideShowList = () => {
        if (Filter === 'All') {
            let tempList = TodoList
            setShowList(tempList)
        }
        else {
            let tempList = TodoList.filter(todo => todo.status === Filter)
            setShowList(tempList)
        }
    }

    useEffect (() => {
        decideShowList()
    },[Filter, TodoList])

    return ( 
    <section className = "todo-app__main">
        <input type = "text" className = "todo-app__input" 
        placeholder = {prompt_text} onKeyUp={(e) => getInput(e)}/>

        <ul className = "todo-app__list" id = "todo-list">
            {ShowList.map((todo) => (
                <TodoItem todo = {todo} handleDelete = {handleDelete} setStatus = {setStatus} key = {todo.id}/>
            ))}    
        </ul>
    </section> 
    );
}
 
export default Section;
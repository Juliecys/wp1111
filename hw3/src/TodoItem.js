import {useRef} from 'react';

import x from "./x.png";

const TodoItem = ({todo, handleDelete, setStatus}) => {
    const ref_checkbox = useRef(null);
    const ref_todo_item = useRef(null);

    // checkbox 是否 checked 的對應 style 變化
    const handleClick = () => {
        if (ref_checkbox.current.checked) {
            // console.log('✅ Checkbox is checked');
            ref_todo_item.current.style.textDecoration = 'line-through'
            ref_todo_item.current.style.opacity = 0.5
            setStatus(todo.id, 'Completed')
            // todo.status = 'Completed'
        } 
        else {
            // console.log('⛔️ Checkbox is NOT checked');
            ref_todo_item.current.style.textDecoration = 'none'
            ref_todo_item.current.style.opacity = 1
            setStatus(todo.id, 'Active')
            // todo.status = 'Active'
        }
    };
    

    return (  
        <li className = "todo-app__item">
            <div className ="todo-app__checkbox"> 
                {/* <input ref = {ref_checkbox} type = "checkbox" onClick = {handleClick} id = {todo.id}></input> */}

                {todo.status === 'Completed'? 
                    (<input ref = {ref_checkbox} type = "checkbox" checked onChange = {handleClick} id = {todo.id}></input>)
                    : (<input ref = {ref_checkbox} type = "checkbox" onChange = {handleClick} id = {todo.id}></input>)} 

                <label for = {todo.id}></label>

                {/* {console.log(todo.id)} */}
            </div>
            {todo.status === 'Completed'?
                (<h1 className = "todo-app__item-detail" ref = {ref_todo_item} style = {{textDecoration: 'line-through', opacity: 0.5}}> {todo.things} </h1>)
                :(<h1 className = "todo-app__item-detail" ref = {ref_todo_item}> {todo.things} </h1>)}

            <img src = {x} alt = '' onClick = {() => handleDelete(todo.id)} className = "todo-app__item-x" />
        </li>
    );
}
 
export default TodoItem;
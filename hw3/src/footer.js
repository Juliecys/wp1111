const Footer = ({todo_num, active_num, setFilter, TodoList, setTodoList}) => {
    // let todo_num = 2 // list 還有剩餘幾個 to-do 未做
    // console.log(todo_num)
    // 刪除 todo 
    const handleDeleteCompleted = () => {
        const newTodoList = TodoList.filter(todo => todo.status !== 'Completed')
        setTodoList(newTodoList)
    }

    return (  
        <footer className = "todo-app__footer" id = "todo-footer">
            <div className = "todo-app__total"> {active_num} left </div>
            <ul className = "todo-app__view-buttons">
                <button onClick = {() => {setFilter('All')}}> All </button>
                <button onClick = {() => {setFilter('Active')}}> Active </button>
                <button onClick = {() => {setFilter('Completed')}}> Completed </button>
            </ul>
            {todo_num - active_num !== 0?
                (<div className = "todo-app__clean"> 
                    <button onClick = {handleDeleteCompleted}> Clear completed </button>
                </div>):(<div></div>)
            }   
        </footer>
    );
}
 
export default Footer;
import { useEffect, useState } from 'react'
import './App.css'
import {AiOutlineDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';

function App() {

  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setnewTitle] = useState("");
  const [newDescription, setnewDescription] = useState("");

  const handleAddTodo = () => {
    let newTodoItem = {
      title:newTitle,
      description: newDescription
    }

    let updatedToDoArr = [...allTodos];
    updatedToDoArr.push(newTodoItem);
    setTodos(updatedToDoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedToDoArr));
  }

  useEffect(() =>{
    let savedTodo = JSON.parse(localStorage.getItem('todolist'))
    if(savedTodo){
      setTodos(savedTodo);
    }
  })

  return (
    <>
      <div className='App'>
        <h1>My Todos</h1>
        <div className='todo-wrapper'>
          <div className='todo-input'>

            <div className='todo-input-item'>
              <label>Title</label>
              <input type='text' value={newTitle} onChange={(e) => setnewTitle(e.target.value)} placeholder="What's the task title?"/>
            </div>

            <div className='todo-input-item'>
              <label>Description</label>
              <input type='text' value={newDescription} onChange={(e) => setnewDescription(e.target.value)} placeholder="What's the task description?"/>
            </div>

            <div className='todo-input-item'>
              <button type='button' onClick={handleAddTodo} className='primaryBtn'>Add</button>
            </div>

          </div>
          <div className='btn-area'>
            <button className={`secondaryBtn ${isCompleteScreen === false && 'active'}`} onClick={()=>setIsCompleteScreen(false)}>Todo</button>
            <button className={`secondaryBtn ${isCompleteScreen === true && 'active'}`} onClick={()=>setIsCompleteScreen(true)}>Completed</button>
          </div>
            {
              allTodos.map((item, id)=>{
              return (
                <>
                  <div className='todo-list'>
                    <div className='todo-list-item' key={id}>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                    <div className='icon-items'>
                      <AiOutlineDelete className='icon'/>
                      <BsCheckLg className='check-icon'/>
                    </div>
                  </div>
                </>
              )
            })
            }
          </div>
        </div>
    </> 
  )
}

export default App
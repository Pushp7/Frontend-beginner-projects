// import './App.css'
import Navbar from "./components/Navbar"
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const inputRef = useRef()

  const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const toggleFinished = () => {
    setshowFinished(!showFinished)
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
    // console.log(e.target.value)
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    saveToLocalStorage()
    setTodo("")
    // Set focus on the input field
    inputRef.current.focus()
  }

  const handleCheckboxChange = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLocalStorage()
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLocalStorage()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLocalStorage()
  }


  return (
    <>
      <div className="container m-auto min-h-screen bg-slate-500">
        <Navbar />
        <div className='w-2/5 m-auto min-h-[80vh] bg-purple-200 rounded-b-xl px-4 py-4'>
          <h1 className="font-bold text-xl my-5 select-none">Add a Todo</h1>
          <div className="w-full flex gap-6">
            <input ref={inputRef} onChange={handleChange} value={todo} type="text" className='w-full rounded-md outline-none px-3 focus:shadow-xl' placeholder="Add a Todo" />
            <button onClick={handleAdd} disabled={todo.length < 1} className='bg-zinc-600 text-white px-4 py-2 rounded'><AiOutlinePlus /></button>
          </div>

          <div className="mt-5">
            <input type="checkbox" onChange={toggleFinished} checked={showFinished} /> Show Finished
            <h3 className="font-bold text-xl select-none">Your Todos</h3>
            {todos.length === 0 && <div className="mt-5 text-zinc-500">No Todos To Display...</div>}
            <ul>
              {todos.map((item, index) => {
                return (showFinished || !item.isCompleted) && <li key={item.id} className="mb-4">
                  <div className="flex items-center justify-between gap-4 w-full">
                    <div className="flex gap-4">
                      <input type="checkbox" name={item.id} checked={item.isCompleted} onChange={handleCheckboxChange} />
                      <p className={item.isCompleted ? "line-through" : ""}>{item.todo}</p>
                    </div>
                    <div className="flex gap-4">
                      <button onClick={(e) => handleEdit(e, item.id)} className="bg-zinc-400 px-2 py-2 rounded-full"><FaEdit size={"1.4em"} color="green" /></button>
                      <button onClick={(e) => handleDelete(e, item.id)} className="bg-zinc-400 px-2 py-2 rounded-full"><MdDeleteForever size={"1.4em"} color="red" /></button>
                    </div>
                  </div>
                </li>
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

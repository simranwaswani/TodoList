import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Create from './Create';
import { BsFillCheckCircleFill,BsCircleFill, BsFillTrashFill } from 'react-icons/bs';


function Home() {
    const [todos, setTodos] = useState([]);
     useEffect(() => {
    axios.get('http://localhost:3001/get')
    .then(result => {
        console.log("Received data:", result.data);
        setTodos(result.data);
    })
    .catch(err => {
        console.error("Error fetching todos:", err);
    });
}, []);

    const handleEdit = (id) =>{
        axios.put('http://localhost:3001/update/'+id)
        .then(result => {
            location.reload()
        })
        .catch(err => 
            console.error("Error fetching todos:", err));
    
    }
    const handleDelete = (id) =>{
        axios.delete('http://localhost:3001/delete/'+id)
        .then(result => {
            location.reload()
        })
        .catch(err => 
            console.error("Error fetching todos:", err));
    
    }

    return (
        <div className="Home"> 
            <h2>To do List</h2>
            <Create />
            <br/>
            {
    todos && todos.length === 0 ? (
        <div> <h2> No Record</h2></div>
    ) : (
        todos.map(todo => (
            <div className='task' key={todo.id}> 
                <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                    {todo.done ?
                        <BsFillCheckCircleFill className = 'icon'></BsFillCheckCircleFill>
                        :
                        <BsCircleFill className='icon'/>
                }
                    
                    <p className={todo.done ? 'line_through': ""}>{todo.task}</p>
                </div>
                <div>
                    <span><BsFillTrashFill className='icon'
                     onClick={() => handleDelete(todo._id)}/></span>
                </div>
            </div>
        ))
    )
}

        </div>
    );
}

export default Home;

// import { useState } from "react";
// import { v4 as uuidv4 } from 'uuid';
// import "./TodoList.css";
// import * as React from 'react';
// import IconButton from '@mui/material/IconButton';
// import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
// import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import DoneAllIcon from '@mui/icons-material/DoneAll';
// import TaskAltIcon from '@mui/icons-material/TaskAlt';

// export default function TodoList() {
//   let [todos, setTodos] = useState([
//     { task: "sample Task", id: uuidv4(), isDone: false },
//     { task: "Code", id: uuidv4(), isDone: false }
//   ]);
//   let [newTodo, setNewTodo] = useState("");

//   let addNewTask = () => {
//     setTodos((prevTodos) => {
//       return [...prevTodos, { task: newTodo, id: uuidv4(), isDone: false }]
//     });

//     setNewTodo("");

//   };

//   let updateTodoValue = (event) => {
//     setNewTodo(event.target.value);
//   }

//   let deleteTodo = (id) => {
//     setTodos((prevTodos) => todos.filter((prevTodos) => prevTodos.id != id));

//   }

//   let markAllAsDone = () => {
//     setTodos((prevTodos) => prevTodos.map((todo) => {
//       return { ...todo, isDone: true }
//     }))
//   }

//   let markAsDone = (id) => {
//     setTodos((prevTodos) => prevTodos.map((todo) => {
//       if (todo.id == id) {
//         return { ...todo, isDone: true, }
//       } else {
//         return todo;
//       }
//     }))
//   }
//   return (
//     <div className="todo-container">

//       <h1 className="Heading">Todo List</h1>
//       <div className="input-container">
//         <TextField
//           label="Add a task"
//           type="text"
//           value={newTodo}
//           onChange={updateTodoValue}
//           required
//           className="input"
//           sx={{
//             input: {
//               color: 'white', // 
//               fontFamily: 'Montserrat, sans-serif', 
//             },
//             '& label.Mui-focused': {
//               color: 'white',
//             },
//             '& .MuiOutlinedInput-root': {
//               '& fieldset': {
//                 borderColor: 'white',
//               },
//               '&:hover fieldset': {
//                 borderColor: 'white	',
//               },
//               '&.Mui-focused fieldset': {
//                 borderColor: 'white',
//               },
//             },
//           }}
//         />
//         <Button onClick={addNewTask} className="add-btn" variant="outlined">Add</Button>
//         {/* <button onClick={addNewTask} className="add-btn">Add</button> */}
//       </div>
//       <h4>Task Todo</h4>
//       <ul>
//         {todos.map((todo) => (
//           <li key={todo.id}>
//             <span style={todo.isDone ? { textDecorationLine: "line-through" } : {}}>{todo.task}</span> &nbsp;&nbsp;
//             <IconButton aria-label="delete" onClick={() => deleteTodo(todo.id)}><DeleteOutlineOutlinedIcon color="error" /></IconButton>
//             <IconButton onClick={() => markAsDone(todo.id)}><TaskAltIcon  color="success" /></IconButton>&nbsp;&nbsp;
//           </li>
//         ))}
//       </ul>
//       <Button variant="contained" color="success"className="markAllDone" onClick={markAllAsDone} >Mark All As done</Button>
//     </div>
//   )
// }

import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./TodoList.css";
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

export default function TodoList() {
  let [todos, setTodos] = useState([
    { task: "Assignments", id: uuidv4(), isDone: false },
    { task: "Code", id: uuidv4(), isDone: false }
  ]);
  let [newTodo, setNewTodo] = useState("");

  // New states for editing
  let [editId, setEditId] = useState(null);
  let [editValue, setEditValue] = useState("");

  let addNewTask = () => {
    if (newTodo.trim() === "") return;
    setTodos((prevTodos) => [...prevTodos, { task: newTodo, id: uuidv4(), isDone: false }]);
    setNewTodo("");
  };

  let updateTodoValue = (event) => {
    setNewTodo(event.target.value);
  };

  let deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  let markAllAsDone = () => {
    setTodos((prevTodos) => prevTodos.map((todo) => ({ ...todo, isDone: true })));
  };

  let markAsDone = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, isDone: true } : todo))
    );
  };

  // Start editing a task
  let startEditing = (id, task) => {
    setEditId(id);
    setEditValue(task);
  };

  // Save the edited task
  let saveEdit = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === editId ? { ...todo, task: editValue } : todo))
    );
    setEditId(null);
    setEditValue("");
  };

  return (
    <div className="todo-container">
      <h1 className="Heading">Todo List</h1>
      <div className="input-container">
        <TextField
          label="Add a task"
          type="text"
          value={newTodo}
          onChange={updateTodoValue}
          required
          className="input"
          sx={{
            input: {
              color: 'white',
              fontFamily: 'Montserrat, sans-serif',
            },
            '& label.Mui-focused': {
              color: 'white',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white',
              },
            },
          }}
        />
        <Button onClick={addNewTask} className="add-btn" variant="outlined">Add</Button>
      </div>

      <h4>Task Todo</h4>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editId === todo.id ? (
              <>
                <TextField
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  size="small"
                  sx={{ input: { color: 'white' }, width: '200px', marginRight: '10px' }}
                />
                {/* Save Button */}
                <IconButton onClick={saveEdit}><SaveIcon color="primary" /></IconButton>
              </>
            ) : (
              <>
                <span style={todo.isDone ? { textDecorationLine: "line-through" } : {}}>
                  {todo.task}
                </span>&nbsp;&nbsp;

                {/* edit button */}
                <IconButton onClick={() => startEditing(todo.id, todo.task)} sx={{
                  '&:hover': {
                    backgroundColor: '#ffe2c4',
                  },
                }}
                ><EditTwoToneIcon sx={{ color: '#FFA500' }} /></IconButton>
                {/* delete button */}
                <IconButton onClick={() => deleteTodo(todo.id)} sx={{
                  '&:hover': {
                    backgroundColor: '#ffcccc',
                  },
                }}
                ><DeleteOutlineOutlinedIcon color="error" /></IconButton>
                  {/* Task done button */}
                <IconButton onClick={() => markAsDone(todo.id)} sx={{
                  '&:hover': {
                    backgroundColor: '#c2f7be',
                  },
                }}
                ><TaskAltIcon color="success" /></IconButton>
              </>
            )}
          </li>
        ))}
      </ul>
      <Button variant="contained" color="success" className="markAllDone" onClick={markAllAsDone}>Mark All As done</Button>
    </div>
  );
}

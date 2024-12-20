import React, { useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]); 
  const [newTodo, setNewTodo] = useState(""); 
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null); 

  const handleAddTodo = () => {
    if (!newTodo) return; 

    setTodos([...todos, { text: newTodo, completed: false }]); 
    setNewTodo(""); 
  };

  const handleToggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos); 
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index); 
    setTodos(updatedTodos);
  };

  const handleEditTodo = (index) => {
    setIsEditing(true); 
    setCurrentTodo({ index, text: todos[index].text }); 
    setNewTodo(todos[index].text); 
  };

  const handleSaveTodo = () => {
    const updatedTodos = todos.map((todo, i) =>
      i === currentTodo.index ? { ...todo, text: newTodo } : todo
    );
    setTodos(updatedTodos);
    setIsEditing(false);
    setNewTodo("");
  };

  return (
    <div className="todo-container">
      <h2>Todo List</h2>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)} 
        placeholder="Nội dung công việc"
      />
      <button onClick={isEditing ? handleSaveTodo : handleAddTodo}>
        {isEditing ? "Lưu" : "Thêm"}
      </button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(index)}
            />
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </span>
            <button className="edit" onClick={() => handleEditTodo(index)}>
              Chỉnh sửa
            </button>
            <button className="delete" onClick={() => handleDeleteTodo(index)}>
              Xóa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

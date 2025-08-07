
import React, { useState } from 'react';
import { useTodos } from './TodoContext';

const TodoApp = () => {
  const { todos, addTodo, updateTodo, deleteTodo, toggleComplete } = useTodos();

  const [form, setForm] = useState({ title: '', description: '', priority: 'medium' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateTodo(editId, form);
      setIsEditing(false);
    } else {
      addTodo(form);
    }
    setForm({ title: '', description: '', priority: 'medium' });
  };

  const handleEdit = (todo) => {
    setForm({ title: todo.title, description: todo.description, priority: todo.priority });
    setIsEditing(true);
    setEditId(todo.id);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#f5f5f5',
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          width: '100%',
          background: '#fff',
          padding: '2rem',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}
      >
        <h2 style={{ textAlign: 'center' }}>📝 To-Do List</h2>
        <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
          />
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
          >
            <option value="high">High 🔴</option>
            <option value="medium">Medium 🟡</option>
            <option value="low">Low 🟢</option>
          </select>
          <button type="submit" style={{ width: '100%', padding: '0.5rem' }}>
            {isEditing ? 'Update Task' : 'Add Task'}
          </button>
        </form>

        <ul style={{ listStyle: 'none', padding: 0 }}>
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                border: '1px solid #ccc',
                marginBottom: '10px',
                padding: '10px',
                borderRadius: '5px',
              }}
            >
              <h3
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  marginBottom: '0.5rem',
                }}
              >
                {todo.title} ({todo.priority})
              </h3>
              <p style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.description}
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button onClick={() => toggleComplete(todo.id)}>
                  {todo.completed ? 'Undo' : 'Mark Completed'}
                </button>
                <button onClick={() => handleEdit(todo)}>Edit</button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;

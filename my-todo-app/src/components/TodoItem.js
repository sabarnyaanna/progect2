import React, { useState } from 'react';

function TodoItem({ task, onDelete, onEdit, onToggle }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.title);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(task.id, editText.trim());
      setIsEditing(false);
    }
  };

  // Плавне видалення: спочатку запускаємо анімацію, потім видаляємо зі стану
  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(task.id);
    }, 300); // 300ms відповідає тривалості CSS-анімації
  };

  return (
    <li className={`task-item ${isDeleting ? 'removing' : ''}`}>
      <input
        type="checkbox"
        className="custom-checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />

      {isEditing ? (
        <>
          <input
            type="text"
            className="edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button className="action-btn" onClick={handleSave}>Зберегти</button>
          <button className="action-btn" onClick={() => setIsEditing(false)}>Скасувати</button>
        </>
      ) : (
        <>
          <span className={`task-text ${task.completed ? 'completed' : ''}`}>
            {task.title}
          </span>
          <button className="action-btn" onClick={() => setIsEditing(true)}>✎</button>
          <button className="action-btn delete" onClick={handleDelete}>✕</button>
        </>
      )}
    </li>
  );
}

export default TodoItem;
import React, { useState } from 'react';

function UpdateList({ onAddTask }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      onAddTask(value.trim());
      setValue('');
    }
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="add-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Додати нову таску..."
      />
      <button type="submit" className="btn-add">
        + Додати
      </button>
    </form>
  );
}

export default UpdateList;
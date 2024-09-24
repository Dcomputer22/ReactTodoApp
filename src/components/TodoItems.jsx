import React from 'react';
import check from '../assets/check.svg';
import not_checked from '../assets/not-checked.svg';
import delete_icon from '../assets/delete.svg';

const TodoItems = ({ text, id, isComplete, deleteTodo, toggle }) => {
  return (
    <div className="flex items-center my-4 mx-2">
      <div
        onClick={() => {
          toggle(id);
        }}
        className="flex flex-1 items-center gap-3 cursor-pointer"
      >
        <img className="w-10" src={isComplete ? check : not_checked} alt="" />
        <p
          className={`font-medium text-white text-2xl decoration-solid decoration-2 decoration-red-700
          ${isComplete ? 'line-through' : ''}`}
        >
          {text}
        </p>
      </div>
      <img
        onClick={() => {
          deleteTodo(id);
        }}
        className="w-10 cursor-pointer"
        src={delete_icon}
        alt=""
      />
    </div>
  );
};

export default TodoItems;

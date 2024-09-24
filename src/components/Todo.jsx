import React, { useEffect, useRef, useState } from 'react';
import TodoItems from './TodoItems';
import todo_icon from '../assets/todo.svg';

const Todo = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem('todos')
      ? JSON.parse(localStorage.getItem('todos'))
      : []
  );
  const inputRef = useRef();
  const addTodo = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === '') {
      return null;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };
    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = '';
  };
  const deleteTodo = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };
  const toggle = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="flex flex-col w-11/12 max-w-lg place-self-center bg-stone-800 min-h-[600px] rounded-lg">
      {/* Title */}
      <div className="flex gap-2 mt-6 items-center justify-center">
        <img className="w-10" src={todo_icon} alt="todo-icon" />
        <h1 className="text-4xl text-white font-bold">Todo List App</h1>
      </div>
      {/* Input box */}
      <div className="flex items-center bg-orange-200 mt-12 mb-8 mx-4 rounded-full">
        <input
          ref={inputRef}
          className="bg-transparent border-none outline-none h-14 pl-14 pr-4 text-xl font-medium placeholder:text-stone-600 flex-1"
          type="text"
          placeholder="Enter task"
        />
        <button
          onClick={addTodo}
          className="bg-red-800 text-white w-32 h-14 rounded-r-full border-none font-medium text-xl hover:bg-red-900"
        >
          Add Task +
        </button>
      </div>
      {/* Todo list */}
      {todoList.map((item, index) => {
        return (
          <TodoItems
            key={index}
            text={item.text}
            id={item.id}
            isComplete={item.isComplete}
            deleteTodo={deleteTodo}
            toggle={toggle}
          />
        );
      })}
    </div>
  );
};

export default Todo;

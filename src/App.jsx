import React, { useState } from 'react';
import './App.less';
import AddTodo from './components/addTodo';
import MyModal from './components/myModal/myModal';
import TodoList from './components/todoList';
import Context from './context';

function App() {
  const [todos, setTodos] = useState([])
  const [visibleModal, setVisibleModal] = useState(false)

  function addTodo (todo) {
    setTodos([...todos, todo])
  }

  const changeTodo = {

    removeTodo: (id) => {
     setTodos(todos.filter(todo => todo.id !== id))
    },

    toggleTodo: (id) => {
      setTodos(todos.map(todo => {
         if (todo.id === id) {todo.active = !todo.active}
         return todo
        })
      )
    },

    addFixedTodo: (fixedTodo) => {
      setTodos(todos.map(todo => {
        if (todo.id === fixedTodo.id) {return fixedTodo}
        return todo
       })
     )
    }
  }

  return (
    <Context.Provider value={changeTodo}>
      <main>
        <h1 className='title'>todo list</h1>
        <button onClick={() => setVisibleModal(true)} className='btn_add' >Add todo</button>
        <MyModal visible={visibleModal} setVisible={setVisibleModal}>
          <AddTodo addNewTodo={addTodo} setVisibleModal={setVisibleModal}/>
        </MyModal>
          {todos.length ?
            <TodoList todos={todos}/>
            :
            <h2 className='amptyTodo'>no todos</h2>
          }
      </main>
    </Context.Provider>
  );
}

export default App;

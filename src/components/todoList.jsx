import React from "react";
import TodoItem from "./todoItem";
import style from './todo.module.less'

const TodoList = ({todos}) => {
    return (
        <div className={style.list}>
          {todos.map(todo => {
            return <TodoItem todo={todo}/>
          })}
      </div>
    )
}

export default TodoList
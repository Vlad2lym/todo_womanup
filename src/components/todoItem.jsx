import React, { useContext, useEffect, useState } from "react";
import Context from "../context";
import style from './todo.module.less'
import * as dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime.js'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js'
import MyModal from "./myModal/myModal";
import FixTodo from "./fixTodo";
dayjs.extend(relativeTime)
dayjs.extend(isSameOrAfter)

const TodoItem = ({todo}) => {
    const {removeTodo, toggleTodo, addFixedTodo} = useContext(Context)
    const rootClasses = [style.todoTitle]
    const missedDeadlineClasses = [style.item]
    const [showDescription, setShowDescription] = useState(false)
    const [time, setTime] = useState(dayjs().format('HH:mm:ss DD MMMM YYYY'))
    const [visibleModal, setVisibleModal] = useState(false)

    useEffect(() => {
        let interval = setInterval(() => {
            setTime(dayjs().format('HH:mm:ss DD MMMM YYYY'))
        }, 1000)
        return () => {
            clearInterval(interval)}
    }, [])

    if (!todo.active) {
        rootClasses.push(style.done)
        missedDeadlineClasses.push(style.done)
    }
    if (dayjs(time).isSameOrAfter(dayjs(todo.date))) {
        missedDeadlineClasses.push(style.missedDeadline)
    }

    return(
        <div className={missedDeadlineClasses.join(' ')}>
            <MyModal visible={visibleModal} setVisible={setVisibleModal}>
                <FixTodo todo={todo} setVisibleFixModal={setVisibleModal} addFixedTodo={addFixedTodo}/>
            </MyModal>
            <span className={style.headerTodo}>
                <input 
                    type='checkbox' 
                    checked={!todo.active}
                    onChange={() => toggleTodo(todo.id)}
                />
                <h2 className={rootClasses.join(' ')}>{todo.title}</h2>
                {todo.date ?
                    dayjs(time).isSameOrAfter(dayjs(todo.date)) && todo.active ?
                    <h2>missed deadline</h2>
                    :
                    <h3>{dayjs(todo.date).format('HH:mm DD MMMM YYYY')}</h3>
                :
                    <h3 style={{minWidth: '98px', margin: '5px'}}>no deadline</h3>
                }
                <div className={style.title_btns}>
                    <button onClick={()=> removeTodo(todo.id)} className={style.btn_removeTodo}>&times;</button>
                    <button onClick={() => setVisibleModal(true)} className={style.btn_fixTodo}>fix</button>
                </div>
            </span>
            <div className={style.descriptionAndFiles}>
                {(todo.description || todo.file.length) ?
                showDescription ? 
                    <span>
                        <h3>{todo.description}</h3>
                        {todo.date ? <h3 style={{color: 'green'}}>deadline {dayjs(todo.date).from(time)}</h3> : undefined}
                        {todo.file.length ?
                        todo.file.map((file => {
                            return <img src={file.url} alt='file' width='200px'/>
                        }))
                        :
                        undefined
                        }
                        <h4 
                            onClick={() => setShowDescription(false)} 
                            style={{cursor: 'pointer', marginBottom: '10px'}}
                            >hide description and files
                        </h4>
                    </span>
                    :
                    <h4 
                        onClick={() => setShowDescription(true)} 
                        style={{cursor: 'pointer', marginBottom: '10px'}}
                        >show description and files
                    </h4>
                :
                undefined
                }
            </div>
        </div>
    )
}

export default TodoItem
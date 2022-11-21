import React, { useState } from "react";
import styles from './addTodo.module.less'

const FixTodo = ({addFixedTodo, setVisibleFixModal, todo}) => {
    const [titleTodo, setTitleTodo] = useState(todo.title)
    const [descriptionTodo, setDescriptionTodo] = useState(todo.description)
    const [date, setDate] = useState(todo.date)
    const [files, setFiles] = useState(todo.file)

    const handleOnChange = (e) => {
        e.preventDefault()
        if (e.target.files && e.target.files.length) {
            setFiles([...files, {id: Date.now(), file: e.target.files[0], url: URL.createObjectURL(e.target.files[0])}]);
            console.log(e.target.files[0])
        }
    }

    const removeFile = (id) => {
        setFiles(files.filter(file => file.id !== id))
    }

    const addFixedTodoButton = (e) => {
        e.preventDefault()
        if (titleTodo.trim()) {
            const fixedTodo = {
                id: todo.id,
                title: titleTodo,
                description: descriptionTodo,
                date: date,
                file: files,
                active: todo.active
            }
            addFixedTodo(fixedTodo)
            setVisibleFixModal(false)
        }
    }

    return (
        <div>
            <form className={styles.form}>
                <input type='text' placeholder=' What needs to be done?' onChange={e => setTitleTodo(e.target.value)} value={titleTodo}></input>
                <input type='text' placeholder=' Description' onChange={e => setDescriptionTodo(e.target.value)} value={descriptionTodo}></input>
                <div className={styles.dateAndFiles}>
                    <input type='datetime-local' onChange={e => setDate(e.target.value)} value={`${date}`}></input>
                    <input type='file' onChange={e => handleOnChange(e)}></input>
                </div>
                {files.length ?
                <div className={styles.imgs}>
                    {files.map((file => {
                        return <div key={file.id}>
                            <img src={file.url} alt='file' width='200px'/>
                            <button onClick={() => removeFile(file.id)}>remove file</button>
                        </div>
                    }))}
                </div>
                :
                undefined
                }
                <button onClick={e => addFixedTodoButton(e)} className={styles.btnAdd}>Fix todo</button>
            </form>
        </div>
    )
}

export default FixTodo
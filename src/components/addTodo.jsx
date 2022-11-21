import React, { useState } from "react";
import styles from './addTodo.module.less'

const AddTodo = ({addNewTodo, setVisibleModal}) => {
    const [titleTodo, setTitleTodo] = useState('')
    const [descriptionTodo, setDescriptionTodo] = useState('')
    const [date, setDate] = useState('')
    const [files, setFiles] = useState([])

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

    const addTodoButton = (e) => {
        e.preventDefault()
        if (titleTodo.trim()) {
            const todo = {
                id: Date.now(),
                title: titleTodo,
                description: descriptionTodo,
                date: date,
                file: files,
                active: true
            }
            addNewTodo(todo)
            setVisibleModal(false)
            setTitleTodo('')
            setDescriptionTodo('')
            setDate('')
            setFiles([])
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
                <button onClick={e => addTodoButton(e)} className={styles.btnAdd}>Add todo</button>
            </form>
        </div>
    )
}

export default AddTodo
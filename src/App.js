import { useState } from 'react'
import { todoData } from './todoData'
import './app.css'
import AddAndEdit from './AddAndEdit.js'

import { v4 as uuidv4 } from 'uuid'

import menuImg from './menu-dots.png'
import girl from './girl.png'

function App() {
    const [state, setState] = useState(todoData)
    const [add, setAdd] = useState(false)
    const [edit, setEdit] = useState(false)
    const [remove, setRemove] = useState(false)
    const [editData, setEditData] = useState()
    const [filter, setFilter] = useState(filterColors)

    const deleteIt = (id) => {
        setState(state.filter((item) => item.id !== id))
        console.log(state)
    }

    const menuHandler = (id) => {
        setState(state.map((item) => (item.id === id ? { ...item, menu: !item.menu } : item)))
    }

    const setDone = (id) => {
        setState(
            state.map((item) => (item.id === id ? { ...item, finished: !item.finished } : item)),
        )
    }

    const hideDone = () => {
        setRemove(!remove)
    }

    const filterHandler = (color) => {
        setFilter({ ...filterColors, [color]: !filter[color] })
        console.log(filter)
    }

    const addBlock = () => {
        setAdd(!add)
    }

    const cancelAdd = () => {
        setAdd(false)
        setEdit(false)
    }

    const addForm = (item) => {
        if (item.title === '' || item.text === '') return
        const newItem = {
            title: item.title,
            text: item.text,
            purple: item.purple,
            blue: item.blue,
            red: item.red,
            green: item.green,
            finished: item.finished,
            id: uuidv4(),
        }

        setAdd(!add)
        const newArr = [...state, newItem]
        setState(newArr)
    }

    const editBlock = (data) => {
        setEdit(!edit)
        setEditData(data)
    }

    const editForm = (item) => {
        if (item.title === '' || item.text === '') return
        setEdit(!edit)

        let arr = state.map((obj) => {
            if (obj.id === item.id) {
                return item
            } else {
                return obj
            }
        })
        setState(arr)
    }

    return (
        <div className="todo">
            <div className="container">
                <div className="todo_header">
                    <div className="todo_logo">todo</div>
                    <button className="todo_icon" onClick={addBlock}>
                        +
                    </button>
                </div>
                <div className="todo_body">
                    <div className="todo_filter">
                        <ul className="todo_colors">
                            <li className="todo_list">
                                <button
                                    className={`button_${filter.purple}`}
                                    onClick={() => filterHandler('purple')}
                                >
                                    <div className="purple colors"></div>
                                    <p>work</p>
                                </button>
                            </li>
                            <li className="todo_list">
                                <button
                                    className={`button_${filter.blue}`}
                                    onClick={() => filterHandler('blue')}
                                >
                                    <div className="blue colors"></div>
                                    <p>study</p>
                                </button>
                            </li>
                            <li className="todo_list">
                                <button
                                    className={`button_${filter.red}`}
                                    onClick={() => filterHandler('red')}
                                >
                                    <div className="red colors"></div>
                                    <p>entertainment</p>
                                </button>
                            </li>
                            <li className="todo_list">
                                <button
                                    className={`button_${filter.green}`}
                                    onClick={() => filterHandler('green')}
                                >
                                    <div className="green colors"></div>
                                    <p>family</p>
                                </button>
                            </li>
                        </ul>
                        <form className="hide_done">
                            <input
                                type="checkbox"
                                className="hide_done"
                                name="hide"
                                onChange={hideDone}
                            ></input>
                            <label htmlFor="hide" className="hide_done">
                                Hide Done Tasks
                            </label>
                        </form>
                    </div>
                    <div className="todo_content">
                        {state.map((data, key) => {
                            return (
                                <div
                                    key={key}
                                    className={`todo_block ${
                                        data.finished === true && remove ? false : ''
                                    } 
                                    ${data.purple === false && filter.purple ? false :''}
                                    ${data.green === false && filter.green ? false : ''}
                                    ${data.red === false && filter.red ? false : ''}
                                    ${data.blue === false && filter.blue ? false : ''}`}
                                >
                                    <div className="top">
                                        <div className="title">
                                            {data.finished === false ? (
                                                <p className="unFinished">{data.title}</p>
                                            ) : (
                                                <del className="finished">{data.title}</del>
                                            )}
                                        </div>
                                        <button
                                            className="menu"
                                            onClick={() => menuHandler(data.id)}
                                        >
                                            <img src={menuImg} alt="img"></img>
                                        </button>
                                        {data.menu ? (
                                            <div className="todo_change">
                                                <button
                                                    className="button_edit"
                                                    onClick={() => editBlock(data)}
                                                >
                                                    Edit...
                                                </button>
                                                <hr />
                                                <button
                                                    className="button_delete"
                                                    onClick={() => deleteIt(data.id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="text">
                                        {data.finished === false ? (
                                            <p className="unFinished">{data.text}</p>
                                        ) : (
                                            <del className="finished">{data.text}</del>
                                        )}
                                    </div>
                                    <div className="bottom">
                                        <div className="bottom_tags">
                                            <div className={`blue colors ${data.blue}`}></div>
                                            <div className={`red colors ${data.red}`}></div>
                                            <div className={`purple colors ${data.purple}`}></div>
                                            <div className={`green colors ${data.green}`}></div>
                                        </div>
                                        <form className="checkbox">
                                            <input
                                                type="checkbox"
                                                name="done"
                                                onChange={() => setDone(data.id)}
                                            ></input>
                                            <label htmlFor="done">Done</label>
                                        </form>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="girl">
                    <img src={girl} alt="" />
                </div>
                {add ? (
                    <AddAndEdit addForm={addForm} cancelAdd={cancelAdd} condition={true} />
                ) : null}
                {edit ? (
                    <AddAndEdit
                        props={editData}
                        editForm={editForm}
                        cancelAdd={cancelAdd}
                        condition={false}
                    />
                ) : null}
            </div>
        </div>
    )
}
export default App

const filterColors = { purple: false, red: false, green: false, blue: false }

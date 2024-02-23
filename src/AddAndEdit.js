import { useState } from 'react'
import './add.css'

const AddAndEdit = ({ addForm, cancelAdd, editForm, props, condition }) => {
    const [state, setState] = useState(
        condition
            ? {
                  title: '',
                  text: '',
                  purple: false,
                  red: false,
                  blue: false,
                  green: false,
                  finished: false,
              }
            : props,
    )

    const changeHandler = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const addFormHandler = (e) => {
        e.preventDefault()
        const data = {
            title: state.title,
            text: state.text,
            purple: state.purple,
            red: state.red,
            blue: state.blue,
            green: state.green,
            finished: state.finished,
        }
        addForm(data)
        setState({
            title: '',
            text: '',
            purple: false,
            red: false,
            blue: false,
            green: false,
            finished: false,
        })
    }

    const editFormHandler = (e) => {
        e.preventDefault()
        const data = {
            title: state.title,
            text: state.text,
            purple: state.purple,
            red: state.red,
            blue: state.blue,
            green: state.green,
            id: state.id,
            finished: state.finished,
        }
        editForm(data)
    }
    

    const blueColor = () => {
        setState({ ...state, blue: !state.blue })
    }
    const redColor = () => {
        setState({ ...state, red: !state.red })
    }
    const greenColor = () => {
        setState({ ...state, green: !state.green })
    }
    const purpleColor = () => {
        setState({ ...state, purple: !state.purple })
    }

    return (
        <div className="add_body">
            <div className="add_container">
                <div className="add_buttons">
                    <button className="cancel_button" onClick={cancelAdd}>
                        Cancel
                    </button>
                    {condition ? (
                        <button className="add_button" onClick={addFormHandler}>
                            Add
                        </button>
                    ) : (
                        <button className="add_button" onClick={editFormHandler}>
                            Edit
                        </button>
                    )}
                </div>
                <form className="add_block">
                    <label htmlFor="text" className="add_title">
                        Title
                    </label>{' '}
                    <input
                        type="text"
                        className="input_title"
                        name="title"
                        value={state.title}
                        placeholder="add a title"
                        onChange={changeHandler}
                    />
                </form>
                <form className="add_block">
                    <label htmlFor="text" className="add_title">
                        Description
                    </label>{' '}
                    {/* <input
                            type="text"
                            className="description"
                            name="text"
                            // value={state.text}
                            placeholder="add a description"
                            // onChange={changeHandler}
                        /> */}
                    <textarea
                        name="text"
                        rows="6"
                        className="input_title"
                        placeholder="add a description"
                        value={state.text}
                        onChange={changeHandler}
                    ></textarea>
                </form>
                <div className="add_block">
                    <div className="add_title">Tags</div>
                    <ul className="add_tags">
                        <li className={`input_${state.purple}`}>
                            <button onClick={purpleColor}>
                                <div className="purple colors"></div>
                                <p>work</p>
                            </button>
                        </li>
                        <li className={`input_${state.blue}`}>
                            <button onClick={blueColor}>
                                <div className="blue colors"></div>
                                <p>study</p>
                            </button>
                        </li>
                        <li className={`input_${state.red}`}>
                            <button onClick={redColor}>
                                <div className="red colors"></div>
                                <p>entertainment</p>
                            </button>
                        </li>
                        <li className={`input_${state.green}`}>
                            <button onClick={greenColor}>
                                <div className="green colors"></div>
                                <p>family</p>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AddAndEdit

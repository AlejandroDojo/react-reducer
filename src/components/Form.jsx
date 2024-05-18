
import { useState, useReducer } from 'react';
import styles from "./Form.module.css";



const emailHandler = (value) => {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) ? true : false
}
const nameHandler = (value) => {
    let letters = /^[A-Za-z]+$/;
    return (value.match(letters)) ? true : false
}
const reducer = (state, action) => {
    return {
        ...state,
        [action.type]: {
            error: action.error,
            value: action.payload,
        }
    };
}
const initialState ={
    firstName: {
        value: '',
        error: null
    },
    lastName: {
        value: '',
        error: null
    },
    email: {
        value: '',
        error: null
    }
};

const Form = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {firstName, lastName, email} = state;

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({
            type: name,
            payload: value,
            error: null
        });
        (name === "email")
        ? (emailHandler(value) != true) 
            ? dispatch({
                type: name,
                payload: value,
                error: true
            })
            : ""
        : (nameHandler(value) != true)
            ? dispatch({
                type: name,
                payload: value,
                error: true
            })
            : "";
    }


    const submitHanlder = (e) => {
        e.preventDefault();
    }
    //{ (firstName.value != '') ? ((nameHandler(firstName.value) === true) ) ? "" : <p>ERROR</p> : ""}
    return (
        <div>
            {JSON.stringify(state)}
            <form onSubmit={submitHanlder}>
                <div>
                    <label>
                        <span>First Name:</span>{' '}
                        {
                            (firstName.error != true) 
                                ?  
                                    <input
                                    name="firstName"
                                    defaultValue={firstName.value}
                                    onChange={handleChange}
                                    className={styles.null}
                                    />
                                : 
                                    <input
                                        name="firstName"
                                        defaultValue={firstName.value}
                                        onChange={handleChange}
                                        className={styles.error}
                                    />
                        }
                    </label>
                    
                </div>
                <div>
                    <label>
                        <span>Last Name:</span>{' '}
                        {
                            (lastName.error != true)
                            ? 
                                <input
                                    name="lastName"
                                    defaultValue={lastName.value}
                                    onChange={handleChange}
                                    className={styles.null}
                                />
                            : 
                                <input
                                name="lastName"
                                defaultValue={lastName.value}
                                onChange={handleChange}
                                className={styles.error}
                                />
                        }
                    </label>
                </div>
                <div>
                    <label>
                        <span>Email:</span>{' '}
                        { (email.error != true) 
                            ? 
                                <input
                                    name="email"
                                    defaultValue={email.value}
                                    onChange={handleChange}
                                    className={styles.null}
                                />
                            : 
                                <input
                                    name="email"
                                    defaultValue={email.value}
                                    onChange={handleChange}
                                    className={styles.error}
                                />
                        
                        }
                    </label>
                    
                </div>
                <button>Enviar</button>
            </form>

        </div>
    );
};

export default Form;
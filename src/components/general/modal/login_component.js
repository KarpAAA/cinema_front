

import React, {useState} from 'react';

export const LoginComponent = ({closeModelWindow, event, submitName}) => {

    const [userLoginInfo, setUserLoginInfo] = useState({
        login: "",
        password: ""
    })

    const handleInputFieldChange = (field) => (e) => {
        setUserLoginInfo(prevState => {
            const newState = {...prevState};
            newState[field] = e.target.value;
            return newState;
        })
    }

    const loginFormSubmit = (e) => {
        e.preventDefault();
        event(userLoginInfo);
        closeModelWindow();
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Welcome to Film fusion</h2>
            <form style={styles.form} onSubmit={loginFormSubmit}>
                <input type="text" onChange={handleInputFieldChange('login')} placeholder="Email" style={styles.input} value={userLoginInfo.login}/>
                <input type="password" onChange={handleInputFieldChange('password')} placeholder="Password" style={styles.input} value={userLoginInfo.password}/>
                <button type="submit" style={styles.button}>{submitName}</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#333',
        color: '#fff',
        borderRadius: '8px',
        width: '300px',
        textAlign: 'center',
    },
    title: {
        marginBottom: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '20px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    button: {
        marginBottom: '10px',
        width: '300px',
        padding: '10px',
        borderRadius: '15px',
        border: '1px solid white',
        backgroundColor: '#333',
        color: '#fff',
        cursor: 'pointer',
    },
};

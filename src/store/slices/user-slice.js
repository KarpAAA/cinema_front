import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    isLoggedIn: false,
    token: null,
    user: {
        city: '',
        email: '',
        phone: '',
        name: '',
        birthdate: ''
    },
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo(state, action){
            state.user = action.payload;
        },
        userLogIn(state) {
            state.isLoggedIn = true;
        },
        userLogOut(state) {
            state.isLoggedIn = false;
            state.token = '';
            localStorage.removeItem('user_token');
        },
        changeUserState(state, action) {
            const {field, value} = action.payload;
            state.user[field] = value;
        },
        userSetToken(state, action) {
            state.token = action.payload;
        }
    },
})

const verifyToken = async (dispatch, token) => {
    const res = await fetch('http://localhost:3000/auth/verify', {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${token}`
        },
    });
    const data = await res.json();
    const {iat,exp, ...userData} = data;
    if(data.email){
        dispatch(userActions.setUserInfo(userData));
        return true;
    }
    return false;
}

export const saveUserData = (userData) => {
    console.log(userData);
    return async () => {
        await fetch(`http://localhost:3000/users/${userData.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
    }
}
export const logInBackend = (loginData) => {
    return async (dispatch) => {
        const token = localStorage.getItem('user_token');
        if (token) {
            if (await verifyToken(dispatch, token)) {
                dispatch(userActions.userSetToken(token));
                dispatch(userActions.userLogIn(true));
                return;
            }
        }

        if (!loginData) return;
        const {login, password} = loginData;

        const res = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({login, password})
        });
        const data = await res.json();

        if (data["access_token"]) {
            localStorage.setItem("user_token", data["access_token"]);
            const token = localStorage.getItem('user_token');
            dispatch(userActions.userSetToken(token));
            dispatch(userActions.userLogIn(true));
        }
        if(data.user){
            dispatch(userActions.setUserInfo(data.user));
        }
    }
}
export const signUpBackend = (signUpData) => {
    return async (dispatcher) => {
        const {login, password} = signUpData;
        const res = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({login, password})
        });
        const data = await res.json();

    }
}

export const userActions = userSlice.actions;
export default userSlice.reducer;
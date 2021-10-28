import React, { useReducer } from 'react';
import Context from './context'
//reducer
import reducer, { initialState } from '../reducers/reducer'
//auth
export default function contextProvider(props) {
    const [ state, dispatch ] = useReducer(reducer, initialState)

    const userData = data => {
        // fakeAuth.authenticate()
        dispatch( { type: 'USER', payload: data } )
    }
    
    const updateData = data => {
        // fakeAuth.authenticate()
        dispatch( { type: 'UPDATE', payload: data } )
    }
    
    const updatePic = data => {
        // fakeAuth.authenticate()
        dispatch( { type: 'UPDATE_PIC', payload: data } )
    }

    const clearAll = _ => {
        localStorage.clear()
        dispatch({ type: 'CLEAR_ALL' })
    }

    // console.log(prop, ' propsss')
    return (
        <Context.Provider value={{ state, dispatch, userData, updateData, updatePic, clearAll }}>
            { props.children }
        </Context.Provider>
    )
}
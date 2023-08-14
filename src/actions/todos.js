import {
    CREATE_TODO,
    RETRIEVE_TODO,
    UPDATE_TODO,
    DELETE_TODO
} from './types';

import TodoDataService from '../services/todo.service';


export const createTodo = (title, description) => async (dispatch) => {
    try {
        const res = await TodoDataService.create({title, description});

        dispatch({
            type: CREATE_TODO,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const retrieveTodo = () => async (dispatch) => {
    try {
        const res = await TodoDataService.getAll();

        dispatch({
            type: RETRIEVE_TODO,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const updateTodo = (id, data) => async (dispatch) => {
    try {
        const res = await TodoDataService.update(id, data);

        dispatch({
            type: UPDATE_TODO,
            payload: data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err)
    }
};

export const deleteTodo = (id) => async (dispatch) => {
    try {
        await TodoDataService.delete(id);
        
        dispatch({
            type: DELETE_TODO,
            payload: { id },
        });
    } catch (err) {
        console.log(err);
    }
};

export const findTodoByTitle = (title) => async (dispatch) => {
    try {
        const res = await TodoDataService.findByTitle(title);

        dispatch({
            type: RETRIEVE_TODO,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
    }
};
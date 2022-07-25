import * as actionTypes from './authType'
import axios from "axios";
import { url } from '../../utils/url'

export const register = (user) => async (dispatch) =>
{
    try
    {
        dispatch({ type: actionTypes.USER_REGISTER_REQUEST });

        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        const { data } = await axios.post(`${url}/user/register`, user, config);

        dispatch({ type: actionTypes.USER_REGISTER_SUCCESS, payload: data });

        dispatch({ type: actionTypes.USER_LOGIN_SUCCESS, payload: data });

        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error)
    {
        dispatch({
            type: actionTypes.USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const login = (email, password) => async (dispatch) =>
{
    try
    {
        dispatch({ type: actionTypes.USER_LOGIN_REQUEST });

        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        const { data } = await axios.post(
            `${url}/user/login`,
            { email, password },
            config
        );

        dispatch({ type: actionTypes.USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error)
    {
        dispatch({
            type: actionTypes.USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const logout = () => async (dispatch) =>
{
    localStorage.removeItem("userInfo");
    dispatch({ type: actionTypes.USER_LOGOUT });
};

export const updateProfile = (user) => async (dispatch, getState) =>
{
    try
    {
        dispatch({ type: actionTypes.USER_UPDATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(`${url}/user/profile`, user, config);

        dispatch({ type: actionTypes.USER_UPDATE_SUCCESS, payload: data });

        dispatch({ type: actionTypes.USER_LOGIN_SUCCESS, payload: data });

        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error)
    {
        dispatch({
            type: actionTypes.USER_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

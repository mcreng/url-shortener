import {UPDATE_URL_TABLE} from './types';

export const updateTable = () => dispatch => {
  dispatch({type: UPDATE_URL_TABLE, loading: true})
  fetch('/api/url').then(req => req.json()).then(data => dispatch({
                                                   type: UPDATE_URL_TABLE,
                                                   payload: data,
                                                   loading: false
                                                 }));
};

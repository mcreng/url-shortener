import {UPDATE_URL_TABLE} from '../actions/types';

const initialState = {
  url_list: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_URL_TABLE:
      return {...state, url_list: action.payload, loading: action.loading};
    default:
      return state;
  }
}

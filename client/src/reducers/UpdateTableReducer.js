import { UPDATE_URL_TABLE } from "../actions/types";

const initialState = {
  url_list: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_URL_TABLE:
      return {
        ...state,
        url_list: action.payload
      };
    default:
      return state;
  }
}

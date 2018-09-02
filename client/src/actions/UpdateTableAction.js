import { UPDATE_URL_TABLE } from "./types";

export const updateTable = () => dispatch => {
  fetch("/api/url")
    .then(req => req.json())
    .then(data =>
      dispatch({
        type: UPDATE_URL_TABLE,
        payload: data
      })
    );
};

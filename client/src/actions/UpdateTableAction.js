import { DELETE_URL_ENTRY, UPDATE_URL_TABLE } from "./types";

export const updateTable = () => dispatch => {
  dispatch({ type: UPDATE_URL_TABLE, loading: true });
  fetch("/api/url")
    .then(req => req.json())
    .then(data =>
      dispatch({
        type: UPDATE_URL_TABLE,
        payload: data,
        loading: false
      })
    );
};

export const deleteEntry = surl => async dispatch => {
  dispatch({ type: UPDATE_URL_TABLE, loading: true });
  await fetch("/api/url", {
    method: "DELETE",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ surl: surl })
  });
  fetch("/api/url")
    .then(req => req.json())
    .then(data =>
      dispatch({
        type: UPDATE_URL_TABLE,
        payload: data,
        loading: false
      })
    );
};

import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore } from "redux";
import { Provider } from "react-redux";
import app from "./config/Firebase";
import { API_URL } from "./config/API_URL";
import axios from "axios";

const initialState = {
  value: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "PLUS":
      return { ...state, value: state.value + 1 };
    case "MINUS":
      if (state.value > 0) {
        return { ...state, value: state.value - 1 };
      }
      return state;
    case "UPDATE_VALUE":
      return { ...state, value: action.payload };
    default:
      return state;
  }
};

const storeRedux = createStore(reducer);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={storeRedux}>
    <App />
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

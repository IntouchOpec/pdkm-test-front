import React from "react";
import ReactDOM from "react-dom";
import App from "./src/app"

import 'sweetalert2/src/sweetalert2.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import './public/assets/scss/main.scss';
const selector = document.querySelector("#app");

ReactDOM.render(<App />	, selector);

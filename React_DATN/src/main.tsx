import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store.ts";
import "../css/style.css";
import $ from 'jquery';
import '../css/bootstrap.min.css';
import "../css/detail.css";
import "../css/animate.css"
import "../css/bill.css"
import "../css/font-awesome.min.css"
import "../css/jquery-ui.css"
import "../css/main.css"
import "../css/magic.css"
import "../css/meanmenu.min.css"
import "../css/normalize.css"
import "../css/owl.carousel.css"
import "../css/owl.theme.css"
import "../css/owl.transitions.css"
import "../css/responsive.css"
import "./App.scss"
// show banner
import "../lib/css/nivo-slider.css"
import "../lib/css/preview.css"





ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <BrowserRouter>
    <Provider store={store}>
        <App />
    </Provider>
    </BrowserRouter>
);

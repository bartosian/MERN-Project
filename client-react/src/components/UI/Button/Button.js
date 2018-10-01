import React from "react";
import './Button.css';

const button = (props) => (
    <button
        id="btn-app"
        className={ ['btn btn-block btn-outline-primary', [props.btnType]].join(" ") }
        onClick={ props.clicked }
    >
        { props.children }
    </button>
);

export default button;
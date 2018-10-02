import React from "react";
import './Button.css';

const button = (props) => (
    <button
        disabled={ props.disabled }
        id="btn-app"
        className={ ['btn btn-block', `btn-${[props.btnType]}`].join(" ") }
        onClick={ props.clicked }
    >
        { props.children }
    </button>
);

export default button;
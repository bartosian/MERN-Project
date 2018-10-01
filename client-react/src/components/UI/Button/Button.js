import React from "react";

const button = (props) => (
    <button
        className={ ['btn btn-block btn-outline-primary', [props.btnType]].join(" ") }
        onClick={ props.clicked }
    >
        { props.children }
    </button>
);

export default button;
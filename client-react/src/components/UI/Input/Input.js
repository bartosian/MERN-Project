import React from 'react';
import './Input.css';

const input = (props) => {
    let inputElement = null;

    switch (props.elementType) {
        case ('input'):
            inputElement = <input id="user-input" className='form-control' { ...props.elementConfig } value={ props.value } onChange={ props.changed }/>;
            break;
        case ('select'):
            inputElement = (
                <select id="user-input" className='form-control'   value={ props.value } onChange={ props.changed }>
                    { props.elementConfig.options.map( option => (
                        <option value={ option.value } key={ option.value }>{ option.displayValue }</option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input id="user-input" className='form-control'  { ...props.elementConfig } value={ props.value } onChange={ props.changed }/>;
    }


    return (
        <div className='form-group'>
            <label className='label' id='user-label'>{props.label}</label>
            { inputElement }
        </div>
        )

};

export default input;
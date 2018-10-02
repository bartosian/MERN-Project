import React from 'react';
import './Input.css';

const input = (props) => {
    let inputElement = null;
    let inputClasses = ['form-control', 'input-user'];

    if(props.invalid && props.touched) {
        inputClasses.push('invalid');
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input  className={ inputClasses.join(' ') } { ...props.elementConfig } value={ props.value } onChange={ props.changed } required={ true }/>;
            break;
        case ('select'):
            inputElement = (
                <select  className={ inputClasses.join(' ') }   value={ props.value } onChange={ props.changed }>
                    { props.elementConfig.options.map( option => (
                        <option value={ option.value } key={ option.value }>{ option.displayValue }</option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input  className={ inputClasses.join(' ') }  { ...props.elementConfig } value={ props.value } onChange={ props.changed } required={ true }/>;
    }


    return (
        <div className='form-group'>
            <label id="user-label" className='label text-primary'>{props.label}</label>
            { inputElement }
        </div>
        )

};

export default input;
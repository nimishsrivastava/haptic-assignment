import React, {useRef} from 'react';

import './textInput.css';

const TextInput = (props) => {
    const {iconClass, onClickIcon, errorText} = props;
    const input = useRef('input');

    const onClick = () => onClickIcon && onClickIcon(input.current.value);

    return (
        <div className="input-container">
            <input ref={input} type="text" {...props}/>
            {iconClass && <span onClick={onClick}><i className={`fa ${iconClass} input-icon`}/></span>}
            <span className={`error-message ${errorText ? '' : 'hide-error'}`}>{errorText}</span>
        </div>
    );
};

export default TextInput;

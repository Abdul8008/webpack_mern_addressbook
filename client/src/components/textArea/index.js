import React from 'react';
import { Field } from 'formik';
import Prototype from 'prop-types';

const TextArea = props => {
    const { name, onPaste, type, autoComplete, placeholder, label, value, onChange, error, errorText, disabled, id, readOnly, inLine, percentage, maximum, minimum,isToggle,toggleIcon, hasStep } = props
    const onPastValue = (e) => {
        e.preventDefault();
        return false;
    }
    return (
        <Field name={name}>
            {({ field }) => (
                <div style={{ display: `${inLine ? 'flex' : ''}` }}>
                    <label htmlFor={id}>{label} </label>
                    <div className="input-group">
                        <textarea
                            readOnly={readOnly ? true : false}
                            className="form-control"
                            id={id}
                            min={ minimum ? 1 : null }
                            max={ maximum }
                            name={name}
                            step={ hasStep ? "any": "" }
                            type={type}
                            autoComplete={autoComplete}
                            placeholder={placeholder}
                            onPaste={onPaste && onPastValue}
                            value={value}
                            onChange={onChange}
                            disabled={disabled}
                            style={{ display: `${inLine ? '' : 'inline-block'}` }}
                            {...field} />

                        {percentage && <div className="input-group-append">
                            <span className="input-group-text"> &#37; </span>
                        </div>}
                        {isToggle && <span className="password-toggle">{toggleIcon}</span>
                        }
                    </div>

                    {error && <div><small  style={{ color: 'red' }} className="text-danger">{errorText}</small></div>}


                </div>
            )}
        </Field>
    );
}
TextArea.protoType = {
    name: Prototype.string.isRequired,
    type: Prototype.string.isRequired,
    placeholder: Prototype.string,
    label: Prototype.string.isRequired,
    id: Prototype.string.isRequired,
    value: Prototype.string.isRequired,
    errorText: Prototype.string,
    onChange: Prototype.func.isRequired,
    error: Prototype.bool,
    disabled: Prototype.bool
}
export default TextArea;
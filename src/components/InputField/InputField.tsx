import React from 'react';

import classnames from 'classnames';
import { ErrorMessage, Field, type FieldProps } from 'formik';

export interface InputFieldProps {
    label?: string;
    name: string;
    placeholder?: string;
    size?: 'lg' | 'sm';
    type?: 'text' | 'password' | 'email' | 'number' | 'url' | 'tel' | 'search';
    isDisabled?: boolean;
    isInvalid?: boolean;
    hideErrorMessage?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
    type = 'text',
    label,
    name,
    placeholder,
    size,
    isDisabled,
    isInvalid,
    hideErrorMessage = false
}) => {
    return (
        <Field name={name}>
            {({ field, form }: FieldProps) => {
                const disabled = isDisabled ?? Boolean(form.isSubmitting);

                const invalid = isInvalid ?? Boolean(form.touched[name] && form.errors[name]);

                return (
                    <div className="form-group">
                        {label && (
                            <label htmlFor={name} className="form-label">
                                {label}
                            </label>
                        )}
                        <input
                            {...field}
                            id={name}
                            type={type}
                            placeholder={placeholder}
                            className={classnames('form-control', {
                                'is-invalid': invalid,
                                [`form-control-${size}`]: size
                            })}
                            disabled={disabled}
                        />
                        {isInvalid && !hideErrorMessage && (
                            <div className="invalid-feedback">
                                <ErrorMessage name={name} />
                            </div>
                        )}
                    </div>
                );
            }}
        </Field>
    );
};

export default InputField;

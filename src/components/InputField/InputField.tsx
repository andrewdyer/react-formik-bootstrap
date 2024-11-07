import React from 'react';

import classnames from 'classnames';
import { ErrorMessage, Field, type FieldProps } from 'formik';

export interface InputFieldProps {
    label?: string;
    name: string;
    placeholder?: string;
    size?: 'lg' | 'sm';
    type?: 'text' | 'password' | 'email' | 'number' | 'url' | 'tel' | 'search';
}

const InputField: React.FC<InputFieldProps> = ({
    type = 'text',
    label,
    name,
    placeholder,
    size
}) => {
    return (
        <Field name={name}>
            {({ field, form }: FieldProps) => {
                const isDisabled = Boolean(form.isSubmitting);

                const isInvalid = Boolean(form.touched[name] && form.errors[name]);

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
                                'is-invalid': isInvalid,
                                [`form-control-${size}`]: size
                            })}
                            disabled={isDisabled}
                        />
                        {isInvalid && (
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

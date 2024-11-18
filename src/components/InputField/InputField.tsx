import React from 'react';

import classnames from 'classnames';
import { ErrorMessage, Field, type FieldProps } from 'formik';

type InputType =
    | 'text'
    | 'email'
    | 'file'
    | 'radio'
    | 'checkbox'
    | 'switch'
    | 'textarea'
    | 'button'
    | 'reset'
    | 'submit'
    | 'date'
    | 'datetime-local'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'range'
    | 'search'
    | 'tel'
    | 'url'
    | 'week'
    | 'password'
    | 'datetime'
    | 'time'
    | 'color';

type InputProps = {
    label?: string;
    name: string;
    placeholder?: string;
    size?: 'lg' | 'sm';
    isDisabled?: boolean;
    isInvalid?: boolean;
    hideErrorMessage?: boolean;
    addonBefore?: React.ReactNode;
    addonAfter?: React.ReactNode;
    helpText?: string;
};

type TextInputProps = InputProps & {
    type?: InputType;
    options?: never;
};

type SelectInputProps = InputProps & {
    type: 'select';
    options: Array<{ value: string; label: string }>;
};

export type InputFieldProps = TextInputProps | SelectInputProps;

const InputField: React.FC<InputFieldProps> = ({
    type = 'text',
    label,
    name,
    placeholder,
    size,
    isDisabled,
    isInvalid,
    hideErrorMessage = false,
    addonBefore,
    addonAfter,
    options,
    helpText
}) => {
    return (
        <Field name={name}>
            {({ field, form }: FieldProps) => {
                const disabled = isDisabled ?? Boolean(form.isSubmitting);

                const invalid = isInvalid ?? Boolean(form.touched[name] && form.errors[name]);

                const describedby = helpText ? `${name}-help-block` : undefined;

                const inputElement =
                    type === 'select' ? (
                        <select
                            {...field}
                            id={name}
                            aria-describedby={describedby}
                            className={classnames('form-select', {
                                'is-invalid': invalid,
                                [`form-select-${size}`]: size
                            })}
                            disabled={disabled}>
                            {placeholder && (
                                <option value="" disabled>
                                    {placeholder}
                                </option>
                            )}
                            {options?.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            {...field}
                            id={name}
                            type={type}
                            placeholder={placeholder}
                            aria-describedby={describedby}
                            className={classnames('form-control', {
                                'is-invalid': invalid,
                                [`form-control-${size}`]: size
                            })}
                            disabled={disabled}
                        />
                    );

                const renderAddon = (addon: React.ReactNode) =>
                    typeof addon === 'string' ? (
                        <span className="input-group-text">{addon}</span>
                    ) : (
                        addon
                    );

                return (
                    <div className="mb-3">
                        {label && (
                            <label htmlFor={name} className="form-label">
                                {label}
                            </label>
                        )}

                        {addonBefore || addonAfter ? (
                            <div
                                className={classnames('input-group', {
                                    [`input-group-${size}`]: size
                                })}>
                                {addonBefore && renderAddon(addonBefore)}
                                {inputElement}
                                {addonAfter && renderAddon(addonAfter)}
                            </div>
                        ) : (
                            inputElement
                        )}

                        {helpText && (
                            <div id={describedby} className="form-text">
                                {helpText}
                            </div>
                        )}

                        {!hideErrorMessage && invalid && (
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

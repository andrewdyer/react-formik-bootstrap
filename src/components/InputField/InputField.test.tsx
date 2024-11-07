import React from 'react';

import { render, screen } from '@testing-library/react';
import { Formik } from 'formik';

import InputField, { type InputFieldProps } from './InputField';

const renderInputField = (props: Partial<InputFieldProps> = {}) => {
    return render(
        <Formik initialValues={{ testField: '' }} onSubmit={jest.fn()}>
            {() => <InputField name="testField" {...props} />}
        </Formik>
    );
};

describe('InputField', () => {
    test('should render input with label', () => {
        renderInputField({ label: 'Test Label' });

        expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    });

    test('should render input without label', () => {
        renderInputField();

        expect(screen.queryByRole('textbox')).toBeInTheDocument();
    });

    test('should render input with placeholder', () => {
        renderInputField({ placeholder: 'Test Placeholder' });

        expect(screen.getByPlaceholderText('Test Placeholder')).toBeInTheDocument();
    });

    test('should have class form-control for input when size is not provided', () => {
        renderInputField();

        expect(screen.getByRole('textbox')).toHaveClass('form-control');
    });

    test('should have class form-control-sm for input when size is sm', () => {
        renderInputField({ size: 'sm' });

        expect(screen.getByRole('textbox')).toHaveClass('form-control-sm');
    });

    test('should have class form-control-lg for input when size is lg', () => {
        renderInputField({ size: 'lg' });

        expect(screen.getByRole('textbox')).toHaveClass('form-control-lg');
    });
});

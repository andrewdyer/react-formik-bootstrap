import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Formik } from 'formik';

import InputField, { type InputFieldProps } from './InputField';

const mockSubmit = jest.fn(async () => {
    await new Promise(r => setTimeout(r, 500));
});

const renderInputField = (props: Partial<InputFieldProps> = {}) => {
    return render(
        <Formik initialValues={{ testField: '' }} onSubmit={mockSubmit}>
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <InputField name="testField" {...props} />
                    <button type="submit">Submit</button>
                </form>
            )}
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

    test('should disable input when form is submitting', async () => {
        renderInputField({ label: 'Test Label' });

        expect(screen.getByRole('textbox')).not.toBeDisabled();

        await waitFor(() => {
            fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
        });

        expect(screen.getByRole('textbox')).toBeDisabled();
    });
});

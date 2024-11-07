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

    test('should disable input when isDisabled prop is true', () => {
        renderInputField({ isDisabled: true });
        expect(screen.getByRole('textbox')).toBeDisabled();
    });

    test('should mark input as invalid when isInvalid prop is true', () => {
        renderInputField({ isInvalid: true });
        expect(screen.getByRole('textbox')).toHaveClass('is-invalid');
    });

    test('should render addonBefore as InputGroupText when it is a string', () => {
        renderInputField({ addonBefore: '£' });

        const addonBefore = screen.getByText('£');

        expect(addonBefore).toBeInTheDocument();
        expect(addonBefore).toHaveClass('input-group-text');
    });

    test('should render addonAfter as InputGroupText when it is a string', () => {
        renderInputField({ addonAfter: '.00' });

        const addonAfter = screen.getByText('.00');

        expect(addonAfter).toBeInTheDocument();
        expect(addonAfter).toHaveClass('input-group-text');
    });

    test('should render addonBefore without InputGroupText wrapper when it is a JSX element', () => {
        renderInputField({ addonBefore: <button>Go</button> });

        const addonButton = screen.getByRole('button', { name: 'Go' });

        expect(addonButton).toBeInTheDocument();
        expect(addonButton).not.toHaveClass('input-group-text');
    });

    test('should render addonAfter without InputGroupText wrapper when it is a JSX element', () => {
        renderInputField({ addonAfter: <button>Search</button> });

        const addonButton = screen.getByRole('button', { name: 'Search' });

        expect(addonButton).toBeInTheDocument();
        expect(addonButton).not.toHaveClass('input-group-text');
    });
});

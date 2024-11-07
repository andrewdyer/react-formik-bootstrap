import React from 'react';

import { render, screen } from '@testing-library/react';
import { Formik } from 'formik';

import SelectField from './SelectField';

const mockSubmit = jest.fn(async () => {
    await new Promise(r => setTimeout(r, 500));
});

const renderSelectField = (inputField: React.ReactNode, initialValues = { testField: '' }) => {
    return render(
        <Formik initialValues={initialValues} onSubmit={mockSubmit}>
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    {inputField}
                    <button type="submit">Submit</button>
                </form>
            )}
        </Formik>
    );
};

describe('SelectField', () => {
    test('renders as select with options', () => {
        renderSelectField(
            <SelectField
                name="testField"
                label="Currency"
                options={[
                    { value: 'usd', label: 'USD' },
                    { value: 'eur', label: 'EUR' }
                ]}
            />
        );

        const select = screen.getByRole('combobox');

        expect(select).toBeInTheDocument();
        expect(screen.getByText('USD')).toBeInTheDocument();
        expect(screen.getByText('EUR')).toBeInTheDocument();
    });
});

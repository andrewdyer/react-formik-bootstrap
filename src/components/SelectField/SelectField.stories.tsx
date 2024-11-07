import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { Formik } from 'formik';

import SelectField from './SelectField';

const meta = {
    title: 'Components/SelectField',
    component: SelectField,
    decorators: [
        (Story: React.ComponentType) => (
            <Formik initialValues={{ testField: '' }} onSubmit={() => {}}>
                {() => <Story />}
            </Formik>
        )
    ],
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof SelectField>;

type Story = StoryObj<typeof meta>;

export const WithOptions: Story = {
    args: {
        label: 'Select Option',
        name: 'selectOption',
        options: [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' }
        ]
    }
};

export const WithAddonBoth: Story = {
    args: {
        label: 'Currency',
        name: 'currency',
        options: [
            { value: 'usd', label: 'USD' },
            { value: 'eur', label: 'EUR' },
            { value: 'gbp', label: 'GBP' }
        ],
        addonBefore: '$',
        addonAfter: 'per item'
    }
};

export default meta;

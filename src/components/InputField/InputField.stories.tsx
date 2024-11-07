import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { Formik } from 'formik';

import InputField from './InputField';

const meta = {
    title: 'Components/InputField',
    component: InputField,
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
    argTypes: {
        size: {
            control: { type: 'select', options: ['lg', 'sm', undefined] },
            description: 'Adjusts the size of the component',
            defaultValue: undefined
        }
    }
} satisfies Meta<typeof InputField>;

type Story = StoryObj<typeof meta>;

export const WithLabel: Story = {
    args: {
        label: 'Email',
        name: 'email',
        type: 'email',
        placeholder: 'Enter your email'
    }
};

export const WithoutLabel: Story = {
    args: {
        name: 'email',
        type: 'email',
        placeholder: 'Enter your email'
    }
};

export const WithHelpText: Story = {
    args: {
        label: 'Password',
        name: 'password',
        type: 'password',
        helpText: 'Your password must be 8-20 characters long.'
    }
};

export const isDisabled: Story = {
    args: {
        name: 'email',
        type: 'email',
        placeholder: 'Enter your email',
        isDisabled: true
    }
};
export const isInvalid: Story = {
    args: {
        name: 'email',
        type: 'email',
        placeholder: 'Enter your email',
        isInvalid: true
    }
};

export const WithAddonBeforeText: Story = {
    args: {
        label: 'Username',
        name: 'username',
        type: 'text',
        placeholder: 'Enter your username',
        addonBefore: '@'
    }
};

export const WithAddonAfterButton: Story = {
    args: {
        label: 'Search',
        name: 'search',
        type: 'text',
        placeholder: 'Enter search term',
        addonAfter: (
            <button type="button" className="btn btn-primary">
                Go
            </button>
        )
    }
};

export const WithAddonBoth: Story = {
    args: {
        label: 'Price',
        name: 'price',
        type: 'text',
        placeholder: 'Enter amount',
        addonBefore: '£',
        addonAfter: '.00'
    }
};

export const SelectWithOptions: Story = {
    args: {
        label: 'Select Option',
        name: 'selectOption',
        type: 'select',
        options: [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' }
        ]
    }
};

export const SelectWithAddonBoth: Story = {
    args: {
        label: 'Currency',
        name: 'currency',
        type: 'select',
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

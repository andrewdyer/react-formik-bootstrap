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

export default meta;

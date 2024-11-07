import React from 'react';

import { InputField } from '../InputField';

export interface SelectFieldProps
    extends Omit<React.ComponentProps<typeof InputField>, 'type' | 'options'> {
    options: { value: string; label: string }[];
}

const SelectField: React.FC<SelectFieldProps> = ({ options, ...props }) => {
    return <InputField {...props} type="select" options={options} />;
};

export default SelectField;

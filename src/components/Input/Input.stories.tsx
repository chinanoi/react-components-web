import React from 'react';
import { StoryObj, Meta } from '@storybook/react';
import Input from './Input';

const meta: Meta<typeof Input> = {
    title: 'Input',
    component: Input,
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {};

Default.storyName = '默认输入框样式';

export const InputWithSize = () => (
    <>
        <Input size="lg" />
        <Input />
        <Input size="sm" />
    </>
);

InputWithSize.storyName = '不同尺寸的输入框';


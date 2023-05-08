import React from 'react';
import { StoryObj, Meta } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
    title: 'Button',
    component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: {
        children: 'Default Button'
    },
};

Default.storyName = '默认按钮样式';

export const ButtonWithSize = () => (
    <>
        <Button size="lg"> large button </Button>
        <Button size="sm"> small button </Button>
    </>
);

ButtonWithSize.storyName = '不同尺寸的按钮';

export const ButtonWithType = () => (
    <>
        <Button buttonType="primary"> primary button </Button>
        <Button buttonType="danger"> danger button </Button>
        <Button buttonType="link" href="https://baidu.com"> link button </Button>
    </>
);

ButtonWithType.storyName = '不同类型的按钮';

import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import Menu from './Menu';
import MenuItem from "./MenuItem";
import SubMenu from "./SubMenu";

const MenuMeta: Meta<typeof Menu> = {
    title: 'Menu',
    component: Menu,
    id: 'Menu',
    args: {
        defaultIndex: '1'
    },
    argTypes: {
        defaultIndex: {
            control: 'color',
            description: 'normal test'
        }
    },
    parameters: {
        controls: {
            matchers: {
                date: /mode$/
            }
        }
    }
};
export default MenuMeta;

type Story = StoryObj<typeof Menu>;

export const DefaultMenu: Story = (args: any) => (
    <Menu {...args}>
        <MenuItem>link1</MenuItem>
        <MenuItem>link2</MenuItem>
        <MenuItem disabled>link3</MenuItem>
        <SubMenu title="drop down">
            <MenuItem>drop down1</MenuItem>
            <MenuItem>drop down2</MenuItem>
            <MenuItem>drop down3</MenuItem>
        </SubMenu>
    </Menu>
);

DefaultMenu.storyName = "默认Menu";

export const ClickMenu: Story = {
    ...DefaultMenu,
    args: {
        ...DefaultMenu.args,
        defaultIndex: '0',
        mode: 'vertical'
    }
};

ClickMenu.storyName = "纵向的Menu";


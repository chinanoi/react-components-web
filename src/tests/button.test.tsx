import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button, { ButtonProps } from '../components/Button/Button';

const defaultProps = {
    onClick: jest.fn()
};

const testProps: ButtonProps = {
    buttonType: 'primary',
    size: 'lg',
    classnames: 'kclass'
};

const disabledProps: ButtonProps = {
    disabled: true,
    onClick: jest.fn()
};



describe('test button component', () => {
    it('should render the correct default button', () => {
        const wrapper = render(<Button {...defaultProps}>Nice</Button>);
        const element = wrapper.getByText('Nice');
        expect(element).toBeInTheDocument();
        expect(element?.tagName).toEqual('BUTTON');
        expect(element).toHaveClass('btn btn-default');
        fireEvent.click(element);
        expect(defaultProps.onClick).toHaveBeenCalled();
    });
    it('should render the correct component', () => {
        const wrapper = render(<Button {...testProps}>Nice</Button>);
        const element = wrapper.getByText('Nice');
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass('btn-primary btn-lg kclass');
    });
    it('should render a link when btnType equals link and href is provided', () => {
        const wrapper = render(<Button buttonType='link' href="http://www.baidu.com">Link</Button>);
        const element = wrapper.getByText('Link');
        expect(element).toBeInTheDocument();
        expect(element?.tagName).toEqual('A');
        expect(element).toHaveClass('btn btn-link');

    });
    it('should render disabld button when disabled set to true', () => {
        const wrapper = render(<Button {...disabledProps}>Nice</Button>);
        const element = wrapper.getByText('Nice') as HTMLButtonElement;
        expect(element).toBeInTheDocument();
        expect(element).toBeTruthy();
        fireEvent.click(element);
        expect(disabledProps.onClick).not.toHaveBeenCalled();
    });
});

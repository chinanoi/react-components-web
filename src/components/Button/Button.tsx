import React, { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import cx from 'classnames';
import omit from 'rc-util/lib/omit';

type ButtonSize = 'lg' | 'sm';

type ButtonType = 'primary' | 'default' | 'danger' | 'link';
interface BaseButtonProps {
    classnames?: string;
    disabled?: boolean;
    size?: ButtonSize;
    buttonType?: ButtonType;
    children: React.ReactNode;
    href?: string;
}

export type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;

export type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button: React.FC<ButtonProps> = (props) => {
    const {
        classnames,
        disabled = false,
        size,
        buttonType = 'primary',
        children,
        ...rest
    } = props;

    const linkButtonRestProps = omit(rest as AnchorButtonProps & { navigate: any; }, ['navigate']);

    if (buttonType === 'link') {
        return (
            <a className={classnames} {...linkButtonRestProps}>
                {children}
            </a>
        );
    }
    return (
        <button
            className={cx([
                "btn",
                classnames && [classnames],
                buttonType && [`btn-${buttonType}`],
                size && [`btn-${size}`],
                disabled && disabled
            ])}
            {...(rest as NativeButtonProps)}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;

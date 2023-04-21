import React from 'react';
import './Button.scss';
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
}

export type NativeButtonProps = {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & BaseButtonProps &
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement | HTMLButtonElement>, 'type' | 'onClick'>;

export type AnchorButtonProps = {
    href: string;
    target?: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
} & BaseButtonProps &
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement | HTMLButtonElement>, 'type' | 'onClick'>;

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

import React from 'react';
import styles from './Button.module.scss';
import cx from 'classnames';

// export enum ButtonSize {
//     Large = 'lg',
//     Small = 'sm'
// }

type ButtonSize = 'lg' | 'sm';

// export enum ButtonType {
//     Primary = 'primary',
//     Default = 'default',
//     Danger = 'danger',
// }

type ButtonType = 'primary' | 'default' | 'danger';

interface IBaseButtonProps {
    className?: string;
    disabled?: boolean;
    size?: ButtonSize;
    buttonType?: ButtonType;
    children: React.ReactNode;
    href?: string;
}

type NativeButtonProps = IBaseButtonProps & React.ButtonHTMLAttributes<HTMLLIElement>;
type AnchorButtonProps = IBaseButtonProps & React.AnchorHTMLAttributes<HTMLLIElement>;
type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button: React.FC<ButtonProps> = (props) => {
    const { className, disabled = false, size, buttonType = 'primary', children, ...restProps } = props;

    return (
        <button
            className={cx([
                styles.btn,
                className && styles[className],
                buttonType && styles[`btn-${buttonType}`],
                size && styles[`btn-${size}`],
                disabled && styles.disabled
            ])}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;

import React from 'react';
import classNames from 'classnames';
import Transition from '../Transition/Transition';
import Icon from '../Icon'

type AlertType = 'success' | 'info' | 'warning' | 'error';

interface IAlertProps {
    type?: AlertType,
    message?: string;
    style?: React.CSSProperties;
    className?: string;
    closable?: boolean;
    afterClose?: () => void;
    closeIcon?: React.ReactNode;
    onClose?: React.MouseEventHandler<HTMLButtonElement>;
}

interface CloseIconProps {
    isClosable: boolean;
    closeIcon: IAlertProps['closeIcon'];
    handleClose: IAlertProps['onClose'];
}


const CloseIcon: React.FC<CloseIconProps> = (props) => {
    const { isClosable, closeIcon, handleClose } = props;
    return isClosable ? (
        <button type="button" onClick={handleClose} className={'lion-alert-close-icon'} tabIndex={0}>
            {closeIcon}
        </button>
    ) : null;
};


const Alert = (props: IAlertProps) => {

    const [closed, setClosed] = React.useState(false);
    const ref = React.useRef<HTMLElement>();

    const {
        type = 'info',
        message,
        afterClose,
        closeIcon = <Icon icon="times" />,
        closable,
        style
    } = props;

    const prefixCls = 'lion-alert';

    const alertCls = classNames(
        prefixCls,
        `${prefixCls}-${type}`
    );

    const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
        setClosed(true);
        props.onClose?.(e);
    };

    return (
        <Transition
            in={!close}
            timeout={300}
            animation="zoom-in-top"
        >
            <div
                className={alertCls}
                style={style}
                role="alert"
            >
                <div className="lion-alert-content">{message}</div>
                <CloseIcon
                    isClosable={!!closable}
                    handleClose={handleClose}
                    closeIcon={closeIcon}
                />
            </div>
        </Transition>

    );
};

export default Alert;

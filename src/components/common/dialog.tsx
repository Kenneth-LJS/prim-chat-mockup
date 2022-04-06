import classNames from 'classnames';
import React, { FunctionComponent, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { getThemeClassName } from '../../utils/theme-utils';

import styles from './dialog.module.scss';

type DialogProps = {
    className?: string;
    isOpen: boolean;
    onExternalClick?: () => void;
    onClose?: () => void; // If not specified, no close
};

const Dialog: FunctionComponent<DialogProps> = (props) => {
    const { className, isOpen, onExternalClick, onClose, children } = props;
    const dialogRoot = useDialogRoot();
    const themeClassName = getThemeClassName(styles);

    if (!isOpen) {
        return null;
    }

    function handleExternalClick(
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) {
        if (event.target !== event.currentTarget) {
            // Not clicking on external
            return;
        }
        onExternalClick && onExternalClick();
    }

    return createPortal(
        <div className={styles.dialogContainer} onClick={handleExternalClick}>
            <div
                className={classNames(
                    styles.dialog,
                    themeClassName,
                    className,
                )}>
                {children}
                {onClose && (
                    <button
                        className={styles.dialogCloseButton}
                        onClick={onClose}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={classNames(
                                styles.dialogCloseButtonImage,
                                themeClassName,
                            )}
                            viewBox="0 0 333 333"
                            fillRule="evenodd"
                            shapeRendering="geometricPrecision"
                            imageRendering="optimizeQuality">
                            <path d="M319 45L196 167l123 122c19 19-11 49-30 30L167 196 45 319c-20 19-50-11-30-30l122-122L15 45C-5 25 25-5 45 15l122 122L289 15c19-20 49 10 30 30z" />
                        </svg>
                    </button>
                )}
            </div>
        </div>,
        dialogRoot,
    );
};

function useDialogRoot() {
    if (typeof window === 'undefined') {
        return;
    }
    useEffect(() => {
        if (!document.getElementById('dialog')) {
            const dialogElem = document.createElement('div');
            dialogElem.setAttribute('id', 'dialog');
            window.document.body.appendChild(dialogElem);
        }
    }, []);
    return document.getElementById('dialog');
}

export default Dialog;

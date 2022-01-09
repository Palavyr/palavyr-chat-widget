import { useContext } from 'react';
import classNames from 'classnames';
import { WidgetContext } from './WidgetContext';
import React from 'react';
import './styles.scss';

import openLauncher from './assets/launcher_button.svg';
import close from './assets/clear-button.svg';

export interface LauncherProps {
    toggle: () => void;
    openLabel: string;
    closeLabel: string;
    closeImg: string;
    openImg: string;
    alignLeft?: boolean;
    closeComponent?: React.ReactNode;
    openComponent?: React.ReactNode;
}

export const Launcher = ({
    toggle,
    openImg,
    closeImg,
    closeComponent,
    openComponent,
    openLabel,
    closeLabel,
    alignLeft,
}: LauncherProps) => {
    const { widgetOpenState } = useContext(WidgetContext);

    const toggleChat = () => {
        toggle();
    };

    if (alignLeft === undefined) alignLeft = false;

    return (
        <button
            type="button"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            className={classNames({
                'pcw-hide-sm': widgetOpenState === true,
                'pcw-animation': widgetOpenState === false || widgetOpenState === undefined,
                'pcw-launcher': !alignLeft,
                'pcw-launcher-left': alignLeft,
            })}
            onClick={toggleChat}
        >
            {widgetOpenState ? (
                <>{closeComponent ?? <img src={closeImg || close} className="pcw-close-launcher" alt={openLabel} />}</>
            ) : (
                <>
                    {openComponent ?? (
                        <img src={openImg || openLauncher} className="pcw-open-launcher" alt={closeLabel} />
                    )}
                </>
            )}
        </button>
    );
};

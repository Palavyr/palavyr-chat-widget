import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import React from 'react';

import { IFrameContainer } from './IFrameContainer';
import { Launcher } from './Launcher';
import { HtmlIframeProps, OptionalSrcProps } from './IFrameWindow';
import { WidgetContext } from './WidgetContext';
import './styles.scss';
import { AltContent } from '../types';
import classnames from 'classnames';

export interface WidgetLayoutProps extends OptionalSrcProps {
    onToggleConversation(...args: any): any;
    customLauncher?: (...args: any) => any;
    launcherOpenLabel: string;
    launcherCloseLabel: string;
    launcherCloseImg: string;
    launcherOpenImg: string;
    imagePreview?: boolean;
    resizable?: boolean;
    startOpen?: boolean;
    alternateContent?: AltContent;
    fixedPosition?: boolean;
    alignLeft?: boolean;
    closeComponent?: React.ReactNode;
    openComponent?: React.ReactNode;
    containerStyles?: React.CSSProperties;
    customSpinner: React.ReactNode | null;
    IframeProps: HtmlIframeProps;
    autoOpen?: number;
    autoOpenCallback?: () => void;
    containerClassName?: string;
    disableBounce?: boolean;
    openImgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
    closeImgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
    launcherButtonAdditionalStyles?: React.CSSProperties;
}

export const WidgetLayout = ({
    src,
    onToggleConversation,
    customLauncher,
    launcherOpenLabel,
    launcherCloseLabel,
    launcherCloseImg,
    launcherOpenImg,
    closeComponent,
    openComponent,
    resizable,
    alternateContent,
    fixedPosition,
    alignLeft,
    containerStyles,
    customSpinner,
    IframeProps,
    autoOpen,
    containerClassName,
    autoOpenCallback,
    disableBounce,
    openImgProps,
    closeImgProps,
    launcherButtonAdditionalStyles,
}: WidgetLayoutProps) => {
    const { widgetOpenState, setWidgetOpenState, visible, persistState } = useContext(WidgetContext);
    const [iframeRefreshed, reloadIframe] = useState<boolean>(false);

    useEffect(() => {
        document.body.setAttribute('style', `overflow: ${visible ? 'hidden' : 'auto'}`);
    }, [visible]);

    useEffect(() => {
        if (autoOpen) {
            setTimeout(() => {
                setWidgetOpenState(true);
                if (autoOpenCallback) {
                    autoOpenCallback();
                }
            }, autoOpen);
            reloadIframe(!iframeRefreshed);
        }
    }, []);

    return (
        <div
            className={classNames({
                'pcw-widget-container-fixed-left': alignLeft && fixedPosition,
                'pcw-widget-container-fixed': !alignLeft && fixedPosition,
                'pcw-close-widget-container ': !widgetOpenState && fixedPosition,
                'pcw-widget-container': !fixedPosition,
            })}
        >
            <IFrameContainer
                src={src}
                alternateContent={alternateContent}
                widgetOpenState={widgetOpenState}
                className={classnames(
                    containerClassName ?? '',
                    widgetOpenState || !fixedPosition ? 'active' : 'hidden',
                )}
                resizable={resizable}
                persistState={persistState}
                containerStyles={containerStyles}
                IframeProps={IframeProps}
                customSpinner={customSpinner}
                reloadIframe={reloadIframe}
                iframeRefreshed={iframeRefreshed}
            />
            {fixedPosition && (
                <>
                    {customLauncher ? (
                        customLauncher(onToggleConversation)
                    ) : (
                        <Launcher
                            alignLeft={alignLeft}
                            toggle={onToggleConversation}
                            openLabel={launcherOpenLabel}
                            closeLabel={launcherCloseLabel}
                            closeImg={launcherCloseImg}
                            openImg={launcherOpenImg}
                            closeComponent={closeComponent}
                            openComponent={openComponent}
                            disableBounce={disableBounce}
                            openImgProps={openImgProps}
                            closeImgProps={closeImgProps}
                            launcherButtonAdditionalStyles={launcherButtonAdditionalStyles}
                        />
                    )}
                </>
            )}
        </div>
    );
};

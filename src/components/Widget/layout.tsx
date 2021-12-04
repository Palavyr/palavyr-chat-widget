import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import { GlobalState } from 'src/store/types';
import { AnyFunction } from 'src/utils/types';
import { openFullscreenPreview } from '../../store/actions';

import Conversation from './components/Conversation';
import Launcher from './components/Launcher';
import FullScreenPreview from './components/FullScreenPreview';

import './style.scss';

type Props = {
    onToggleConversation: AnyFunction;
    fullScreenMode: boolean;
    customLauncher?: AnyFunction;
    launcherOpenLabel: string;
    launcherCloseLabel: string;
    launcherCloseImg: string;
    launcherOpenImg: string;
    imagePreview?: boolean;
    resizable?: boolean;
    src: string;
    zoomStep?: number;
};

function WidgetLayout({
    src,
    onToggleConversation,
    fullScreenMode,
    zoomStep,
    customLauncher,
    launcherOpenLabel,
    launcherCloseLabel,
    launcherCloseImg,
    launcherOpenImg,
    imagePreview,
    resizable,
}: Props) {
    const dispatch = useDispatch();
    const { showChat, visible } = useSelector((state: GlobalState) => ({
        showChat: state.behavior.showChat,
        dissableInput: state.behavior.disabledInput,
        visible: state.preview.visible,
    }));

    const messageRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (showChat) {
            messageRef.current = document.getElementById('messages') as HTMLDivElement;
        }
        return () => {
            messageRef.current = null;
        };
    }, [showChat]);

    const eventHandle = (evt) => {
        if (evt.target && evt.target.className === 'rcw-message-img') {
            const { src, alt, naturalWidth, naturalHeight } = evt.target as HTMLImageElement;
            const obj = {
                src: src,
                alt: alt,
                width: naturalWidth,
                height: naturalHeight,
            };
            dispatch(openFullscreenPreview(obj));
        }
    };

    /**
     * Previewer needs to prevent body scroll behavior when fullScreenMode is true
     */
    useEffect(() => {
        const target = messageRef?.current;
        if (imagePreview && showChat) {
            target?.addEventListener('click', eventHandle, false);
        }

        return () => {
            target?.removeEventListener('click', eventHandle);
        };
    }, [imagePreview, showChat]);

    useEffect(() => {
        document.body.setAttribute('style', `overflow: ${visible || fullScreenMode ? 'hidden' : 'auto'}`);
    }, [fullScreenMode, visible]);

    return (
        <div
            className={cn('rcw-widget-container', {
                'rcw-full-screen': fullScreenMode,
                'rcw-previewer': imagePreview,
                'rcw-close-widget-container ': !showChat,
            })}
        >
            <Conversation
                src={src}
                showChat={showChat}
                className={showChat ? 'active' : 'hidden'}
                resizable={resizable}
            />
            {customLauncher
                ? customLauncher(onToggleConversation)
                : !fullScreenMode && (
                      <Launcher
                          toggle={onToggleConversation}
                          openLabel={launcherOpenLabel}
                          closeLabel={launcherCloseLabel}
                          closeImg={launcherCloseImg}
                          openImg={launcherOpenImg}
                      />
                  )}
            {imagePreview && <FullScreenPreview fullScreenMode={fullScreenMode} zoomStep={zoomStep} />}
        </div>
    );
}

export default WidgetLayout;

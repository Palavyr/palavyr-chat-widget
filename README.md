# palavyr-chat-widget

[Demo Page](https://palavyr.github.io/palavyr-chat-widget/)

## Usage

    import Widget from 'palavyr-chat-widget';

    const App = () => {
        return <Widget src={"https://www.some-url.com/"} resizable />
    }

## Description

This project holds a pure react component with few dependencies that can be used to load things in a launchable chat window.

There are essentially two use cases:

1. Loading an iframe - whereby you will provide a valid and compatible url (.e.g https://www.google.com is not a valid url)
2. Loading custom content - whereby you will provide a react component, which will then be rendered in the container.

## API


| Prop                            | Type                                                                                                   | Default Value | Description                                                                                                                                                                                                                                           |
| ------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| customLauncher?                 | AnyFunction                                                                                            | undefined     | Function that is used to trigger the launcher toggle action                                                                                                                                                                                           |
| onToggle?                       | (widgetOpenState: boolean, setWidgetOpenState: React.Dispatch<React.SetStateAction<boolean>) => void;) | undefined     | Function that will fire when the launcher is clicked to toggle the widget                                                                                                                                                                             |
| launcherOpenLabel               | string                                                                                                 | ''            | Label provided to the Launcher when it is open                                                                                                                                                                                                        |
| launcherCloseLabel              | string                                                                                                 | ''            | Label provided to the Launcher when it is closed                                                                                                                                                                                                      |
| launcherCloseImg                | string                                                                                                 | ''            | Image provided to the launcher when closed (shows up in the clickable launcher button)                                                                                                                                                                |
| launcherOpenImg                 | string                                                                                                 | ''            | Image provided to launcher when open (shows up in the clickable launcher button)                                                                                                                                                                      |
| resizable                       | boolean                                                                                                | true          | When true, you can drag the left side of the widget                                                                                                                                                                                                   |
| startOpen                       | boolean                                                                                                | false         | When true, and fixedPosition is False, the widget will start in the open state                                                                                                                                                                        |
| alternateContent?               | AltContent                                                                                             | undefined     | A Component that will be rendered instead of the iFrame. No styles are applied internally to the alternate component                                                                                                                                  |
| fixedPosition                   | boolean                                                                                                | true          | If true, the launcher will be visible and the widget will be fixed to the bottom left right corner (depending on the alignLeft value)                                                                                                                 |
| open?                           | boolean                                                                                                | undefined     | prop used to control the state of the widget (open or closed state)                                                                                                                                                                                   |
| setOpen?                        | Dispatch<SetStateAction<boolean>>                                                                      | undefined     | The dispatch hook for the `open` control prop (todo: remove this dependency)                                                                                                                                                                          |
| alignLeft                       | boolean                                                                                                | false         | If true, the widget aligns to the left side of the screen instead of the right                                                                                                                                                                        |
| closeComponent?                 | React.ReactNode                                                                                        | undefined     | Component rendered as the clickable button to open and close the widget when closed                                                                                                                                                                   |
| openComponent?                  | React.ReactNode                                                                                        | undefined     | Component rended as the clickable button to open and close the widget when opened                                                                                                                                                                     |
| launchComponent?                | React.ReactNode                                                                                        | undefined     | Component rendered as the clickable button to open and close the widget when open                                                                                                                                                                     |
| persistState                    | boolean                                                                                                | true          | If true, the state of the container will be maintained (i.e. will not be unmounted) when the launcher is closed e.g. this is useful if you'd like to persist the same conversation across different pages (and the widget sits outside of the router) |
| containerStyles                 | React.CSSProperties                                                                                    | undefined     | Styles applied ot the div that contains the iframe. (There is only one such outer div)                                                                                                                                                                |
| containerClassName              | string (class names)                                                                                   | ''            | className applied ot the div that contains the iframe. (There is only one such outer div)                                                                                                                                                             |
| customSpinner                   | React.ReactNode or `null`                                                                              | null          | An optional component that is shown when the iframe is loading. A default spinner is used if this not provided.                                                                                                                                       |
| IframeProps?                    | React's IFrame Props -- see below                                                                      | undefined     | Additional props that are specific to the React iframe element may be passed for further customization.                                                                                                                                               |
| autoOpen?                       | number                                                                                                 | undefined     | When defined, this causes the widget to automatically open after the provided number of milliseconds                                                                                                                                                  |
| autoOpenCallback?               | Any void function that takes no arguments, i.e. () => void                                             | undefined     | A function to call when the auto open event occurs                                                                                                                                                                                                    |
| disableBounce?                  | boolean                                                                                                | false         | Disable bounce animation behavior when using the default launcher componentoccurs                                                                                                                                                                     |
| openImgProps?                   | React.ImgHTMLAttributes<HTMLImageElement>                                                              | {}            | img element props passed to the default launcher image element when in the 'click to open' state occurs                                                                                                                                               |
| closeImgProps?                  | React.ImgHTMLAttributes<HTMLImageElement>                                                              | {}            | img element props passed to the default launcher image element when in the 'click to close' state occurs                                                                                                                                              |
|                                 |
| launcherButtonAdditionalStyles? | React.CSSProperties                                                                                    | {}            | Additional styles passed to the default launcher button                                                                                                                                                                                               |
|                                 |
| onEffect?                       | (widgetOpenState: boolean, setWidgetOpenState: SetState<boolean>) => void;                             | undefined     | Function to call on effect                                                                                                                                                                                                                            |
|                                 |
| onEffectDependencyArray?        | Array<any>                                                                                             | undefined     | Dependency array for the useEffect provided for the onEffect callback. required if onEffect is supplied.                                                                                                                                              |
|                                 |

`iframeProps: React.DetailedHTMLProps<IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement>`


## Package details

```
=== Tarball Details ===
name:          palavyr-chat-widget
version:       1.5.0
filename:      palavyr-chat-widget-1.5.0.tgz
package size:  22.3 kB
unpacked size: 125.2 kB
total files:   15
```
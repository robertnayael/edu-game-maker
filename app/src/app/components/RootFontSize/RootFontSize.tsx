import React from 'react'
import { fromEvent, Subscription } from 'rxjs'
import { map, startWith, debounceTime } from 'rxjs/operators'

export const DEBOUNCE_TIME = 250

export namespace RootFontSize {
    export interface Props {
        viewboxRatioX: number
        viewboxRatioY: number
    }
}

interface ViewportSize {
    width: number
    height: number
}

const getViewportSize = (window: Window): ViewportSize => ({
    width: window.innerWidth,
    height: window.innerHeight
})

export class RootFontSize extends React.PureComponent<RootFontSize.Props> {

    subscription?: Subscription;

    handleResize = (vp: ViewportSize) => {
        const { viewboxRatioX, viewboxRatioY } = this.props
        const viewboxRatio = viewboxRatioX / viewboxRatioY
        const viewportRatio = vp.width / vp.height
        
        const contentWidth = viewboxRatio < viewportRatio
            ? vp.height * viewboxRatio
            : vp.width
        
        this.setRootFontSize(contentWidth / 100)
    }

    setRootFontSize(fontSize: number) {
        document!.documentElement!.style.fontSize = `${fontSize}px`
    }

    componentDidMount() {
        this.subscription = fromEvent(window, 'resize')
            .pipe(
                debounceTime(DEBOUNCE_TIME),
                map(() => window),
                startWith(window),
                map(({ innerWidth, innerHeight }) => ({
                    width: innerWidth,
                    height: innerHeight
                }))
            )
            .subscribe(this.handleResize)
    }

    componentDidUpdate() {
        this.handleResize(getViewportSize(window))
    }

    componentWillUnmount() {
        this.subscription!.unsubscribe()
    }

    render() {
        return null
    }
}

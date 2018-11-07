import React from 'react'
import { fromEvent, Subscription } from 'rxjs'
import { map, startWith, debounceTime } from 'rxjs/operators'

export namespace ViewportScale {
    export interface Props {
        ratioX: number
        ratioY: number
    }
}

interface ViewportSize {
    width: number
    height: number
}

export class ViewportScale extends React.PureComponent<ViewportScale.Props> {

    subscription?: Subscription;

    handleResize = (vp: ViewportSize) => {
        const { ratioX, ratioY } = this.props
        const desiredRatio = ratioX / ratioY
        const currentRatio = vp.width / vp.height
        
        const contentWidth = currentRatio > desiredRatio
            ? vp.height * desiredRatio
            : vp.width
        
        this.setRootFontSize(contentWidth / 100)
    }

    setRootFontSize(fontSize: number) {
        document!.documentElement!.style.fontSize = `${fontSize}px`
    }

    componentDidMount() {
        this.subscription = fromEvent(window, 'resize')
            .pipe(
                debounceTime(250),
                map(() => window),
                startWith(window),
                map(({ innerWidth, innerHeight }) => ({
                    width: innerWidth,
                    height: innerHeight
                }))
            )
            .subscribe(this.handleResize)
    }

    componentWillUnmount() {
        this.subscription!.unsubscribe()
    }

    render() {
        return null
    }
}

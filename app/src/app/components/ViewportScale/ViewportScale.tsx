import React from 'react'
import { fromEvent, Subscription } from 'rxjs'
import { map, startWith, debounceTime } from 'rxjs/operators'

export namespace ViewportScale {
    export interface Props {
        ratioX: number
        ratioY: number
    }
    export interface State {
    }
}

interface ViewportSize {
    width: number
    height: number
}

export class ViewportScale extends React.PureComponent<ViewportScale.Props, ViewportScale.State> {

    subscription?: Subscription;

    handleResize = (vp: ViewportSize) => {
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

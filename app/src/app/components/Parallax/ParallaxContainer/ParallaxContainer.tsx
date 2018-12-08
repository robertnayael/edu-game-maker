import React from 'react'
import Measure, { BoundingRect, withContentRect, ContentRect } from 'react-measure'

import { ParallaxLayer } from '../ParallaxLayer'
import Context from '../ParallaxContext'
import styles from './styles.scss'

export namespace ParallaxContainer {
    export interface Props {
        paused?: boolean
    }

    export interface State {
        dimensions?: {
            width: number
            height: number
        }
    }
}

export class ParallaxContainer extends React.PureComponent<ParallaxContainer.Props, ParallaxContainer.State> {

    static Layer = ParallaxLayer

    static defaultProps = {
        paused: false
    }

    state: ParallaxContainer.State = {}

    MeasuredContainer = withContentRect('bounds')(
        ({ measureRef, measure, contentRect, children }) => (
            <div
                ref={measureRef}
                className={styles.parallaxWrapper}
            >
                {contentRect && (children as Function)(contentRect.bounds)}
            </div>
        )
    )

    render() {

        return (
            <this.MeasuredContainer>
                {({ width, height }: BoundingRect) => (
                    <Context.Provider value={{
                        animationPaused: this.props.paused!,
                        containerSize: { width, height }
                    }}>
                        {width && height && this.props.children}
                    </Context.Provider>
                )}
            </this.MeasuredContainer>
        )
    }


}






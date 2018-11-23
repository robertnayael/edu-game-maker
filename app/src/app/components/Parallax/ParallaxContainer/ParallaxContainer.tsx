import React from 'react'
import Measure, { BoundingRect } from 'react-measure'

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

    handleMeasurement = ({ width, height }: BoundingRect) => {
        if (!width || !height) return
        this.setState({
            dimensions: {
                width,
                height
            }
        })
    }

    render() {

        return (
            <Measure
                bounds
                onResize={({ bounds }) => this.handleMeasurement(bounds!)}
            >
                {({ measureRef }) => (
                    <div
                        ref={measureRef}
                        className={styles.parallaxWrapper}
                    >
                        <Context.Provider value={{
                            animationPaused: this.props.paused!,
                            containerSize: this.state.dimensions
                        }}>
                            {this.state.dimensions && this.props.children}
                        </Context.Provider>
                    </div>
                )}
            </Measure>
        ) 
    }

}






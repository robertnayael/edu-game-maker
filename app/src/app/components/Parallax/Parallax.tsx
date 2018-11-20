import React from 'react'
import Measure, { BoundingRect } from 'react-measure'

import Context, { ParallaxContext } from './ParallaxContext'
import styles from './styles.scss'
import { Layer } from './Layer'

export namespace Parallax {
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

export class Parallax extends React.PureComponent <Parallax.Props, Parallax.State> {

    static Layer = Layer

    static defaultProps = {
        paused: false
    }

    state: Parallax.State = {}

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






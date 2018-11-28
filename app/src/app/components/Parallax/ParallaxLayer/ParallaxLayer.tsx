import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Subtract } from 'utility-types'

import Context from '../ParallaxContext'

const scroll = (to: number) => keyframes`
    from {
        background-position-x: 0;
    }
    to {
        background-position-x: -${to}px;
    }
`

const LayerImage = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    background-size: auto 100%;
    animation: ${props => scroll(props.tileWidth)} linear infinite;
    animation-duration: ${props => props.duration}s;
    animation-play-state: ${props => props.paused ? 'paused' : 'running'};
    background-image: url("${props => props.img}");
`

const getActualImgWidth = (img: { width: number, height: number }, container: { width: number, height: number }) => {
    const currentZoom = container.height / img.height
    return img.width * currentZoom
}


export namespace WithImgSize {
    export interface Props {
        img: string
    }

    export interface InjectedProps {
        imgSize: {
            width: number
            height: number
        }
    }

    export interface State {
        imgLoaded: boolean
        imgSize: {
            width: number
            height: number
        }
    }
}


const withImgSize = <P extends WithImgSize.InjectedProps>(
    Component: React.ComponentType<P>
) =>
    class WithLoading extends React.Component<
        Subtract<P, WithImgSize.InjectedProps> & WithImgSize.Props,
        WithImgSize.State
    > {
        state: WithImgSize.State = {
            imgLoaded: false,
            imgSize: {
                width: 928,
                height: 793
            }
        }

        componentDidMount() {
            const { img } = this.props
            const image = new Image()
            image.src = img
            image.addEventListener('load', () => this.setState({
                imgLoaded: true,
                imgSize: {
                    width: image.naturalWidth,
                    height: image.naturalHeight
                }
            }))

        }

        render() {
            const props = this.props
            const { imgLoaded, imgSize } = this.state
            return imgLoaded
                ? <Component
                    {...props}
                    imgSize={imgSize}
                />
                : null
        }
    };




export namespace ParallaxLayer {
    export interface Props extends WithImgSize.InjectedProps {
        img: string,
        duration: number
    }
}

export const ParallaxLayer = withImgSize(
    ({ imgSize, ...props }: ParallaxLayer.Props) => 
        <Context.Consumer>
            {({ containerSize, animationPaused }) => 
                <LayerImage
                    {...props}
                    paused={animationPaused}
                    tileWidth={getActualImgWidth(imgSize, containerSize!)}
                />
            }
        </Context.Consumer>
)
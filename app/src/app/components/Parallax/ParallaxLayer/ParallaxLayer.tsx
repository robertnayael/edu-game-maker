import React from 'react'
import styled, { keyframes } from 'styled-components'

import { withImgSize } from '../withImgSize'
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
    animation: ${props => scroll(props.backgroundTileWidth)} linear infinite;
    animation-duration: ${props => props.duration}s;
    animation-play-state: ${props => props.paused ? 'paused' : 'running'};
    background-image: url("${props => props.img}");
`

const getScaledImgWidth = (img: { width: number, height: number }, container: { width: number, height: number }) => {
    const currentZoom = container.height / img.height
    return img.width * currentZoom
}

export namespace ParallaxLayer {
    export interface Props extends withImgSize.InjectedProps {
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
                    backgroundTileWidth={getScaledImgWidth(imgSize, containerSize!)}
                />
            }
        </Context.Consumer>
)
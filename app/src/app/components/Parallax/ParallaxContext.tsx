import React from 'react'

export interface ParallaxContext {
    containerSize?: {
        width: number
        height: number
    }
    animationPaused: boolean
}

export default React.createContext<ParallaxContext>({
    animationPaused: false
})

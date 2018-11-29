import React from 'react'
import { Subtract } from 'utility-types'

export namespace withImgSize {
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


export const withImgSize = <P extends withImgSize.InjectedProps>(
    Component: React.ComponentType<P>
) =>
    class WithLoading extends React.Component<
        Subtract<P, withImgSize.InjectedProps> & withImgSize.Props,
        withImgSize.State
        > {
        state: withImgSize.State = {
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
    }
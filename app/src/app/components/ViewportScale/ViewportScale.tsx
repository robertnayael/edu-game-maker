import React from 'react'

export namespace ViewportScale {
    export interface Props {
        ratioX: number
        ratioY: number
        children?: any
    }
    export interface State {

    }
}

export class ViewportScale extends React.PureComponent<ViewportScale.Props, ViewportScale.State> {
    render() {
        return this.props.children
    }
}

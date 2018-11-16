import React from 'react'
import { viewboxRatio as ratio } from '@app/config'
import { RootFontSize } from '@app/components'
import { ContainViewbox } from './ContainViewbox'

export namespace Layout {
    export interface Props {
        children?: any
    }
}

export class Layout extends React.PureComponent <Layout.Props>{

    static ContainViewbox = ContainViewbox

    render() {
        return (
            <>
                <RootFontSize viewboxRatioX={ratio.x} viewboxRatioY={ratio.y} />
                {this.props.children}
            </>
        )
    }
}
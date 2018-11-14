import React from 'react'
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
                <RootFontSize viewboxRatioX={16} viewboxRatioY={9} />
                {this.props.children}
            </>
        )
    }
}
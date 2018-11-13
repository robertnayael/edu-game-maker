import React from 'react'
import { RootFontSize } from '../../components'
import styles from './styles.scss'

export namespace ContainViewboxLayout {
    export interface Props {
        children?: any
    }
}

export const ContainViewboxLayout = ({ children }: ContainViewboxLayout.Props) =>
    <>
        <RootFontSize viewboxRatioX={16} viewboxRatioY={9} />
        <div
            className={styles.containViewbox}
            children={children}
        />
    </>

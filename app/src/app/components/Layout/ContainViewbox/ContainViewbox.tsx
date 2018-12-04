import React from 'react'
import { viewboxRatio as ratio } from '@app/config'
import styles from './styles.scss'

export namespace ContainViewbox {
    export interface Props {
        children?: any
    }
}

export const ContainViewbox = ({ children }: ContainViewbox.Props) =>
    <div
        className={styles.containViewbox}
        style={{
            width: `100rem`,
            height: `${100 * (ratio.x / ratio.y)}rem`
        }}
        children={children}
    />

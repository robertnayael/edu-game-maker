import React from 'react'
import styles from './styles.scss'

export namespace ContainViewbox {
    export interface Props {
        children?: any
    }
}

export const ContainViewbox = ({ children }: ContainViewbox.Props) =>
    <div
        className={styles.containViewbox}
        children={children}
    />

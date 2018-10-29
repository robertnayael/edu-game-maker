import React from 'react'
import styles from './styles.scss'

export namespace Header {
    export interface Props {
        children?: any
    }
}

export const Header = ({ children }: Header.Props) => <h1 className={styles.header}>{children}</h1>

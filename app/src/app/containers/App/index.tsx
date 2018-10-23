import * as React from 'react'
import * as styles from './styles.scss'

export namespace App {
    export interface Props {}
}

export class App extends React.Component<App.Props> {
    render() {
        return <h1 className={styles.heading}>Hello, world!</h1>
    }
}

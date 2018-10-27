import * as React from 'react'
import * as styles from './styles.scss'
import { Games as GameModels } from '../../../../models'

export namespace RevealPictureDnD {
    export interface Props extends GameModels.RevealPictureDnD.Game {
    }
}

export class RevealPictureDnD extends React.Component<RevealPictureDnD.Props> {
    render() {
        console.log(this.props)
        return <main className={styles.wrapper}></main>
    }
}

import React from 'react'
import styles from './styles.scss'
import { Games as GameModels } from '../../../../models'

export namespace RevealPictureDnD {
    export interface Props extends GameModels.RevealPictureDnD.Game {
    }
}

export class RevealPictureDnD extends React.Component<RevealPictureDnD.Props> {
    render() {
        const { title, pairs } = this.props
        return (
            <main className={styles.wrapper}>
                <h1 className={styles.title}>{title}</h1>
                <ul>
                    { pairs.map(({ image, word }) => <li key={word}>{word}</li>) }
                </ul>
            </main>
        )
    }
}

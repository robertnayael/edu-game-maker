import * as React from 'react'
import * as styles from './styles.scss'
import { RootFontSize } from '../../components'
import { game } from '../../../data/mockData'
import * as games from '../../games'

export namespace App {
    export interface Props {}
}

export class App extends React.Component<App.Props> {
    render() {
        return (
            <>
                <RootFontSize viewboxRatioX={16} viewboxRatioY={9} />
                <games.RevealPictureDnD {...game} />
            </>
        )
    }
}

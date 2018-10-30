import * as React from 'react'
import * as styles from './styles.scss'
import { ViewportScale } from '../../components'
import { game } from '../../../data/mockData'
import * as games from '../../games'

export namespace App {
    export interface Props {}
}

export class App extends React.Component<App.Props> {
    render() {
        return (
            <ViewportScale ratioX={16} ratioY={9}>
                <games.RevealPictureDnD {...game} />
            </ViewportScale>
        )
    }
}

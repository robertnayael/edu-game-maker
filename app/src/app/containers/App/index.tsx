import * as React from 'react'
import * as styles from './styles.scss'
import { Layout } from '@app/components'
import { game } from '../../../data/mockData'
import * as games from '../../games'

export namespace App {
    export interface Props {}
}

export class App extends React.Component<App.Props> {
    render() {
        return (
            <Layout>
                <Layout.ContainViewbox>
                </Layout.ContainViewbox>
            </Layout>
        )
    }
}

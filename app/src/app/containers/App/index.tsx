import * as React from 'react'
import * as styles from './styles.scss'
import { Parallax } from '../../components'
import { game } from '../../../data/mockData'
import * as games from '../../games'

export namespace App {
    export interface Props {}
}

export class App extends React.Component<App.Props> {
    render() {
        return (
            <div
             style={{
                width: '100vw',
                height: '100vh'
            }}>
                <Parallax>
                    <Parallax.Layer
                        img={'/assets/parallax/01.png'}
                        imgSize={{
                            width: 928,
                            height: 793
                        }}
                        duration={18}
                    />
                    <Parallax.Layer
                        img={'/assets/parallax/02.png'}
                        imgSize={{
                            width: 928,
                            height: 793
                        }}
                        duration={17}
                    />
                    <Parallax.Layer
                        img={'/assets/parallax/03.png'}
                        imgSize={{
                            width: 928,
                            height: 793
                        }}
                        duration={16}
                    />
                    <Parallax.Layer
                        img={'/assets/parallax/04.png'}
                        imgSize={{
                            width: 928,
                            height: 793
                        }}
                        duration={15}
                    />
                    <Parallax.Layer
                        img={'/assets/parallax/04_lights.png'}
                        imgSize={{
                            width: 928,
                            height: 793
                        }}
                        duration={15}
                    />
                    <Parallax.Layer
                        img={'/assets/parallax/05.png'}
                        imgSize={{
                            width: 928,
                            height: 793
                        }}
                        duration={14}
                    />
                    <Parallax.Layer
                        img={'/assets/parallax/06.png'}
                        imgSize={{
                            width: 928,
                            height: 793
                        }}
                        duration={13}
                    />
                    <Parallax.Layer
                        img={'/assets/parallax/07.png'}
                        imgSize={{
                            width: 928,
                            height: 793
                        }}
                        duration={12}
                    />
                    <Parallax.Layer
                        img={'/assets/parallax/07_lights.png'}
                        imgSize={{
                            width: 928,
                            height: 793
                        }}
                        duration={12}
                    />
                    <Parallax.Layer
                        img={'/assets/parallax/08.png'}
                        imgSize={{
                            width: 928,
                            height: 793
                        }}
                        duration={11}
                    />
                    <Parallax.Layer
                        img={'/assets/parallax/09.png'}
                        imgSize={{
                            width: 928,
                            height: 793
                        }}
                        duration={10}
                    />
                </Parallax>
            </div>
        )
    }
}

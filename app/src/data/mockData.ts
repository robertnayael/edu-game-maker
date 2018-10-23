import { TestInterface } from '@shared/types'

export type Game = {
    id: string
    title: string
    image: string
    pairs: Pair[]
}

export type Pair = {
    word: string
    image: string
}

const game: Game = {
    id: '1234567890',
    title: 'Fruit names',
    image: 'whatever.jpg',
    pairs: [
        {
            word: 'banana',
            image: 'banana.jpg'
        },
        {
            word: 'apple',
            image: 'banana.jpg'
        },
        {
            word: 'orange',
            image: 'banana.jpg'
        },
        {
            word: 'coconut',
            image: 'banana.jpg'
        },
        {
            word: 'pineapple',
            image: 'banana.jpg'
        },
        {
            word: 'pear',
            image: 'banana.jpg'
        },
        {
            word: 'strawberry',
            image: 'banana.jpg'
        },
        {
            word: 'plum',
            image: 'banana.jpg'
        }
    ]
}

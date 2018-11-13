export namespace RevealPictureDnD {

    export interface Game {
        title: string
        image: string
        pairs: Pair[]
    }

    export interface Pair {
        word: string
        image: string
    }

}

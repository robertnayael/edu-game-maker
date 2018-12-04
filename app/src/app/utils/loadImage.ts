import { Observable, Observer } from 'rxjs'

export const loadImage = (imagePath: string): Observable<HTMLImageElement> =>
    Observable.create((observer: Observer<HTMLImageElement>) => {
        const img = new Image()
        img.src = imagePath
        img.onload = () => {
            observer.next(img)
            observer.complete()
        }
        img.onerror = (err) => observer.error(err)
    })

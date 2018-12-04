import { loadImage } from './loadImage'
import { Observable } from 'rxjs';

describe('loadImage', () => {

    let DummyImageConstructor, dummyImageElement
    
    beforeEach(() => {
        dummyImageElement = {

            intercepted: {
                src: null,
                onloadCallback: null,
                onerrorCallback: null
            },

            set src(path) { this.intercepted.src = path },
            set onload(cb) { this.intercepted.onloadCallback = cb },
            set onerror(cb) { this.intercepted.onerrorCallback = cb }
        }

        DummyImageConstructor = function () {
            return dummyImageElement
        }

        window['Image'] = DummyImageConstructor
    })

    it('should return Observable', () => {
        const image$ = loadImage('whatever')
        expect(image$).toBeInstanceOf(Observable)
    })

    it('should not attempt to retrieve image until it is subscribed to', () => {
        loadImage('some image')
        expect(dummyImageElement.intercepted.src).toBeNull()
    })

    it('should attempt to retrieve image after subscription', () => {
        loadImage('another image')
            .subscribe(() => {})
        expect(dummyImageElement.intercepted.src).toEqual('another image')
    })

    it('should emit image element when image has loaded', async () => {
        const image$ = loadImage('yet another image')
        const promise = new Promise(resolve => image$.subscribe({ next: resolve }))
        dummyImageElement.intercepted.onloadCallback()
        await expect(promise).resolves.toEqual(dummyImageElement)
    })

    it('should should complete when image has loaded', async () => {
        const image$ = loadImage('it’s the last one, i promise!')
        const promise = new Promise(resolve => image$.subscribe({ complete: resolve }))
        dummyImageElement.intercepted.onloadCallback()
        // NOTE: we're just interested in whether the promise resolves, regardless of the resolved value
        await expect(promise).resolves.not.toThrow()
    })

    it('should terminate with error if image cannot be loaded', async () => {
        const promise = loadImage('wrong image').toPromise()
        dummyImageElement.intercepted.onerrorCallback('some error')
        await expect(promise).rejects.toEqual('some error')
    })

})

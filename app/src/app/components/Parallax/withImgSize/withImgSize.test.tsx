import React from 'react'
import { shallow } from 'enzyme'
import { withImgSize } from './'

let requestedImagePath
let resolveSubscription

jest.mock('@app/utils', () => ({
    loadImage: (path) => {
        requestedImagePath = path
        return {
            subscribe: (cb) => { resolveSubscription = cb }
        }
    }
}))

describe('`withImgSize` HOC', () => {

    beforeEach(() => {
        requestedImagePath = undefined
        resolveSubscription = undefined
    })

    it('should attempt to load specified image', () => {
        const Component = () => null
        const ComponentWithImgSize = withImgSize(Component)
        shallow(<ComponentWithImgSize img="☀" />)
        expect(requestedImagePath).toEqual('☀')
    })

    it.skip('should not render anything until image has loaded', () => {
    })

    it.skip('should render wrapped component after image has loaded', () => {
    })

    it.skip('should pass correct imgSize after image has loaded', () => {
    })

})
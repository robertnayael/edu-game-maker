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

    it('should not render anything until image has loaded', () => {
        const Component = () => null
        const ComponentWithImgSize = withImgSize(Component)
        const wrapper = shallow(<ComponentWithImgSize img="whatever" />)
        
        expect(wrapper.get(0)).toBeFalsy()
    })

    it('should render wrapped component after image has loaded', () => {
        const Component = () => null
        const ComponentWithImgSize = withImgSize(Component)
        const wrapper = shallow(<ComponentWithImgSize img="whatever" />)
        resolveSubscription(new Image())
        
        expect(wrapper.find(Component)).toHaveLength(1)
    })

    it('should pass correct imgSize after image has loaded', () => {
        const Component = () => null
        const ComponentWithImgSize = withImgSize(Component)
        const wrapper = shallow(<ComponentWithImgSize img="whatever" />)

        const image = new Image()
        Object.defineProperty(image, 'naturalWidth', { value: 123 })
        Object.defineProperty(image, 'naturalHeight', { value: 456 })
        resolveSubscription(image)
        const passedSize = wrapper.get(0).props.imgSize

        expect(passedSize.width).toEqual(123)
        expect(passedSize.height).toEqual(456)
    })

})
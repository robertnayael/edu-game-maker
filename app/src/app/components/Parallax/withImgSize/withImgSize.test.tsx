import React from 'react'
import { shallow } from 'enzyme'
import { withImgSize } from './'


const mockImage = {
    addEventListener: () => {},
    set src(img) {}
}

window['Image'] = () => mockImage

describe('`withImgSize` HOC', () => {

    it('should attempt to load specified image', () => {
        const spy = jest.spyOn(mockImage, 'src', 'set')
        
        const Component = () => null
        const ComponentWithImgSize = withImgSize(Component)
        shallow(<ComponentWithImgSize img="☀" />)
        
        expect(spy).toHaveBeenCalledWith('☀')
    })

    it('should not render anything until image has loaded', () => {
    })

    it('should render wrapped component after image has loaded', () => {
    })

    it('should pass correct imgSize after image has loaded', () => {
    })

})
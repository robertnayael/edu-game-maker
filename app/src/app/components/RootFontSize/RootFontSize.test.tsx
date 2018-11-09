import React from 'react'
import { shallow, mount } from 'enzyme'

import { RootFontSize } from './'

const helpers = {
    setViewport: (width, height) => Object.defineProperties(window, {
        innerWidth: { value: width },
        innerHeight: { value: height },
    }),
    getRootFontSize: () => document!.documentElement!.style.fontSize
}

describe('<RootFontSize />', () => {
    
    it('doesn\'t render anything', () => {
        const wrapper = shallow(<RootFontSize viewboxRatioX={1} viewboxRatioY={1} />)
        expect(wrapper.type()).toEqual(null)
    })

    it('correctly sets root font size on mount', () => {
        helpers.setViewport(1024, 768)
        mount(<RootFontSize viewboxRatioX={1} viewboxRatioY={1} />)
        expect(helpers.getRootFontSize()).toBe('7.68px')
        
        helpers.setViewport(768, 1024)
        mount(<RootFontSize viewboxRatioX={1} viewboxRatioY={1} />)
        expect(helpers.getRootFontSize()).toBe('7.68px')

        helpers.setViewport(1024, 768)
        mount(<RootFontSize viewboxRatioX={2} viewboxRatioY={1} />)
        expect(helpers.getRootFontSize()).toBe('10.24px')

        helpers.setViewport(1024, 768)
        mount(<RootFontSize viewboxRatioX={4} viewboxRatioY={3} />)
        expect(helpers.getRootFontSize()).toBe('10.24px')
    })

})
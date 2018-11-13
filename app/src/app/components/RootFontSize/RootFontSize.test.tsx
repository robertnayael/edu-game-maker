import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'

import { RootFontSize, DEBOUNCE_TIME } from './RootFontSize'

jest.useFakeTimers()

const helpers = {
    setViewport: (width, height) => {
        Object.defineProperties(window, {
            innerWidth: { value: width },
            innerHeight: { value: height },
        })
        window.dispatchEvent(new Event('resize'))
    },
    getRootFontSize: () => document!.documentElement!.style.fontSize,
    clearRootFontSize: () => document!.documentElement!.style.fontSize = ''
}

describe('<RootFontSize />', () => {

    let wrapper: ShallowWrapper;

    const clear = () => {
        {
            if (wrapper.exists()) {
                wrapper.unmount()
            }
            helpers.clearRootFontSize()
        }
    }

    afterEach(clear)
    
    it('doesn\'t render anything', () => {
        wrapper = shallow(<RootFontSize viewboxRatioX={1} viewboxRatioY={1} />)
        expect(wrapper.type()).toEqual(null)
    })

    it('correctly sets root font size on mount', () => {
        helpers.setViewport(1024, 768)
        wrapper = shallow(<RootFontSize viewboxRatioX={1} viewboxRatioY={1} />)
        expect(helpers.getRootFontSize()).toBe('7.68px')
        clear()
        
        helpers.setViewport(768, 1024)
        wrapper = shallow(<RootFontSize viewboxRatioX={1} viewboxRatioY={1} />)
        expect(helpers.getRootFontSize()).toBe('7.68px')
        clear()

        helpers.setViewport(1024, 768)
        wrapper = shallow(<RootFontSize viewboxRatioX={2} viewboxRatioY={1} />)
        expect(helpers.getRootFontSize()).toBe('10.24px')
        clear()

        helpers.setViewport(1024, 768)
        wrapper = shallow(<RootFontSize viewboxRatioX={4} viewboxRatioY={3} />)
        expect(helpers.getRootFontSize()).toBe('10.24px')
    })

    it('recalculates root font size after window resize', () => {
        helpers.setViewport(1024, 768)
        wrapper = shallow(<RootFontSize viewboxRatioX={1} viewboxRatioY={1} />)
        expect(helpers.getRootFontSize()).toBe('7.68px')

        helpers.setViewport(1024, 700)
        jest.advanceTimersByTime(DEBOUNCE_TIME)
        expect(helpers.getRootFontSize()).toBe('7px')

    })

    it('recalculates root font size as soon as props change', () => {
        helpers.setViewport(1024, 768)
        wrapper = shallow(<RootFontSize viewboxRatioX={1} viewboxRatioY={1} />)
        expect(helpers.getRootFontSize()).toBe('7.68px')

        wrapper.setProps({ viewboxRatioX: 2, viewboxRatioY: 1 })
        expect(helpers.getRootFontSize()).toBe('10.24px')
    })

    it('applies debounce while listening for window resize', () => {
        helpers.setViewport(1024, 768)
        wrapper = shallow(<RootFontSize viewboxRatioX={1} viewboxRatioY={1} />)
        expect(helpers.getRootFontSize()).toBe('7.68px')

        helpers.setViewport(1024, 700)
        expect(helpers.getRootFontSize()).toBe('7.68px')

        jest.advanceTimersByTime(DEBOUNCE_TIME / 2)
        expect(helpers.getRootFontSize()).toBe('7.68px')
        
        jest.advanceTimersByTime(DEBOUNCE_TIME)
        expect(helpers.getRootFontSize()).toBe('7px')
    })

    it('no longer reacts to window resize events after unmount', () => {
        helpers.setViewport(1024, 768)
        wrapper = shallow(<RootFontSize viewboxRatioX={1} viewboxRatioY={1} />)
        expect(helpers.getRootFontSize()).toBe('7.68px')

        wrapper.unmount()

        helpers.setViewport(1024, 700)
        jest.advanceTimersByTime(DEBOUNCE_TIME * 2)
        expect(helpers.getRootFontSize()).toBe('7.68px')
    })

})
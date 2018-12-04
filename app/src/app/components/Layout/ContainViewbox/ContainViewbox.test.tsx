import React from 'react'
import { shallow } from 'enzyme'

import { ContainViewbox } from './'

jest.mock('@app/config', () => ({
    viewboxRatio: {
        x: 4,
        y: 3
    }
}))
const ratio = 4 / 3;


describe('<ContainViewBox/ >', () => {

    it('renders without crashing', () => {
        const wrapper = shallow(<ContainViewbox />)
        expect(wrapper.exists()).toEqual(true)
    })

    it('renders children', () => {
        const wrapper = shallow(<ContainViewbox><i className="test"/></ContainViewbox>)
        expect(wrapper.exists('i.test')).toEqual(true)
    })

    it('uses correct aspect ratio', () => {
        const wrapper = shallow(<ContainViewbox />)
        expect(wrapper.find('div')
            .prop('style'))
            .toMatchObject({
                width: '100rem',
                height: `${100 * ratio}rem`
            })
    })

})
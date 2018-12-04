import React from 'react'
import { shallow } from 'enzyme'

import { Layout } from './'
import { RootFontSize } from '@app/components'

jest.mock('@app/config', () => ({
    viewboxRatio: {
        x: 4,
        y: 3
    }
}))

describe('<Layout/ >', () => {

    it('renders without crashing', () => {
        const wrapper = shallow(<Layout />)
        expect(wrapper.exists()).toEqual(true)
    })

    it('renders <RootFontSize /> with correct props', () => {
        const rootFontSize = shallow(<Layout />).find(RootFontSize)
        expect(rootFontSize.exists()).toEqual(true)
        expect(rootFontSize.props()).toMatchObject({
            viewboxRatioX: 4,
            viewboxRatioY: 3
        })
    })

    it('renders children', () => {
        const wrapper = shallow(<Layout><i className="test" /></Layout>)
        expect(wrapper.exists('i.test')).toEqual(true)
    })

})
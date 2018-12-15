import React from 'react'
import axios from 'axios';
import { render } from 'react-testing-library'
import MockAdapter from 'axios-mock-adapter';
import { useDownloader } from './useDownloader'

jest.useFakeTimers()

const flushPromises = () =>
    new Promise(resolve => setImmediate(resolve))

let currentResult: {
    response: any,
    progress: number,
    failure: boolean
}

const clearResult = () => currentResult = {
    response: null,
    progress: 0,
    failure: false
}

const StubComponent = ({ url }) => {
    const { response, progress, failure } = useDownloader(url)
    currentResult = {
        response,
        progress,
        failure
    }
    return null
}

describe('useDownloader hook', () => {

    let mockAdapter: MockAdapter
    let spyGet: jest.SpyInstance

    beforeEach(() => {
        mockAdapter = new MockAdapter(axios)
        spyGet = jest.spyOn(axios, 'get')
    })

    afterAll(() => {
        mockAdapter.restore()
        spyGet.mockRestore()
        clearResult()
    })

    it('requests the specified url', async () => {
        render(<StubComponent url="something.jpg" />)
        jest.runOnlyPendingTimers()
        await spyGet

        const requestedUrl = mockAdapter.history.get[0].url
        expect(requestedUrl).toBe('something.jpg')
    })

    it('cancels pending request when url changes', async () => {
        const component = render(<StubComponent url="something" />)
        jest.runOnlyPendingTimers()
        await spyGet

        const cancellation = mockAdapter.history.get[0].cancelToken!.promise

        component.rerender(<StubComponent url="someting_else" />)

        await expect(cancellation).resolves.toBeTruthy()
    })

    it('provides response on completion', async () => {
        mockAdapter.onGet('some_file').reply(200, 'SOME_DATA')

        render(<StubComponent url="some_file" />)
        jest.runOnlyPendingTimers()
        await spyGet
        await flushPromises()

        await expect(currentResult.response).toBe('SOME_DATA')
    })
    
    it('reports download failure', async () => {
        mockAdapter.onGet('some_file').reply(404)

        render(<StubComponent url="some_file" />)
        jest.runOnlyPendingTimers()
        await spyGet
        await flushPromises()

        await expect(currentResult.failure).toBe(true)
    })
    
    it('reports download progress', async () => {
        let updateDownloadProgress = (loaded: number, total: number) => {}

        mockAdapter.onGet('some_file').reply(config => {
            updateDownloadProgress = (loaded, total) => config.onDownloadProgress!({ loaded, total })
            return new Promise(() => {})
        })

        render(<StubComponent url="some_file" />)
        
        jest.runOnlyPendingTimers()
        await spyGet

        expect(currentResult.progress).toBe(0)
        updateDownloadProgress(10, 100);
        expect(currentResult.progress).toBe(0.1)
        updateDownloadProgress(50, 100);
        expect(currentResult.progress).toBe(0.5)
        updateDownloadProgress(100, 100);
        expect(currentResult.progress).toBe(1)
    })
})

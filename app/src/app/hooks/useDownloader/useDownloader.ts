import { useEffect, useState } from 'react'
import axios from 'axios'

/**
 * Attempts to download the specified resource and reports download progress.
 * 
 * @param url url of the resource to download
 * @return object containing response body, download progress, and error flag
 */
export const useDownloader = (url: string) => {
    const [response, setResponse] = useState<string|null>(null)
    const [progress, setProgress] = useState<number>(0)
    const [failure, setFailure] = useState<boolean>(false)

    useEffect(() => {

        const source = axios.CancelToken.source()
        axios
            .get(url, {
                onDownloadProgress: (e: ProgressEvent) => setProgress(e.loaded / e.total),
                cancelToken: source.token
            })
            .then(({ data }) => setResponse(data))
            .catch(() => setFailure(true))

        return () => source.cancel()
    }, [ url ])

    return {
        /** response body */
        response,
        /** download progress (a number between 0 and 1, the latter corresponding to 100% progress) */
        progress,
        /** true if there was an error downloading the resource */
        failure
    }
}

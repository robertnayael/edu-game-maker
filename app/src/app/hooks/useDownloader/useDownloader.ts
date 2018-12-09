import { useEffect, useState } from 'react' 

/**
 * Attempts to download the specified resource and reports download progress.
 * 
 * @param url url of the resource to download
 * @return object containing response body, download progress, and error flag
 */
export const useDownloader = (url: string) => {
    const [response, setResponse] = useState<string|null>(null)
    const [progress, setProgress] = useState<number>(0)
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        const req = new XMLHttpRequest()

        req.onprogress = e => setProgress(e.loaded / e.total)
        req.onreadystatechange = e => {
            if (req.readyState === 4 && req.status === 200) {
                setResponse(req.response)
            }
        }
        req.onerror = () => setError(true)
        
        req.open('get', url)
        req.send()

        return () => req.abort()
    }, [ url ])

    return {
        /** response body */
        response,
        /** download progress (a number between 0 and 1, the latter corresponding to 100% progress) */
        progress,
        /** true if there was an error downloading the resource */
        error
    }
}

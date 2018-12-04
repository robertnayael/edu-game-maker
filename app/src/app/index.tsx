import React from 'react'
import { App as AppContainer } from '@app/containers/App'
import { hot } from 'react-hot-loader'

import './styles/global.scss'

export const App = hot(module)(() => <AppContainer />)

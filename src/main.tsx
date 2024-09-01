import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

import ReactDOM from 'react-dom/client'

import './styles/index.scss'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'

import { store } from './app/store'
import { router } from './routes/router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)

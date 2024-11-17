const root = document.getElementById('root')
import { createRoot } from 'react-dom/client'
import { App } from '@/components/App'
import './index.scss'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Main } from './pages/Main'
import { About } from './pages/About'
import { Suspense } from 'react'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading</div>}>
        <App />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: '/about',
        element: <About />,
      },
    ],
  },
])

if (root) {
  createRoot(root).render(<RouterProvider router={router} />)
}

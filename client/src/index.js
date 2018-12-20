import './global-styles.css'
import React, {Suspense} from 'react'
import ReactDOM from 'react-dom'
import {Router} from '@reach/router'
import ErrorBoundary from 'react-error-boundary'
import ThemeProvider from './shared/theme-provider'
import {IsolatedContainer, LoadingMessagePage} from 'shared/pattern'
import * as ClientContext from './user-client'

const Home = React.lazy(() => import('./screens/home'))
const Products = React.lazy(() => import('./screens/products'))
const Product = React.lazy(() => import('./screens/product'))

function ErrorFallback({error}) {
  return (
    <IsolatedContainer>
      <p>There was an error</p>
      <pre style={{maxWidth: 700}}>{JSON.stringify(error, null, 2)}</pre>
    </IsolatedContainer>
  )
}

function App() {
  return (
    <Suspense
      fallback={<LoadingMessagePage>Loading Application</LoadingMessagePage>}
    >
      <ThemeProvider>
        <ClientContext.Provider>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Router>
              <Home path="/" />
              <Products path="items/search/:product" />
              <Product path="items/:id" />
            </Router>
          </ErrorBoundary>
        </ClientContext.Provider>
      </ThemeProvider>
    </Suspense>
  )
}

//Async mode on!
const ui = <App />
const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)
root.render(ui)

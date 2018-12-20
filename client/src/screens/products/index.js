/* @jsx jsx */
import {jsx} from '@emotion/core'

import {Suspense, useState, useContext} from 'react'
import PropTypes from 'prop-types'

import {LoadingMessagePage, mercadolibre} from 'shared/pattern'
import ProductList from './components/ProductList'
import {Context as ClientContext} from 'user-client'

import ProductsContext from './product-context'
const gql = String.raw
const PRODUCTS_QUERY = gql`
  query items($product: String!) {
    items(product: $product) {
      id
      title
      price {
        amount
        currency
      }
      picture
      address {
        city
        state
      }
      free_shipping
    }
  }
`

function Products({product}) {
  const {resource} = useContext(ClientContext)
  const data = resource.read({
    query: PRODUCTS_QUERY,
    variables: {product},
    key: product,
  })
  return (
    <ProductsContext.Provider value={data}>
      <ProductList />
    </ProductsContext.Provider>
  )
}
Products.propTypes = {
  product: PropTypes.string,
}

function SuspendedProducts(props) {
  return (
    <Suspense
      fallback={
        <LoadingMessagePage>
          Loading data for {props.product}
        </LoadingMessagePage>
      }
    >
      <Products {...props} />
    </Suspense>
  )
}

export default SuspendedProducts
/*
eslint
no-unused-vars: ["warn", {"varsIgnorePattern": "(jsx)"}]
react/react-in-jsx-scope: "off"
*/

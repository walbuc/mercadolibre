/* @jsx jsx */
import {jsx} from '@emotion/core'
import React, {useState} from 'react'
import {Suspense, useContext} from 'react'
import PropTypes from 'prop-types'
import {navigate, Link} from '@reach/router'
import styled from '@emotion/styled'
import {
  LoadingMessagePage,
  Text,
  mercadolibre,
  PrimaryButton,
  Image,
  Section,
} from 'shared/pattern'
import {Context as ClientContext} from 'user-client'
import {Container, Row, Column} from 'shared/layout'
import SearchBar from 'shared/components/SearchBar'
const CURRENCY = {ARS: '$'}

const Description = styled.p({fontSize: 16})

const gql = String.raw
const PRODUCTS_QUERY = gql`
  query item($id: ID!) {
    item(id: $id) {
      id
      title
      description
      price {
        amount
        currency
      }
      condition
      sold
      image
    }
  }
`

function Product({id}) {
  const [showError, setError] = useState({search: false})
  const handleSubmit = values => {
    const search = values.search.trim()
    navigate(`/items/search/${search}`)
  }

  const {resource} = useContext(ClientContext)
  const data = resource.read({
    query: PRODUCTS_QUERY,
    variables: {id},
    key: id,
  })
  const {item} = data
  return (
    <>
      <Container
        css={{
          width: '100%',
          margin: '0',
          padding: '0',
          minWidth: '-webkit-fill-available;',
        }}
      >
        <Column width="12">
          <Row css={{backgroundColor: '#FFE600'}}>
            <Link to="/">{mercadolibre}</Link>
            <SearchBar
              submit={handleSubmit}
              setError={setError}
              showError={showError}
            />
          </Row>
        </Column>
      </Container>
      <Container>
        <Row>
          <Column width="1" />
          <Column width="7">
            <Image responsive rounded alt={item.title} src={item.image} />
          </Column>
          <Column width="2">
            <Text
              size="standard"
              css={{fontWeight: 'normal', margin: '32px 0'}}
            >
              {item.condition} - {item.sold} vendidos
            </Text>
            <Text size="subheading" css={{margin: '16px 0'}}>
              {item.title}
            </Text>
            <Text size="superheading" css={{margin: '32px 0'}}>
              {CURRENCY[item.price.currency] || item.price.currency}
              {item.price.amount}
            </Text>
            <PrimaryButton
              css={{
                marginTop: 0,
                marginRight: '32px',
                width: '100%',

                backgroundColor: '#3483FA',
                color: 'white',
              }}
              onClick={'logout'}
            >
              Comprar
            </PrimaryButton>
          </Column>
          <Column width="2" />
        </Row>
        <Section />
        <Row>
          <Column width="1" />
          <Column width="7">
            <Text css={{fontSize: 24}}>Descripción del Producto</Text>
            <Description>{item.description}</Description>
          </Column>
          <Column width="4" />
        </Row>
      </Container>
    </>
  )
}
Product.propTypes = {
  id: PropTypes.string,
}

function SuspendedProduct(props) {
  return (
    <Suspense
      fallback={<LoadingMessagePage>Loading description</LoadingMessagePage>}
    >
      <Product {...props} />
    </Suspense>
  )
}

export default SuspendedProduct
/*
eslint
no-unused-vars: ["warn", {"varsIgnorePattern": "(jsx)"}]
react/react-in-jsx-scope: "off"
*/

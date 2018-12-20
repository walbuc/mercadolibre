/* @jsx jsx */
import {jsx} from '@emotion/core'
import React, {useState} from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled/macro'
import {Text, mercadolibre, shipping, Image} from 'shared/pattern'
import {Container, Row, Column} from 'shared/layout'
import ProductsContext from '../product-context'
import SearchBar from 'shared/components/SearchBar'
import {navigate, Link} from '@reach/router'

const Right = styled.div({float: 'right', margin: '30px 30px 10px'})
const Left = styled.div({float: 'left', margin: '32px 16px'})

function ProductsList({products}) {
  const [showError, setError] = useState({search: false})

  const handleSubmit = values => {
    const search = values.search.trim()
    navigate(`/items/search/${search}`)
  }
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
        <Column width="10">
          <ul
            css={{
              paddingLeft: 0,
              listStyle: 'none',
              marginTop: 0,
              marginBottom: 10,
            }}
          >
            {products.map(item => (
              <ProductListItem key={item.id} product={item} />
            ))}
          </ul>
        </Column>
      </Container>
    </>
  )
}

ProductsList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

const ListItem = styled.li(
  {padding: '20px 0', backgroundColor: 'white'},
  ({theme}) => theme.common.borderBottom,
)

const Address = styled(Text)({color: '#999999'})
Address.defaultProps = {size: 'substandard'}

function ProductListItem({product}) {
  return (
    <ListItem>
      <Right>
        <Address>{product.address.city}</Address>
        <p>
          <Address>{product.address.state}</Address>
        </p>
      </Right>

      <Left>
        <Link to={`/items/${product.id}`}>
          <Image responsive rounded alt={product.title} src={product.picture} />
        </Link>
      </Left>
      <div>
        <Text
          size="subheading"
          css={{
            display: 'inline-block',
            marginBottom: '0',
            marginRight: '15px',
            color: '#333333',
            fontWeight: 'normal',
            float: 'left',
          }}
        >
          {product.price.currency} {product.price.amount}
        </Text>
        <div css={{paddingTop: '15px'}}>
          {product.free_shipping ? shipping : null}
        </div>
      </div>
      <p>
        <Text
          size="superstandard"
          css={{marginTop: '32px', fontWeight: 'normal', color: '#999999'}}
        >
          {product.title}
        </Text>
      </p>
    </ListItem>
  )
}

ProductListItem.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
}

function ProductsListConsumer(props) {
  return (
    <ProductsContext.Consumer>
      {data => <ProductsList products={data.items} {...props} />}
    </ProductsContext.Consumer>
  )
}

export default ProductsListConsumer

/*
eslint
no-unused-vars: ["warn", {"varsIgnorePattern": "(jsx)"}]
react/react-in-jsx-scope: "off"
*/

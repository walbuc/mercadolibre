/* @jsx jsx */
import {jsx, css} from '@emotion/core'

import {useState, useEffect} from 'react'
import {navigate} from '@reach/router'
import {Container, Column, Row} from 'shared/layout'
import Loading from 'shared/loading'
import SearchBar from 'shared/components/SearchBar'
import styled from '@emotion/styled'
import {Text, mercadolibre} from 'shared/pattern'

const FieldError = styled(Text)({color: 'red'})
FieldError.defaultProps = {size: 'estandar'}

function Home() {
  //Preload for fast user response!
  useEffect(() => {
    import('../products')
  }, [])

  const [showLoading, setLoading] = useState(false)
  const [showError, setError] = useState({search: false})
  const handleSubmit = values => {
    const search = values.search.trim()
    navigate(`/items/search/${search}`)
  }

  return (
    <div>
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
            {mercadolibre}
            <SearchBar
              submit={handleSubmit}
              setError={setError}
              showError={showError}
            />
          </Row>
        </Column>
      </Container>
      <Container>
        <Column width="12">
          <Row>
            <FieldError>{showError.search}</FieldError>
          </Row>
        </Column>
      </Container>
    </div>
  )
}

export default Home

/*
eslint
no-unused-vars: ["warn", {"varsIgnorePattern": "(jsx)"}]
react/react-in-jsx-scope: "off"
*/

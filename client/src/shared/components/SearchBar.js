/* @jsx jsx */
import {jsx} from '@emotion/core'
import React from 'react'
import {Input, Button} from 'shared/pattern'
import {Formik} from 'formik'
import {search} from 'shared/pattern'

const validate = values => {
  let errors = {}
  if (!values.search) errors.search = 'Search can not be empty.'
  return errors
}

const SearchBar = ({submit, setError, showError}) => (
  <>
    <Formik initialValues={{search: ''}} onSubmit={submit} validate={validate}>
      {({values, errors, touched, handleChange, handleSubmit}) => {
        if (errors.search && touched.search && !showError.search)
          setError({search: errors.search})
        if (!errors.search && showError.search) setError({search: false})
        return (
          <form
            onSubmit={handleSubmit}
            css={{
              display: 'flex',
              justifyContent: 'center',
              maxWidth: 800,
              width: '80%',
              margin: '10px 0px 5px 10px',
            }}
          >
            <Input
              value={values.search}
              type="text"
              name="search"
              onChange={handleChange}
              placeholder={'Nunca dejes de buscar'}
              autoFocus
              css={{
                borderRight: 'none',
                borderTopRightRadius: '0',
                borderBottomRightRadius: '0',
                color: '#333333',
                marginBottom: '10px',
              }}
            />
            <Button
              css={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                backgroundColor: '#EEEEEE',
                borderColor: '#EEEEEE',
                height: '35px',
              }}
              type="submit"
            >
              {search}
            </Button>
          </form>
        )
      }}
    </Formik>
  </>
)

export default SearchBar
/*
eslint
no-unused-vars: ["warn", {"varsIgnorePattern": "(jsx)"}]
react/react-in-jsx-scope: "off"
*/

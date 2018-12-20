/* @jsx jsx */
import {jsx} from '@emotion/core'

import React, {useState, useEffect} from 'react'
import {unstable_createResource as createResource} from 'react-cache'
import {GraphQLClient} from 'graphql-request'

const ClientContext = React.createContext()
const {Provider, Consumer} = ClientContext

function ClientProvider(props) {
  function getClient() {
    const client = new GraphQLClient('/graphql', {})
    const resource = createResource(
      ({query, variables, normalize = data => data}) =>
        client.request(query, variables).then(normalize),
      queryArg =>
        queryArg.key ||
        JSON.stringify({query: queryArg.query, variables: queryArg.variables}),
    )
    return Object.assign(client, {resource})
  }

  const client = getClient()

  return <Provider value={client}>{props.children}</Provider>
}

export {ClientProvider as Provider, Consumer, ClientContext as Context}

/*
eslint
no-unused-vars: ["warn", {"varsIgnorePattern": "(jsx)"}]
react/react-in-jsx-scope: "off"
*/

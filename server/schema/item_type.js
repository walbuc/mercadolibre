const graphql = require('graphql')
const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean} = graphql
const axios = require('axios')

const ItemType = new GraphQLObjectType({
  name: 'ItemType',
  fields: () => ({
    id: {type: GraphQLID},
    title: {type: GraphQLString},
    picture: {
      type: graphql.GraphQLString,
      resolve: (parent, args, ctx) => parent.thumbnail,
    },
    price: {
      type: PriceType,
      resolve: parent => ({currency: parent.currency_id, amount: parent.price}),
    },
    condition: {
      type: GraphQLString,
    },
    free_shipping: {
      type: GraphQLString,
      resolve: (parent, args, ctx) => parent.shipping.free_shipping,
    },
    address: {
      type: AddressType,
      resolve: (parent, args, ctx) => ({
        city: parent.address.city_name,
        state: parent.address.state_name,
      }),
    },
  }),
})

const PriceType = new GraphQLObjectType({
  name: 'PriceType',
  fields: () => ({
    currency: {type: GraphQLString},
    amount: {type: GraphQLString},
  }),
})

const AddressType = new GraphQLObjectType({
  name: 'AddressType',
  fields: () => ({
    city: {type: GraphQLString},
    state: {type: GraphQLString},
  }),
})

const DescriptionItemType = new GraphQLObjectType({
  name: 'DescriptionItemType',
  fields: () => ({
    id: {type: GraphQLID},
    title: {type: GraphQLString},
    picture: {
      type: graphql.GraphQLString,
      resolve: (parent, args, ctx) => parent.thumbnail,
    },
    sold: {
      type: GraphQLString,
      resolve: (parent, args, ctx) => parent.sold_quantity,
    },
    condition: {
      type: GraphQLString,
    },
    price: {
      type: PriceType,
      resolve: parent => ({currency: parent.currency_id, amount: parent.price}),
    },
    condition: {
      type: GraphQLString,
    },
    free_shipping: {
      type: GraphQLString,
      resolve: (parent, args, ctx) => parent.shipping.free_shipping,
    },
    free_shipping: {
      type: GraphQLString,
      resolve: (parent, args, ctx) => parent.shipping.free_shipping,
    },
    image: {
      type: GraphQLString,
      resolve: (parent, args, ctx) => parent.pictures[0].secure_url,
    },
    description: {
      type: GraphQLString,
      resolve: (parent, args, ctx) => {
        const url = encodeURI(
          `https://api.mercadolibre.com/items/${parent.id}/description`,
        )
        return axios
          .get(url)
          .then(resp => resp.data.plain_text)
          .catch(err => {
            return err
          })
      },
    },
  }),
})
module.exports = {ItemType, DescriptionItemType}

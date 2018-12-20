const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
} = graphql
const {ItemType, DescriptionItemType} = require('./item_type')
const axios = require('axios')

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    items: {
      type: new GraphQLList(ItemType),
      args: {product: {type: new GraphQLNonNull(GraphQLString)}},
      resolve(parentValue, args) {
        const url = encodeURI(
          `https://api.mercadolibre.com/sites/MLA/search?q=​:${args.product}`,
        )

        return axios
          .get(url)
          .then(resp => resp.data.results)
          .catch(err => {
            return err
          })
      },
    },
    item: {
      type: DescriptionItemType,
      args: {id: {type: new GraphQLNonNull(GraphQLID)}},
      resolve(parentValue, args) {
        const url = encodeURI(`https://api.mercadolibre.com/items/${args.id}`)
        return axios
          .get(url)
          .then(resp => {
            return resp.data
          })
          .catch(err => {
            return err
          })
      },
    },
  }),
})

module.exports = RootQuery

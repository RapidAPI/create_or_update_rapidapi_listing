const graphql = require('graphql-request')
const { get_current_version } = require('./get_current_version')

/**
 * Fetch the id of the latest version of an API
 * @param {string} api_id The id of the API we want to get the latest version for
 * @param {object} client The GraphQL Client object for reuse
 * @return {object} An object containing the name and id of the latest version of this API
 */
async function get_current_api_version(api_id, client) {
    const query = graphql.gql`
    query apiVersions($where: ApiVersionWhereInput) {
        apiVersions(where: $where) {
          nodes {
            id
            name
            current
          }
        }
      }`

    const variables = {
        where: {
            apiId: api_id,
            versionStatus: 'ACTIVE',
        },
    }

    try {
        let res = await client.request(query, variables)
        if (res.status == 200) {
            return get_current_version(res.apiVersions.nodes)
        } else {
          throw new UnexpectedStatusError(`HTTP status is not 200, but ${res.status}`)
        }
    } catch (err) {
        throw "Unknown error in get_current_api_version"
    }
}

module.exports = { get_current_api_version }

import { valid } from 'semver'
import { NoCurrentVersionError, SpecParsingError } from './errors'

/**
 * Select the version set as current from a list of api_versions <br/>
 * There should always be a single API version set as current, so this function always
 * returns a single object containing the name and id of the API version set as current.
 * @param {array} versions List of version objects
 * @return {object} An object containing the name and id of the latest version of this API
 */
function getCurrentVersion (versions: any) {
  const current = versions.find((element: any) => element.current === true)
  if (current === undefined) {
    throw new NoCurrentVersionError(
      'No version is marked as current. That should be impossible!'
    )
  } else {
    if (valid(current.name) != null) {
      return {
        name: current.name,
        id: current.id
      }
    } else {
      throw new SpecParsingError(
                `Not a valid version according to semver: ${current.name}`
      )
    }
  }
}

export { getCurrentVersion }

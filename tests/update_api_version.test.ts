import { updateApiVersion } from '../src/update_api_version'
import nock = require('nock')
import * as fs from 'fs'

afterEach(() => {
  jest.restoreAllMocks()
})

const contents = JSON.stringify({
  openapi: '3.0.0',
  servers: [
    {
      url: 'https://my_gateway.com'
    }
  ]
})

const res = {
  updateApisFromRapidOas: {
    apiId: 'the_id_we_are_looking_for'
  }
}

test('handling update_api_version reponse', async () => {
  const mockRead = jest
    .spyOn(fs, 'readFileSync')
    .mockImplementation((filename) => contents)
  nock('https://platform-graphql.p.rapidapi.com').post('/').reply(200, res)
  expect(
    await updateApiVersion(
      '/home/someuser/test_spec.json',
      'an_api_version'
    )
  ).toEqual(200)
  mockRead.mockRestore()
})

export {}

import * as fs from 'fs'
import { readSpec } from '../src/read_spec'

const contents = JSON.stringify({
  openapi: '3.0.0',
  servers: [
    {
      url: 'https://my_gateway.com'
    }
  ]
})

test('read a spec file into memory', () => {
    jest.spyOn(fs, 'readFileSync')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .mockImplementation(((filename: string) => contents) as typeof fs.readFileSync)
  expect(readSpec('/home/someuser/test_spec.json')).toStrictEqual(
    JSON.parse(contents)
  )
})

test('read a spec file into memory', () => {
    jest.spyOn(fs, 'readFileSync')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .mockImplementation(((filename: string) => contents) as typeof fs.readFileSync)
  expect(readSpec('/home/someuser/test_spec.json')).toStrictEqual(
    JSON.parse(contents)
  )
})
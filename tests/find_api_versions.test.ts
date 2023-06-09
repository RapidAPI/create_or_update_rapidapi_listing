import { apiVersions, apiVersionStatus } from '../src/types'
import { findClosest, findNewer, findOlder } from '../src/find_api_versions'

const versionList: apiVersions = {
  'nodes': [
    {
      id: 'apiversion_a6ee5ca5-3bca-47b0-95a6-zzzzzzzzz059',
      name: '0.5.9',
      current: false,
      versionStatus: apiVersionStatus.active
    },
    {
      id: 'apiversion_a6ee5ca5-3bca-47b0-95a6-ba02c06fb043',
      name: '0.4.3',
      current: true,
      versionStatus: apiVersionStatus.draft
    },
    {
      id: 'apiversion_a6ee5ca5-3bca-47b0-95a6-zzzzzzzzz042',
      name: '0.4.2',
      current: false,
      versionStatus: apiVersionStatus.active
    },
    {
      id: 'apiversion_a6ee5ca5-3bca-47b0-95a6-zzzzzzzz0510',
      name: '0.5.10',
      current: false,
      versionStatus: apiVersionStatus.active
    },
    {
      id: 'apiversion_a6ee5ca5-3bca-47b0-95a6-zzzzzzzz$359',
      name: '3.5.9',
      current: false,
      versionStatus: apiVersionStatus.active
    },
    {
      id: 'apiversion_a6ee5ca5-3bca-47b0-95a6-zzzzzzzzz102',
      name: '1.0.2',
      current: false,
      versionStatus: apiVersionStatus.active
    },
    {
      id: 'apiversion_a6ee5ca5-3bca-47b0-95a6-zzzzzzzzz159',
      name: '1.5.9',
      current: false,
      versionStatus: apiVersionStatus.active
    },
    {
      id: 'apiversion_a6ee5ca5-3bca-47b0-95a6-zzzzzzzzz062',
      name: '0.6.2',
      current: false,
      versionStatus: apiVersionStatus.active
    },
  ]
}

const olderVersionList = [
  {
    id: 'apiversion_a6ee5ca5-3bca-47b0-95a6-ba02c06fb043',
    name: '0.4.3',
    current: true,
    versionStatus: apiVersionStatus.draft
  },
  {
    id: 'apiversion_a6ee5ca5-3bca-47b0-95a6-zzzzzzzzz042',
    name: '0.4.2',
    current: false,
    versionStatus: apiVersionStatus.active
  },
]

const newerVersionList = [
  {
    id: 'apiversion_a6ee5ca5-3bca-47b0-95a6-zzzzzzzz$359',
    name: '3.5.9',
    current: false,
    versionStatus: apiVersionStatus.active
  },
  {
    id: 'apiversion_a6ee5ca5-3bca-47b0-95a6-zzzzzzzzz102',
    name: '1.0.2',
    current: false,
    versionStatus: apiVersionStatus.active
  },
  {
    id: 'apiversion_a6ee5ca5-3bca-47b0-95a6-zzzzzzzzz159',
    name: '1.5.9',
    current: false,
    versionStatus: apiVersionStatus.active
  },
  {
    id: 'apiversion_a6ee5ca5-3bca-47b0-95a6-zzzzzzzzz062',
    name: '0.6.2',
    current: false,
    versionStatus: apiVersionStatus.active
  },
]

test('return only older apiVersion objects from a list correctly', () => {
  expect(findOlder(versionList, '0.4.4')).toEqual(olderVersionList)
})

test('return only newer apiVersion objects from a list correctly', () => {
  expect(findNewer(versionList, '0.5.12')).toEqual(newerVersionList)
})

const res041 = {
  id: 'apiversion_a6ee5ca5-3bca-47b0-95a6-zzzzzzzzz042',
  name: '0.4.2',
  current: false,
  versionStatus: apiVersionStatus.active
}

const res045 = {
  id: 'apiversion_a6ee5ca5-3bca-47b0-95a6-ba02c06fb043',
  name: '0.4.3',
  current: true,
  versionStatus: apiVersionStatus.draft
}

const res200 = {
  id: 'apiversion_a6ee5ca5-3bca-47b0-95a6-zzzzzzzzz159',
  name: '1.5.9',
  current: false,
  versionStatus: apiVersionStatus.active
}

const res400 = {
  id: 'apiversion_a6ee5ca5-3bca-47b0-95a6-zzzzzzzz$359',
  name: '3.5.9',
  current: false,
  versionStatus: apiVersionStatus.active
}

test.each([
  { a: versionList, b: '0.4.1', expected: res041 },
  { a: versionList, b: '0.4.5', expected: res045 },
  { a: versionList, b: '1.5.2', expected: res200 },
  { a: versionList, b: '2.0.0', expected: res200 },
  { a: versionList, b: '4.0.0', expected: res400 }
])('find closest apiVersion to $b.version', ({ a, b, expected }) => {
  expect(findClosest(a.nodes, b)).toEqual(expected)
})
import * as fs from 'fs'

/**
 * Return JSON string containing the contents of an OAS
 * @param {string} oas Path to OAS
 * @return {string} The contents of the OAS
 */
export function readSpec (oas: string): string {
  try {
    const spec = fs.readFileSync(oas, 'utf-8')
    try {
      return JSON.parse(spec)
    } catch (e) {
      throw new Error("Couldn't parse file: " + oas)
    }
  } catch (e) {
    console.log(e)
    throw new Error('Could not read file: ' + oas)
  }
}

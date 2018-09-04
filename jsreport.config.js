
const chromeSchema = {
  type: 'object',
  properties: {
    timeout: { type: 'number' },
    launchOptions: {
      type: 'object',
      properties: {
        args: {
          anyOf: [{
            type: 'string',
            '$jsreport-constantOrArray': []
          }, {
            type: 'array',
            items: { type: 'string' }
          }]
        }
      }
    }
  }
}

module.exports = {
  'name': 'chrome-img',
  'main': 'lib/chrome.js',
  'optionsSchema': {
    chrome: { ...chromeSchema },
    extensions: {
      'chrome-img': { ...chromeSchema }
    }
  },
  'dependencies': [ 'templates' ]
}

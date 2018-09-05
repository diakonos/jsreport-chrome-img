import Properties from './ChromeProperties.js'
import Studio from 'jsreport-studio'
import ChromeEditor from './ChromeEditor.js'
import * as Constants from './constants.js'
import ChromeTitle from './ChromeTitle.js'

Studio.addPropertiesComponent('chrome img', Properties, (entity) => entity.__entitySet === 'templates' && entity.recipe === 'chrome-img')

Studio.addApiSpec({
  template: {
    chrome: {
      displayHeaderFooter: false,
      fullPage: true,
      mediaType: 'print|screen',
      omitBackground: false,
      type: 'png|jpeg'
    }
  }
})

Studio.addEditorComponent(Constants.CHROME_TAB_EDITOR, ChromeEditor)
Studio.addTabTitleComponent(Constants.CHROME_TAB_TITLE, ChromeTitle)
Studio.entityTreeIconResolvers.push((entity) => (entity.__entitySet === 'templates' && entity.recipe === 'chrome-img') ? 'fa-file-image-o' : null)

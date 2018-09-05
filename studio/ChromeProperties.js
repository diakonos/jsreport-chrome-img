import React, { Component } from 'react'
import Studio from 'jsreport-studio'
import * as Constants from './constants.js'

export default class Properties extends Component {
  constructor (props) {
    super(props)

    this.applyDefaultsToEntity = this.applyDefaultsToEntity.bind(this)
    this.changeChrome = this.changeChrome.bind(this)
  }

  componentDidMount () {
    this.applyDefaultsToEntity(this.props)
  }

  componentWillReceiveProps (nextProps) {
    // when component changes because another template is created
    if (this.props.entity._id !== nextProps.entity._id) {
      this.applyDefaultsToEntity(nextProps)
    }
  }

  inform () {
    if (Studio.getSettingValueByKey('chrome-header-informed', false) === true) {
      return
    }

    Studio.setSetting('chrome-header-informed', true)

    Studio.openModal(() => (
      <div>
        Here you can define chrome native headers/footers.
        Make sure "display header/footer" is selected and use margin to prepare the space for the header.
        <br />
        Please note chrome currently prints headers with smaller font size and you need to style text explicitly to workaround it.
        <br />
        <br />
        <b>
          The chrome native implementation is also very limited and we recommend to use jsreport
          <a href='https://jsreport.net/learn/pdf-utils' target='_blank'> pdf utils extension</a> in more complex use cases.
        </b>
      </div>
    ))
  }

  openHeaderFooter (type) {
    this.inform()

    Studio.openTab({
      key: this.props.entity._id + 'chrome' + type,
      _id: this.props.entity._id,
      headerOrFooter: type,
      editorComponentKey: Constants.CHROME_TAB_EDITOR,
      titleComponentKey: Constants.CHROME_TAB_TITLE
    })
  }

  applyDefaultsToEntity (props) {
    const { entity } = props
    let entityNeedsDefault = false

    if (
      entity.__isNew &&
      (entity.chrome == null || entity.chrome.omitBackground == null)
    ) {
      entityNeedsDefault = true
    }

    if (entityNeedsDefault) {
      this.changeChrome(props, {
        fullPage: true,
        omitBackground: false,
        type: 'png'
      })
    }
  }

  changeChrome (props, change) {
    const { entity, onChange } = props
    const chrome = entity.chrome || {}

    onChange({
      ...entity,
      chrome: { ...chrome, ...change }
    })
  }

  render () {
    const { entity } = this.props
    const chrome = entity.chrome || {}
    const changeChrome = this.changeChrome

    return (
      <div className='properties-section'>
        <div className='form-group'><label>image type</label>
          <select value={chrome.type || 'png'} onChange={(v) => changeChrome(this.props, { type: v.target.value })}>
            <option key='png' value='png'>png</option>
            <option key='jpeg' value='jpeg'>jpeg</option>
          </select>
        </div>
        <div className='form-group'>
          <label>omit background</label>
          <input
            type='checkbox' checked={chrome.omitBackground === true}
            onChange={(v) => changeChrome(this.props, { omitBackground: v.target.checked })} />
        </div>
        <div className='form-group'>
          <label>print full page</label>
          <input
            type='checkbox' checked={chrome.fullPage === true}
            onChange={(v) => changeChrome(this.props, { fullPage: v.target.checked })} />
        </div>
        <div className='form-group'>
          <label>display header/footer</label>
          <input
            type='checkbox' checked={chrome.displayHeaderFooter === true}
            onChange={(v) => changeChrome(this.props, { displayHeaderFooter: v.target.checked })} />
        </div>
        <div className='form-group'>
          <label>header</label>
          <button onClick={() => this.openHeaderFooter('header')}>open in tab...</button>
        </div>
        <div className='form-group'>
          <label>footer</label>
          <button onClick={() => this.openHeaderFooter('footer')}>open in tab...</button>
        </div>
        <div className='form-group'><label>media type</label>
          <select value={chrome.mediaType || 'print'} onChange={(v) => changeChrome(this.props, { mediaType: v.target.value })}>
            <option key='print' value='print'>print</option>
            <option key='screen' value='screen'>screen</option>
          </select>
        </div>
        <div className='form-group'>
          <label>wait for network iddle</label>
          <input
            type='checkbox' checked={chrome.waitForNetworkIddle === true}
            onChange={(v) => changeChrome(this.props, { waitForNetworkIddle: v.target.checked })} />
        </div>
        <div className='form-group'>
          <label title='window.JSREPORT_READY_TO_START=true;'>wait for printing trigger</label>
          <input
            type='checkbox' title='window.JSREPORT_READY_TO_START=true;' checked={chrome.waitForJS === true}
            onChange={(v) => changeChrome(this.props, { waitForJS: v.target.checked })} />
        </div>
      </div>
    )
  }
}

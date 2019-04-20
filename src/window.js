import BrowserWindow from 'sketch-module-web-view'
import Settings from 'sketch/settings'

const emptySetting = { ttsList: [] }
const SettingID = 'praise.ttsList'
let browserWindow = null

export default () => {
  const options = {
    identifier: 'net.duanjun.praise.window',
    width: 260,
    height: 320,
    minWidth: 260,
    minHeight: 300,
    show: false,
    title: ' ',
  }

  browserWindow = new BrowserWindow(options)
  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
  })
  const { webContents } = browserWindow
  webContents.on('nativeLog', (data) => {
    const setting = Settings.settingForKey(SettingID)
    if (data.type === 'get-list') {
      if (setting && typeof setting.ttsList === 'object' && setting.ttsList.length > 0) {
        const stringify = `["${setting.ttsList.join('","')}"]`
        // 必须将数组字符串化，否则无法在executeJavaScript正常运行

        webContents.executeJavaScript(`window.setTTS(${stringify})`)
      } else {
        Settings.setSettingForKey(SettingID, emptySetting)
        webContents.executeJavaScript('window.setTTS()')
      }
    }
    if (data.type === 'set-list' && data.value !== setting.ttsList) {
      Settings.setSettingForKey(SettingID, { ttsList: data.value })
    }
    if (data.type === 'get-token') {
      const token = Settings.settingForKey('praise.token')
      if (token) {
        webContents.executeJavaScript(`window.setToken("${token}")`)
      }
    }
  })

  browserWindow.loadURL(require('../resources/webview.html'))
}

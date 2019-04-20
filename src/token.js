import UI from 'sketch/ui'
import Settings from 'sketch/settings'

const SettingID = 'praise.token'

export default () => {
  const oldtoken = Settings.settingForKey(SettingID)
  let token = ''
  if (oldtoken && oldtoken !== '') {
    token = oldtoken
  }
  UI.getInputFromUser(
    '请输入你的百度语音合成token',
    {
      initialValue: token,
    },
    (err, value) => {
      if (err) {
        UI.message('token未保存')
      } else if (!value || value === '') {
        UI.message('token未保存')
      } else {
        Settings.setSettingForKey(SettingID, value)
        UI.message('新token已保存')
      }
    },
  )
}

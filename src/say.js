import { isWebviewPresent, sendToWebview } from 'sketch-module-web-view/remote'

export function sayit(context) {
  if (isWebviewPresent('net.duanjun.praise.window')) {
    sendToWebview('net.duanjun.praise.window', 'window.say()')
  }
}

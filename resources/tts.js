import qs from 'qs'
import { Howl } from 'howler'

const TOKEN = '24.2800735748f43ed91f0f17c0bb88f80f.2592000.1558071839.282335-16040386'
const url = (text, token) => {
  const qr = qs.stringify({
    lan: 'zh',
    ctp: 1,
    cuid: 'sketch666',
    tok: token,
    tex: text,
    vol: 5,
    per: 0,
    spd: 5,
    pit: 5,
    aue: 3,
  })
  return `https://tsn.baidu.com/text2audio?${qr}`
}
const tts = (sentence, token) => {
  if (typeof sentence !== 'string') return null
  let usertoken = token
  if (!token || token === '') {
    usertoken = TOKEN
  }
  const sound = new Howl({
    src: [url(sentence, usertoken)],
    autoplay: true,
    format: ['mp3'],
  })
}
export default tts

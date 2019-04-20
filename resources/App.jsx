import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import tts from './tts'

function giveMeOne() {
  const list = window.ttsList
  if (typeof list !== 'object') return
  if (list.length < 1) return
  let rand = Math.random() * (list.length - 1)
  rand = Math.round(rand)
  return list[rand]
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      userInput: '',
      stcs: [],
    }
  }

  componentDidMount() {
    window.setTTS = (data) => {
      window.ttsList = data || []
      this.setState({ stcs: window.ttsList })
    }
    window.setToken = (token) => {
      window.token = token
    }
    window.say = () => {
      tts(giveMeOne(), window.token)
    }
    window.postMessage('nativeLog', {
      type: 'get-list',
    })
    window.postMessage('nativeLog', {
      type: 'get-token',
    })
  }

  saveList(list) {
    window.postMessage('nativeLog', {
      type: 'set-list',
      value: list,
    })
  }

  render() {
    const { userInput, stcs } = this.state
    return (
      <Scrollbars style={{ width: '100vw', height: '100vh' }}>
        <div className="flex">
          <div className="head">
            <h1>
              <span role="img" aria-label="赞">
                👍
              </span>
              <span>真了不起！</span>
            </h1>
            <span className="sub">你已开启了Sketch夸夸群</span>
          </div>
          <div className="content">
            <input
              className="text-input"
              type="text"
              value={userInput}
              onChange={(e) => {
                this.setState({
                  userInput: e.target.value,
                })
              }}
              placeholder="输入候选夸夸语句"
              onKeyUp={(e) => {
                if (e.keyCode === 13 && userInput !== '') {
                  tts(userInput, window.token)
                  this.setState((prev) => {
                    const arr = prev.stcs
                    arr.push(prev.userInput)
                    this.saveList(arr)
                    return { userInput: '', stcs: arr }
                  })
                }
              }}
            />
            <div className="sentences">
              {stcs.map((stc, i) => (
                <List
                  stc={stc}
                  key={i}
                  onRemove={() => {
                    this.setState((prev) => {
                      const arr = prev.stcs
                      arr.splice(i, 1)
                      this.saveList(arr)
                      return { stcs: arr }
                    })
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </Scrollbars>
    )
  }
}
export default App
const List = ({ stc, onRemove }) => (
  <div className="list-item">
    <div className="text">{stc}</div>
    <div className="remove" onClick={onRemove}>
      <svg viewBox="0 0 16 16">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g fill="#000000" fillRule="nonzero">
            <rect
              id="矩形"
              opacity="0"
              x="0"
              y="0.0156097561"
              width="15.9843902"
              height="15.9843902"
            />
            <path d="M9.40506766,8.00776398 L15.6918648,1.72096688 C16.0820075,1.33082416 16.0820075,0.698277815 15.6918648,0.308135087 C15.301722,-0.082007641 14.6691757,-0.082007641 14.279033,0.308135087 L7.99223586,6.59493218 L1.70543877,0.308291184 C1.31529604,-0.0818515434 0.682749698,-0.0818515434 0.29260697,0.308291184 C-0.097535758,0.698433912 -0.097535758,1.33098025 0.29260697,1.72112298 L6.57940407,8.00776398 L0.292763067,14.2945611 C-0.0973796605,14.6847038 -0.0973796605,15.3172501 0.292763067,15.7073929 C0.682905795,16.0975356 1.31545214,16.0975356 1.70559486,15.7073929 L7.99223586,9.42059578 L14.279033,15.7073929 C14.6691757,16.0975356 15.301722,16.0975356 15.6918647,15.7073929 C16.0820075,15.3172501 16.0820075,14.6847038 15.6918648,14.2945611 L9.40506766,8.00776398 Z" />
          </g>
        </g>
      </svg>
    </div>
  </div>
)

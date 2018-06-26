// @flow
import * as React from 'react'
import {Animated, Keyboard as KeyboardAPI, Platform} from 'react-native'

// $FlowFixMe Todo
const {Consumer, Provider} = React.createContext()

type KeyboardEvent = {
  endCoordinates: {
    height: number,
  }
}
type Props = {
  onAnimationComplete?: () => any,
  forceAndroid?: boolean,
  children: Node | React.Element<*>,
}
type State = {
  keyboardHeight: number,
  keyboardActive: boolean,
  keyboardAnimation: Animated.Value
}
type Context = {
  ...State,
  dismiss: () => void,
}

class KeyboardProvider extends React.Component<Props, State> {
  state = {
    keyboardHeight: 0,
    keyboardActive: false,
    keyboardAnimation: new Animated.Value(0),
  }
  hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide'
  showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow'
  onHideSub: any
  onShowSub: any
  
  constructor(props: Props) {
    super(props)
    this.onHideSub = KeyboardAPI.addListener(this.hideEvent, this.onHide)
    this.onShowSub = KeyboardAPI.addListener(this.showEvent, this.onShow)
  }
  
  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.props.forceAndroid || Platform.OS === 'ios') {
      if (
        (this.state.keyboardActive && !prevState.keyboardActive) ||
        (this.state.keyboardActive && this.state.keyboardHeight !== prevState.keyboardHeight)
      ) {
        this.animate(this.state.keyboardHeight)
      }
      else if (!this.state.keyboardActive && prevState.keyboardActive) {
        this.animate(0)
      }
    }
  }
  
  onHide = (event: KeyboardEvent) =>
    this.onChange({
      keyboardActive: false,
    })
  onShow = (event: KeyboardEvent) =>
    this.onChange({
      keyboardHeight: event.endCoordinates && event.endCoordinates.height,
      keyboardActive: true
    })
  onChange = ({keyboardHeight = this.state.keyboardHeight, keyboardActive}: { keyboardHeight?: number, keyboardActive: boolean }) =>
    this.setState({keyboardHeight, keyboardActive})
  
  componentWillUnmount() {
    KeyboardAPI.removeListener(this.hideEvent, this.onHideSub)
    KeyboardAPI.removeListener(this.showEvent, this.onShowSub)
  }
  
  animate = (toValue: number) => {
    Animated.timing(
      this.state.keyboardAnimation,
      {toValue}
    ).start(this.props.onAnimationComplete)
  }
  
  dismiss = () => KeyboardAPI.dismiss()
  
  render() {
    return (
      <Provider value={{...this.state, dismiss: this.dismiss}}>
        {this.props.children}
      </Provider>
    )
  }
}

const KeyboardConsumer = Consumer

const Keyboard = ({children, ...props}: { ...Props, children: (Context) => Node | React.Element<*> }) => (
  <KeyboardProvider {...props}>
    <KeyboardConsumer children={children}/>
  </KeyboardProvider>
)

const KeyboardAnimatedView = (props: {...Props, children?: void}) =>
  <Keyboard {...props}>
    {
      ({keyboardAnimation, keyboardHeight}: Context) =>
        <Animated.View style={{height: keyboardAnimation}}/>
    }
  </Keyboard>

export {KeyboardProvider, KeyboardConsumer, Keyboard, KeyboardAnimatedView}
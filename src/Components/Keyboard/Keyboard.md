# Keyboard

This module includes the following components:

* **KeyboardProvider**
* **KeyboardConsumer**
* **Keyboard**
* **KeyboardAnimatedView**

### KeyboardProvider & -Consumer

These components are the basic building blocks of the other 2. The Provider generates 
a keyboard-related context value for you to pull out of the consumer. The context's value's
shape is as follows:

    {
        keyboardActive: boolean,
        keyboardHeight: number,
        keyboardAnimation: Animated.Value,
        dismiss: () => void,
    } 
    
| Prop             | Type             | Description           |
| :--------------- | :--------------- | :-------------------- | 
| `keyboardActive` | boolean | Whether or not the keyboard is displayed. |
| `keyboardHeight` | number | The current height of the keyboard. |
| `keyboardAnimation` | Animated.Value | An animated value that's animated to the keyboard's height. |
| `dismiss` | () => void | React Native's `Keyboard.dismiss`-function. |      
        
The provider takes the following props to configure itself:

| Prop             | Type             | Description           |
| :--------------- | :--------------- | :-------------------- | 
| `forceAndroid` | boolean | Force the animation on Android. This is needed because android has some keyboard-handling by default. |
| `onAnimationComplete` | (Optional) () => any | Called when the animated value completes its animation. |

**Example**

    <KeyboardProvider>
        <View>
          <Text>This is some UI</Text>
          <TextInput/>
          <KeyboardConsumer>
            {({keyboardActive}) => 
              <Text>
                The keyboard is {keyboardActive ? 'active' : 'inactive'}!
              </Text>
            }
          </KeyboardConsumer>
        </View>
    </KeyboardProvider> 

### Keyboard
Oftentimes, you don't need to have a Provider with nested Consumers. I feel you.
The `Keyboard`-component takes the same props as the provider and a FAC, which provides you
with the exact same properties as you would using the Consumer.

**Example** 
 
    <View>
      <Text>This is some UI</Text>
      <TextInput/>
      <Keyboard>
        {({keyboardActive}) => 
          <Text>
            The keyboard is {keyboardActive ? 'active' : 'inactive'}!
          </Text>
        }
      </Keyboard>
    </View>
    
### KeyboardAnimatedView
A component you can, with minimal setup, put in your layout. Its height will be animated
to match the keyboard's.     
This allows you to animate your screens as the keyboard pops up.  
It takes the same props as the Provider.

### Advanced Usage
You mostly will be using the `KeyboardAnimatedView` for simple keyboard-handling.
But sometimes it might be a good idea to scale a logo whenever the keyboard pops up,
to provide a smooth experience without some more flair.

This is where the FAC with the included `keyboardHeight` and `keyboardAnimation` come in. 
Using these, you can interpolate to whatever values look pretty in your specific case.

# Native System
A set of utils, views and systems to help you structure and use your theme 
and create your dynamically themed components using `glamorous`.  
**Inspired by `styled-system` &  focused on `react-native`.**

## The idea
The library makes use of a theme containing a set of colors, 
an array of easily accessible spacings and sub-themes.  
Every sub-theme contains a default styling, but also modified versions, which
can be merged with the default one, making it easy to create variations of 
existing components.  
The theme-object will look something like this when written out:  

    {
        colors: {
            [colorName: string]: Color,
        },
        spacing: number[],
        
        [subThemeName: string]: {
            default: {
                // ... some styles 
            },
            [modifier string]: {
                // ... some different styles
            }
        }
    }
    
An api to build the theme up from scratch (or from a default one) is provided.

Aside from the theming structure, the library provides a set of utilities to
easily extract certain colors or sub-themes from the root-theme, including easy
helpers to provide dynamic styling to `glamorous`-type components (this would also 
work with `styled-components` or `emotion`).

Additionally, there are components included which I personally find 
important when creating my React Native apps (they are not compatible for web, sadly). 
Some might be more useful to you and your app than others.   
These include the following:   
  * **Keyboard Handling**  
    A component sent using context to easily animate components across a component-tree
    to handle the keyboard gracefully.
  * **Containers**  
    A range of containers:
    * **Screen**: easy wrapper to configure properties related to your app's screen, 
    like the StatusBar.
    * **Row**: a row/list-entry component with a wide range of configurations.
    * **Card**: a material design-styled card.
    * **Absolute**: a pre-styled component that's positioned absolutely and takes 
    positioning props.
    * **Modal**: A wrapper around React Native's native modal, with included overlay and 
    a component to prevent propagation of the close-event.
    * **SimpleModal**: A pre-composed modal. Just pass in some children and handlers.
    * **CardModal**: A modal styled like a card.
    * **DismissArea**: A component handling touches outside of `TextInput`s to dismiss
    the keyboard.
  *  **Coordinator**: A powerful helper-component to easily coordinate more complex 
  animations, so you don't have to spend ages writing interpolations and positioning.
  * **Input**: A wrapper around React Native's `TextInput` & a helper to more easily wire 
  up your inputs with Formik. Also contains styled `TextInput`s with error-handling and such.
  * **Button**:
    * **Base**: A wrapper for your mark-up to easily add native touch handling without 
    impacting your layout.
    * **Button**: A styled button component.
  * **Misc**:
    * **Text**: A text component. Wow.
    * **Separator**: A line. To separate things.
    * **WithThemeFAC**: I like FACs. So I made this. Allows you to get values out of 
    your theme without using a higher order component per se.
    * **Spinner**: For when your app has not loaded data yet.
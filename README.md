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
helpers to provide dynamic styling to `glamorous` components.

There are also some `react-native` components making use of the theme provided, such as:
* SystemView (which can easily be styled by shorthand props)
* Buttons
* Text

# Theming
The starting point of `nativesystem` was to provide a systematic approach to theming.
In this case it is done by specifying a theme with the following characteristics:  

* a `colors` map, mapping a name to a color-code.
* a `spacings` array, containing common spacings throughout your app.
* **subthemes**


### Subthemes

The subthemes are what makes this library easy to use.  
A subtheme can be the theming related to one component/design feature. Every subtheme 
has its default theme (for example your standard button), and can contain several modifiers 
(for example rounded button or accent button styling).  

A subtheme would end up looking like this:

    button: {
        default: {
            borderRadius: 5,
            height: 56,
            paddingHorizontal: 8,
        },
        round: {
            borderRadius: 56 * 0.5,
            width: 56,
        },
    }
    
You would end up using these subthemes as follows:
    
    const theme = {....}
    const mySubTheme = subTheme('button)
    
    <Button style={subTheme({theme, modifier: 'round'})}/>
    
This is very easy to implement using 
something like `glamorous-native` or `styled-components`:

    const StyledButton = g(Button)(
        subTheme('button')
    )
    
These modifiers can then be passed through props (theme will be automatically injected):

    <StyledButton modifier="round"/>
    <StyledButton modifier={['round', 'accent']}/>
    
### Utils
Aside from subthemes, `nativesystem` provides more functions to easily 
access values from themes, or style components.

#### getColor
`(theme: Theme, color: string) => Color`
  
Gets a color-value from your theme.  
**Arguments**
* `theme: Theme`: Your theme
* `color: string`: The name of your color or a color-value.

**Returns**  
A color value if it's found in your theme. Otherwise it will return your `color`-argument.

#### getSpacing
`(theme: Theme, spacing: number) => Spacing`  

Gets a spacing-value from your theme.  
**Arguments**
* `theme: Theme`: your theme
* `spacing: number`: the index of which common spacing you wish to retrieve.

**Returns**
The spacing if it's found in your theme, otherwise it will return your `spacing` -argument.

#### elevationStyle
`(elevation: number) => Styles` 

Provides shadow-styling for both Android and iOS.   
**Arguments**  
* `elevation: number`: the Android elevation value 

**Returns**   
Dropshadow styling for both platforms.

#### subThemeWithModifier
`(theme: Theme, subThemeName: string, modifier: ?Modifier | Modifier[],) => Styles`

Returns your subtheme with the modifier applied.    
**Arguments**  
* `theme: Theme`: your theme
* `subThemeName: string`: the name of your subtheme
* `modifier: ?Modifier | Modifier[]`: an optional modifier or array of modifiers.

**Returns**  
Styling!

### System
Functions to easily create a styled component that applies styling based on 
(shorthanded) props.  
The used properties are oftentimes abbreviated to quickly mark up layouts.  
The possible values are the same as you would normally pass to flexbox-styling.  
**A lot of these require the theme to be included in the properties.**

#### flex
`(FlexProps) => Style`

Takes a component's properties and returns flexbox-related styling.  

| Prop             | Type             | Style           |
| :--------------- | :--------------- | :-------------- | 
| `f` | number | flex | 
| `fd` | string | flexDirection |
| `jc` | string | justifyContent |
| `ai` | string | alignItems |
| `as` | string | alignSelf |
| `fw` | string | flexWrap |

#### size
`(SizeProps) => Style`  

Takes a component's properties and returns size-related styling.

| Prop             | Type             | Style           |
| :--------------- | :--------------- | :-------------- | 
| `w` | number | width |
| `h` | number | height |

#### space
`(SpaceProps) => Style`

Takes a component's properties and returns spacing styling (padding & margin).  
These props are generally `m` or `p` (margin or padding) plus a direction, like 
`x`, `y`, `l`, `t`, `r`, `b`.

If the index of a `spacing` is passed, it will be accessed from the theme.

| Prop             | Type             | Style           |
| :--------------- | :--------------- | :-------------- | 
| `p` | number | padding |
| `px` | number | paddingHorizontal |
| `py` | number | paddingVertical |
| `pl` | number | paddingLeft |
| `pt` | number | paddingTop |
| `pr` | number | paddingRight |
| `pb` | number | paddingBottom |
| `m` | number | margin |
| `mx` | number | marginHorizontal |
| `my` | number | marginVertical |
| `ml` | number | marginLeft |
| `mt` | number | marginTop |
| `mr` | number | marginRight |
| `mb` | number | marginBottom |
 
 #### text
 `(TextProps) => Style`
 
 Takes a component's properties and returns text styling.
 
| Prop             | Type             | Style           |
| :--------------- | :--------------- | :-------------- | 
| `color` | string or colorName | color |
| `align` | string | textAlign |
| `bold` | boolean | Makes the text bold. |

#### subTheme
`(subThemeName: string) => ({theme: Theme, modifier: Modifier}) => Style`

Returns a function that takes (modifier-)props for the passed subtheme-name.

 **Example**

    const theme = {
      button: {
        default: {...},
        round: {...},
        large: {...},
      }
    }
    
    const buttonTheme = subTheme('button')
    
    const styles = buttonTheme({theme, modifier: 'large'})

#### raised
`(RaisedProps) => Style`

Takes a component's properties and returns shadow styling.

| Prop             | Type             | Style           |
| :--------------- | :--------------- | :-------------- | 
| `raised` | number | elevation / dropShadow |

#### alpha
`(AlphaProps) => Style`

Takes a component's properties and returns opacity styling.

| Prop             | Type             | Style           |
| :--------------- | :--------------- | :-------------- | 
| `alpha` | number | opacity|

#### Colors
Both `textColor` and `backgroundColor` take a component's properties and return
styling related to colors.
`textColor` sets the `color`-style, whereas `backgroundColor` 
sets the `backgroundColor`-style.  
The color gets looked up in the theme or returned as is.

| Prop             | Type             | Style           |
| :--------------- | :--------------- | :-------------- | 
| `color` | string | - | 

There also is a `withFallback`.  
Wrap this function around any other function taking a `{color: string}`-property to
assign a default color for when there is none passed.

**Example**

    const colorOrBlack = withFallback(backgroundColor, 'black')
    
    colorOrBlack({color: 'red'}) // {backgroundColor: 'red'}
    colorOrBlack({color: 'blue'}) // {backgroundColor: 'blue'}
    colorOrBlack({color: undefined}) // {backgroundColor: 'black'}
    
When no color is passed to the `withFallback`-function, it will use the `fallback` color 
specified in your theme.

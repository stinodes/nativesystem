# Coordinator
The coordinator is used to easily **coordinate** complex animations.  
It is not an alternative animating solution, as it still uses the Animated-API,
but rather, an abstraction/simplification for complex and many interpolations.

Imagine a screen where, as you scroll, several elements move out of the 
way to show more items.

    ______________        ______________
    |   Title    |        | ( ) Title  |
    |    ( )     |   ->   |____________|
    |____________|        | Item 1     |
    | Item 1     |        | Item 2     |
    
This would require a lot of `animation.interpolate(...)`, a lot of awkward positioning 
and a lot of hard-to-read code.  

Using the Coordinator and its Elements, you can absolutely (or relatively, 
if that ends up being easier) position your elements and animate them performantly 
using translate, rotate, scale and opacity properties.  

To use this set of components, render a Coordinator and pass in your animated value
and give it some `layoutProps` (`{f: 1}` for example so your coordinator stretches itself
out).   

Also specify your `inputRange`.   If you are planning on animating between `0` and `1`, 
for example, then `inputRange={[0, 1]}` should suffice. Your `inputRange ` marks at what value of your animation the 
`start` and `end` properties of the Element will be.

    render() {
        return (
          <Coordinator
            layoutProps={{f: 1}}
            animation={this.animation} 
            inputRange={[0, 1]}>
            ...
          </Coordinator>
        )
    }

Now you can start rendering `Elements`.  

Each element will, by default, be positioned absolutely. Either in relation to
the Coordinator or a previous Element.  

You can tell the Element where it should position itself using the `positioning`-property. 
This should be an object containing optional `left`, `right`, `top` and `bottom` values.
Feel free to pass it some children so you can actually see some output.  

Next, we'll decide where the component starts its animation and where it ends it.
Pass in a `start`-property. This should be an object with any of the following values:  

* `y`: vertical translation 
* `x`: horizontal translation 
* `scale`: scale 
* `opacity`: opacity 
* `rot`: rotation

Pass an object with the same keys to the `end`-property.

Now when you start your animation by animating from 0 to 1, you should see your objects 
move around.

[Here you can see a quick example.][snack] 

[snack]: https://snack.expo.io/SkSUoTzPm


 

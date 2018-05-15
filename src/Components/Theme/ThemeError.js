// @flow
class ThemeError extends Error {
  constructor (...args) {
    super(...args)
  }
}

const onCatch = <Args, R>(fn: (...Args) => R, callback: (e: Error, ...Args) => any) => (...args: Args) => {
  try {
    return fn(...args)
  }
  catch (e) {
    callback(e, ...args)
  }
}
const throwIf = (condition: boolean, exception: Error|() => Error) => {
  if (condition) {
    throw typeof exception === 'function' ? exception() : exception
  }
  return false
}

export {ThemeError, onCatch, throwIf}

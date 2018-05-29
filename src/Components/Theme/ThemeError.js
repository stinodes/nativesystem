// @flow
class ThemeError extends Error {
  constructor (...args: any[]) {
    super(...args)
  }
}

const onCatch = <Args: [], R>(fn: (...Args) => R, callback: (e: Error, ...Args) => ?R) => {
  const wrap = (args: Args): ?R => {
    try {
      return fn(...args)
    }
    catch (e) {
      callback(e, ...args)
    }
  }
  return (...args: Args) => wrap(args)
}
const throwIf = (condition: boolean, exception: Error|() => Error) => {
  if (condition) {
    throw typeof exception === 'function' ? exception() : exception
  }
  return false
}

export {ThemeError, onCatch, throwIf}

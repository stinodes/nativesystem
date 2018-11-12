// @flow
import type { SizeLiteral, SizesLiteral } from './types'

class Size {
  name: string
  size: number
  constructor(name: string): void {
    this.name = name
  }

  use(size: number): Size {
    this.size = size
    return this
  }
  generate(): SizeLiteral {
    return { name: this.name, size: this.size }
  }
}

class Sizes {
  sizeDescriptors: Size[]
  constructor(): void {
    this.sizeDescriptors = []
  }

  use(...size: Size[]): Sizes {
    this.sizeDescriptors = [...this.sizeDescriptors, ...size]
    return this
  }
  generate(prev?: SizesLiteral = {}): SizesLiteral {
    return this.sizeDescriptors.reduce(
      (prev, size) => ({
        ...prev,
        [size.name]: size.generate(),
      }),
      prev,
    )
  }
}

export { Size, Sizes }

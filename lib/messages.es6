import colors from 'colors/safe'

// Build some local output styles for console printing.
//
// Here`s a pocket rant:  What in hell kind of DSL do all of these color output
// libraries think they`re providing?  This was just about the nicest I could
// find.  Does anyone know of a better way?  I`m in a deep place of cognitive
// dissonance between the decisions I have:  Either I create these awful
// single-letter name functions with this lib or every line becomes its own
// miserable factory.  Help.
//
colors.setTheme({
  action: [`bold`, `green`],
  data: [`bold`, `cyan`],
  error: [`bold`, `red`],
  info: [`bold`, `white`],
  log: [],
  warning: [`bold`, `yellow`],
})

const Environment = process.env.NODE_ENV || `development`
const prefix = `[ ${colors.data(Environment)} ]: `

export const action = (message) => ({ type: `action`, message })
export const data = (message) => ({ type: `data`, message })
export const error = (message) => ({ type: `error`, message })
export const info = (message) => ({ type: `info`, message })
export const log = (message) => ({ type: `log`, message })
export const warning = (message) => ({ type: `warning`, message })

export class Messages {
  constructor() { this.contents = [] }

  add(output) {
    let contents = [...output()].map(({ type, message }) => {
      var method = Reflect.get(colors, type)
      return Reflect.apply(method, colors, [message])
    })

    this.contents.push(`${prefix}${contents.join(' ')}`)
  }

  print() {
    this.contents.forEach(item => console.log(item))
    console.log(``)
  }
}

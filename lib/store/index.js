import development from './development'
import production from './production'
import { persist } from './local-storage'

const Environment = process.env.NODE_ENV
const store = Environment === 'production' ? production : development

store.subscribe(persist(store))

export default store

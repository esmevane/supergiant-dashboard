import uuid from 'uuid'
import { Record } from 'immutable'

const meterSchema = { usage: 0, limit: 0 }
export default class Meter extends Record(meterSchema) { }

import type { UUID } from 'vue-uuid'
import type { BaseModel } from './BaseModel'

export interface Configuration extends BaseModel {
  parameterKey: string
  description: string
  value: string
}

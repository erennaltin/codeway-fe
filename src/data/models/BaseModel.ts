import { type UUID } from 'vue-uuid'

export interface BaseModel {
  id: UUID
  _version: UUID
  createdAt: EpochTimeStamp
  createdBy: UUID
  updatedAt?: EpochTimeStamp
  updatedBy?: UUID
  deletedAt?: EpochTimeStamp
  deletedBy?: UUID
  isDeleted?: boolean
}

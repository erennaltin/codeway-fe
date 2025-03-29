import type { ConfigurationCreateDTO } from '@/data/dto/Configuration/ConfigurationCreateDTO'
import type { ConfigurationEditDTO } from '@/data/dto/Configuration/ConfigurationEditDTO'
import axios from 'axios'

const BASE_URL = '/configurations'

// GET
const getAllConfigurations = async () => {
  const response = await axios.get(BASE_URL)
  return response.data
}

const getConfiguration = async (configurationId: string) => {
  const response = await axios.get(`${BASE_URL}/${configurationId}`)
  return response.data
}

// POST
const createConfiguration = async (configuration: ConfigurationCreateDTO) => {
  const response = await axios.post(BASE_URL, configuration)
  return response.data
}

// PATCH
const updateConfiguration = async (configuration: ConfigurationEditDTO) => {
  const response = await axios.patch(`${BASE_URL}/${configuration.id}`, configuration)
  return response.data
}

// DELETE
const deleteConfiguration = async (configurationId: string) => {
  const response = await axios.delete(`${BASE_URL}/${configurationId}`)
  return response.data
}

export { getAllConfigurations, getConfiguration, createConfiguration, updateConfiguration, deleteConfiguration }

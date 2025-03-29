import type { ConfigurationCreateDTO } from '@/data/dto/Configuration/ConfigurationCreateDTO'
import axios from 'axios'

const BASE_URL = '/configurations'

// GET
const getAllConfigurations = async () => {
  const response = await axios.get(BASE_URL)
  return response.data
}

// POST
const createConfiguration = async (configuration: ConfigurationCreateDTO) => {
  const response = await axios.post(BASE_URL, configuration)
  return response.data
}

export { getAllConfigurations, createConfiguration }

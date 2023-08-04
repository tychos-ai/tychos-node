import axios, { AxiosResponse } from 'axios';
import Vector from './vector';

class VectorDataStore {
  private apiKey: string;
  private baseUrl: string;
  private vector: Vector;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.tychos.ai/';
    this.vector = new Vector(apiKey);
  }

  async query({ name, queryString, limit }: { name: string | string[]; queryString: string; limit: number; }): Promise<any> {
    if (this.apiKey === undefined) {
      throw new Error("API key not set. Please set the API key using 'tychos.apiKey = <your_api_key>'. If you need to create an API key, you can do so at tychos.ai")
    }

    // vectorize query string
    const queryVector = await this.vector.create({
      type: "text_embedding",
      inputText: queryString,
      model: "text-embedding-ada-002",
    });

    // validate index name
    const availableIndices = ['pub-med-abstracts', 'arxiv-abstracts'];
    if (!Array.isArray(name)) {
        name = [name];
    }
    const invalidNames = name.filter(n => !availableIndices.includes(n));
    if (invalidNames.length > 0) {
        throw new Error(`Invalid index name(s): ${invalidNames.join(', ')}. The current available datasets are: ${availableIndices.join(', ')}`);
    }

    // Send query request to vector data store
    const url = `${this.baseUrl}v1/vector_data_store/query`;
    const headers = { 'api_key': this.apiKey };
    const payload = {
      'name': name,
      'query_vector': queryVector,
      'top': limit,
    };

    try {
      const response: AxiosResponse = await axios.post(url, payload, { headers: headers });

      return response.data;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
  
  async list(): Promise<any> {
    const url = `${this.baseUrl}v1/vector_data_store/list`;
    const headers = { 'api_key': this.apiKey };
    try {
      const response: AxiosResponse = await axios.get(url, { headers: headers });
      return response.data;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}

export default VectorDataStore;
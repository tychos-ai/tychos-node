import axios, { AxiosResponse } from 'axios';
import Vector from './vector';

class VectorDataStore {
  private apiKey: string;
  private baseUrl: string;
  private vector: Vector;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://www.tychos.ai/api/';
    // this.baseUrl = 'http://localhost:3000/api/';
    this.vector = new Vector(apiKey);
  }

  async query(name: string, queryString: string, limit: number): Promise<any> {
    // Vectorize query string
    const queryVector = await this.vector.create(
      "text_embedding",
      queryString,
      "text-embedding-ada-002"
    );

    // Send query request to vector data store
    const url = `${this.baseUrl}/query-vector-store`;
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
}

export default VectorDataStore;
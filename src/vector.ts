import axios, { AxiosResponse } from 'axios';

class Vector {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://www.tychos.ai/api/';
    // this.baseUrl = 'http://localhost:3000/api/';
  }

  async create({ type, inputText, model, modelProviderKey }: { type: string; inputText: string; model: string; modelProviderKey?: string; }): Promise<any> {    if (type === 'text_embedding') {
      if (model === 'text-embedding-ada-002') {
        try {
          const url = `${this.baseUrl}create-vector`;
          const headers = { 'api_key': this.apiKey };
          const payload = {
            'model_provider_key': modelProviderKey,
            'input': inputText,
            'model': model,
          };

          const response: AxiosResponse = await axios.post(url, payload, { headers: headers });

          return response.data;
        } catch (e) {
          console.error(e);
          return null;
        }
      } else {
        console.log('Model not currently supported, try text-embedding-ada-002');
        return null;
      }
    } else {
      console.log('Type not currently supported, try text_embedding');
      return null;
    }
  }
}

export default Vector;
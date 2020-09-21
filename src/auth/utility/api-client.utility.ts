import { HttpService } from '@nestjs/common';

export class ApiClient {
  constructor(private readonly http: HttpService) {}

  get(data): Promise<any> {
    try {
      const custEndpointUrl = 'http://localhost:3000/auth';
      console.log(`${custEndpointUrl}/${data}`);
      return this.http
        .get(`${custEndpointUrl}/${data}`, {
          //   headers: {
          //     Authorization: `${data}`,
          //   },
        })
        .toPromise();
    } catch (err) {}
  }
}

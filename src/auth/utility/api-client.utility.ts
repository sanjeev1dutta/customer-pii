import { HttpService } from '@nestjs/common';

export class ApiClient {
  constructor(private readonly http: HttpService) {}

  get(url): Promise<any> {
    try {
      return this.http
        .get(url, {
          //   headers: {
          //     Authorization: `${data}`,
          //   },
        })
        .toPromise();
    } catch (err) {}
  }
}

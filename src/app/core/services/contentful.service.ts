import { Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {

  private client = createClient({
    space: environment.contentful.spaceId,
    accessToken: environment.contentful.accessToken,
    environment: environment.contentful.environment
  });

  getPageBySlug(slug: string): Promise<Entry<any>[]> {
    return this.client.getEntries({
      content_type: 'page',
      'fields.slug': slug
    }).then(res => res.items);
  }

  getAllPages(): Promise<any[]> {
  return this.client
    .getEntries({ content_type: 'page' })
    .then(res => res.items);
}

}

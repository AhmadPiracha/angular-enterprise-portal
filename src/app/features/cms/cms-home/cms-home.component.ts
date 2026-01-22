import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../../../core/services/contentful.service';

@Component({
  selector: 'app-cms-home',
  templateUrl: './cms-home.component.html',
  styleUrls: ['./cms-home.component.scss']
})
export class CmsHomeComponent implements OnInit {

  pages: any[] = [];
  featuredPages = [
    {
      title: 'Privacy Policy',
      slug: 'privacy',
      description: 'Learn about how we handle your data and protect your privacy on our platform.',
      icon: '🏢',
      category: 'Company'
    },
    {
      title: 'Help Center',
      slug: 'help',
      description: 'Get started quickly with our comprehensive guides, FAQs, and tutorials.',
      icon: '❓',
      category: 'Support'
    },
    {
      title: 'Terms of Service',
      slug: 'terms',
      description: 'Review our terms, policies, and legal information for using the platform.',
      icon: '📄',
      category: 'Legal'
    }
  ];

  constructor(private contentful: ContentfulService) {}

  ngOnInit() {
    this.contentful.getAllPages().then(entries => {
      if (entries && entries.length > 0) {
        this.pages = entries;
      }
    }).catch(() => {
      // If Contentful fails, we'll show featured pages
      console.log('Using default featured pages');
    });
  }
}

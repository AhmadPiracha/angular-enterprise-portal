import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentfulService } from '../../../core/services/contentful.service';

@Component({
  selector: 'app-cms-page',
  templateUrl: './cms-page.component.html',
  styleUrls: ['./cms-page.component.scss']
})
export class CmsPageComponent implements OnInit {

  title = '';
  body = '';

  private defaultContent = {
    'privacy': {
      title: 'Privacy Policy',
      body: `
        <p><em>Last Updated: January 20, 2026</em></p>
        
        <h3>1. Information We Collect</h3>
        <p>We collect information that you provide directly to us, including:</p>
        <ul>
          <li>Name, email address, and contact information</li>
          <li>Account credentials and authentication data</li>
          <li>Profile information and preferences</li>
          <li>Communications with our support team</li>
          <li>Usage data and analytics</li>
        </ul>
        
        <h3>2. How We Use Your Information</h3>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide, maintain, and improve our Service</li>
          <li>Process transactions and send related information</li>
          <li>Send technical notices, updates, and security alerts</li>
          <li>Respond to your comments and questions</li>
          <li>Analyze usage patterns and trends</li>
          <li>Detect and prevent fraudulent or unauthorized activity</li>
        </ul>
        
        <h3>3. Information Sharing</h3>
        <p>We do not sell or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
        <ul>
          <li>With your consent</li>
          <li>With service providers who assist in our operations</li>
          <li>To comply with legal obligations</li>
          <li>To protect our rights and safety</li>
        </ul>
        
        <h3>4. Data Security</h3>
        <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes:</p>
        <ul>
          <li>Encryption of data in transit and at rest</li>
          <li>Regular security assessments</li>
          <li>Access controls and authentication</li>
          <li>Employee training on data protection</li>
        </ul>
        
        <h3>5. Data Retention</h3>
        <p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.</p>
        
        <h3>6. Your Rights</h3>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal information</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Object to processing of your data</li>
          <li>Request data portability</li>
          <li>Withdraw consent at any time</li>
        </ul>
        
        <h3>7. Cookies and Tracking</h3>
        <p>We use cookies and similar tracking technologies to track activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
        
        <h3>8. Third-Party Services</h3>
        <p>Our Service may contain links to third-party websites. We are not responsible for the privacy practices of these external sites.</p>
        
        <h3>9. Children's Privacy</h3>
        <p>Our Service is not intended for children under 13. We do not knowingly collect personal information from children under 13.</p>
        
        <h3>10. Changes to This Policy</h3>
        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.</p>
        
        <h3>11. Contact Us</h3>
        <p>If you have questions about this Privacy Policy, please contact us at:</p>
        <ul>
          <li>Email: <a href="mailto:privacy@enterprise-portal.com">privacy@enterprise-portal.com</a></li>
          <li>Phone: 1-800-PORTAL-1</li>
        </ul>
      `
    },
    'help': {
      title: 'Help Center',
      body: `
        <h3>Getting Started</h3>
        <p>Welcome to the Enterprise Portal Help Center! Here you'll find everything you need to make the most of our platform.</p>
        
        <h3>Quick Start Guide</h3>
        <ol>
          <li><strong>Dashboard Navigation:</strong> Use the top navigation menu to access different sections</li>
          <li><strong>View Statistics:</strong> Your dashboard displays key metrics and recent activities</li>
          <li><strong>Quick Actions:</strong> Use the sidebar for common tasks like creating projects or inviting team members</li>
          <li><strong>Notifications:</strong> Stay updated with important alerts and announcements</li>
        </ol>
        
        <h3>Frequently Asked Questions</h3>
        
        <h4>How do I create a new project?</h4>
        <p>Click the "Create New Project" button in the Quick Actions panel on your dashboard. Fill in the project details and click "Save" to get started.</p>
        
        <h4>How do I invite team members?</h4>
        <p>Navigate to the "Invite Team Member" option in Quick Actions. Enter their email address and assign appropriate permissions. They'll receive an invitation email to join your workspace.</p>
        
        <h4>Can I customize my dashboard?</h4>
        <p>Yes! You can customize widgets, rearrange panels, and set your preferred view options in the Settings menu.</p>
        
        <h4>How do I generate reports?</h4>
        <p>Click "Generate Report" from the dashboard or navigate to the Reports section. Select your date range and metrics, then export in your preferred format (PDF, Excel, or CSV).</p>
        
        <h3>Keyboard Shortcuts</h3>
        <ul>
          <li><code>Ctrl + D</code> - Go to Dashboard</li>
          <li><code>Ctrl + N</code> - Create New Project</li>
          <li><code>Ctrl + K</code> - Quick Search</li>
          <li><code>Ctrl + ,</code> - Open Settings</li>
        </ul>
        
        <h3>Need More Help?</h3>
        <p>If you can't find what you're looking for, please contact our support team:</p>
        <ul>
          <li>Email: <a href="mailto:support@enterprise-portal.com">support@enterprise-portal.com</a></li>
          <li>Phone: 1-800-PORTAL-1</li>
          <li>Live Chat: Available Monday-Friday, 9AM-6PM EST</li>
        </ul>
      `
    },
    'terms': {
      title: 'Terms of Service',
      body: `
        <p><em>Last Updated: January 20, 2026</em></p>
        
        <h3>1. Acceptance of Terms</h3>
        <p>By accessing and using the Enterprise Portal ("Service"), you accept and agree to be bound by the terms and provision of this agreement.</p>
        
        <h3>2. Use License</h3>
        <p>Permission is granted to temporarily access the Service for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
        <ul>
          <li>Modify or copy the materials</li>
          <li>Use the materials for any commercial purpose or for any public display</li>
          <li>Attempt to decompile or reverse engineer any software contained in the Service</li>
          <li>Remove any copyright or other proprietary notations from the materials</li>
          <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
        </ul>
        
        <h3>3. User Account</h3>
        <p>To access certain features of the Service, you must register for an account. You agree to:</p>
        <ul>
          <li>Provide accurate, current, and complete information</li>
          <li>Maintain and promptly update your account information</li>
          <li>Maintain the security of your password</li>
          <li>Accept all responsibility for activities that occur under your account</li>
          <li>Notify us immediately of any unauthorized use</li>
        </ul>
        
        <h3>4. Privacy Policy</h3>
        <p>Your use of the Service is also governed by our Privacy Policy. We take your privacy seriously and are committed to protecting your personal information.</p>
        
        <h3>5. Data Security</h3>
        <p>We implement industry-standard security measures to protect your data. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.</p>
        
        <h3>6. Intellectual Property</h3>
        <p>The Service and its original content, features, and functionality are owned by Enterprise Portal and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>
        
        <h3>7. Limitation of Liability</h3>
        <p>In no event shall Enterprise Portal, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages arising out of your use of the Service.</p>
        
        <h3>8. Changes to Terms</h3>
        <p>We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the Service.</p>
        
        <h3>9. Contact Information</h3>
        <p>If you have any questions about these Terms, please contact us at <a href="mailto:legal@enterprise-portal.com">legal@enterprise-portal.com</a></p>
      `
    }
  };

  constructor(
    private route: ActivatedRoute,
    private contentful: ContentfulService
  ) {}

  ngOnInit() {
    // Subscribe to route params to detect changes when navigating between pages
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      
      if (slug) {
        // Try to get content from Contentful, fallback to default content
        this.contentful.getPageBySlug(slug).then(entries => {
          if (entries && entries.length > 0) {
            const page = entries[0];
            this.title = page.fields.title;
            this.body = page.fields.body;
          } else {
            this.loadDefaultContent(slug);
          }
        }).catch(() => {
          // If Contentful fails, use default content
          this.loadDefaultContent(slug);
        });
      }
    });
  }

  private loadDefaultContent(slug: string) {
    const content = this.defaultContent[slug];
    if (content) {
      this.title = content.title;
      this.body = content.body;
    } else {
      this.title = 'Page Not Found';
      this.body = '<p>The requested page could not be found.</p>';
    }
  }
}

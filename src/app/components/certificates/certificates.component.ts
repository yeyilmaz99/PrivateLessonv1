import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';


@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [NgxExtendedPdfViewerModule],
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.css'
})
export class CertificatesComponent {

  pdfSrc: string[] = [
    'certificate1.pdf', 'certificate2.pdf', 'certificate3.pdf',
    'certificate4.pdf', 'certificate5.pdf', 'certificate6.pdf',
    'certificate7.pdf', 'certificate8.pdf', 'certificate9.pdf',
    'certificate10.pdf'
  ];

  sanitizedUrls: string[] = [];

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.pdfSrc.forEach(element => {
      const assetPath = '/assets/certificates/';
      const fullPath = `${assetPath}${element}`;
      const sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fullPath);
      this.sanitizedUrls.push(fullPath);
    });
  }

}

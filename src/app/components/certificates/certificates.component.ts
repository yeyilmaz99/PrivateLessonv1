import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/reducers';
import { getTextByType } from '../../state/texts/texts.selector';
import { FEndText } from '../../models/textsModel';
import { loadCertificates } from '../../state/photos/photos.actions';
import { getCertificates } from '../../state/photos/photos.selector';
import { Photo } from '../../models/photoModel';

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [],
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.css',
})
export class CertificatesComponent {
  store = inject(Store<AppState>);
  header: FEndText;
  headerBoldText: FEndText;
  headerDescription: FEndText;
  certificates: Photo[] = [];
  certificatesLoaded: boolean = false;
  constructor() {}

  ngOnInit() {
    this.getTexts();
    this.loadCertificates();
  }

  loadCertificates() {
    this.store.select(getCertificates).subscribe((resp) => {
      this.certificates = resp;
    });

    if (this.certificates.length == 0) {
      this.store.dispatch(loadCertificates());

      this.store.select(getCertificates).subscribe((resp) => {
        this.certificates = resp;
      });
    }
  }

  getTexts() {
    this.store.select(getTextByType, 12).subscribe((res) => {
      this.header = res;
    });
    this.store.select(getTextByType, 13).subscribe((res) => {
      this.headerBoldText = res;
    });
    this.store.select(getTextByType, 14).subscribe((res) => {
      this.headerDescription = res;
    });
  }
}

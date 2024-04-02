import { Component } from '@angular/core';

@Component({
  selector: 'app-course-schedule',
  standalone: true,
  imports: [],
  templateUrl: './course-schedule.component.html',
  styleUrl: './course-schedule.component.css'
})
export class CourseScheduleComponent {
  gunler: string[] = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
  saatler: string[] = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
  seciliGun: string = '';
  seciliSaat: string = '';
  secimler: { gun: string, saat: string }[] = [];

  saatleriGetir(gun: string) {
    this.seciliGun = gun;
    // Eğer istediğiniz gibi özelleştirilmiş saatleriniz varsa, burada onları ayarlayabilirsiniz.
    // Örneğin, her gün için farklı saatler.
  }

  secimiEkle() {
    if (this.seciliGun && this.seciliSaat) {
      this.secimler.push({ gun: this.seciliGun, saat: this.seciliSaat });
      // İşlem tamamlandıktan sonra seçili günü ve saati sıfırlayın.
      this.seciliGun = '';
      this.seciliSaat = '';
    }
  }
}

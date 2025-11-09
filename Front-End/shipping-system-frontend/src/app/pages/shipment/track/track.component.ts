import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-track',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslatePipe
  ],
  templateUrl: './track.component.html',
  styleUrl: './track.component.scss'
})
export class TrackComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Check if there's a child route, otherwise navigate to input
    this.activatedRoute.firstChild?.url.subscribe(urlSegments => {
      if (!urlSegments || urlSegments.length === 0) {
        this.router.navigate(['input'], { relativeTo: this.activatedRoute });
      }
    });
  }
}

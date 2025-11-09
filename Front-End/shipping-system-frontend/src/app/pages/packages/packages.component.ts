import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.scss'
})
export class PackagesComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Redirect to pricing page by default
    if (this.route.snapshot.children.length === 0) {
      this.router.navigate(['pricing'], { relativeTo: this.route });
    }
  }
}

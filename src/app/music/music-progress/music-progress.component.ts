import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'music-progress',
  templateUrl: './music-progress.component.html',
  styleUrls: ['./music-progress.component.css'],
})
export class MusicProgressComponent implements OnInit {
  @Input() elapsed: string;
  @Input() total: string;
  @Input() current: number;

  debug = true;

  ngOnInit() {
    // this.current = 0;
  }
}

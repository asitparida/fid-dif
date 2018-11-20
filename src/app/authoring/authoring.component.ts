import { Component, OnInit } from '@angular/core';
import { BunBunStates } from '../states';

@Component({
  selector: 'app-authoring',
  templateUrl: './authoring.component.html',
  styleUrls: ['./authoring.component.scss']
})
export class AuthoringComponent implements OnInit {

  fidelityCollection = [];
  leftFidelityCollection = [
    { 'id': 0, 'src': 'assets/bunbun/lo-fi/IMG_1130.JPG' },
    { 'id': 1, 'src': 'assets/bunbun/lo-fi/IMG_1131.JPG' },
    { 'id': 2, 'src': 'assets/bunbun/lo-fi/IMG_1132.JPG' },
    { 'id': 3, 'src': 'assets/bunbun/lo-fi/IMG_1133.JPG' },
    { 'id': 4, 'src': 'assets/bunbun/lo-fi/IMG_1134.JPG' },
    { 'id': 5, 'src': 'assets/bunbun/lo-fi/IMG_1140.JPG' },
    { 'id': 6, 'src': 'assets/bunbun/lo-fi/IMG_1141.JPG' },
    { 'id': 7, 'src': 'assets/bunbun/lo-fi/IMG_1142.JPG' },
    { 'id': 8, 'src': 'assets/bunbun/lo-fi/IMG_1143.JPG' }
  ];
  rightFidelityCollection = [
    { 'id': 0, 'src': 'assets/bunbun/hi-fi/Bun Bun Landing.png' },
    { 'id': 1, 'src': 'assets/bunbun/hi-fi/Bun Bun Item List.png' },
    { 'id': 2, 'src': 'assets/bunbun/hi-fi/Bun Bun Item Details.png' },
    { 'id': 3, 'src': 'assets/bunbun/hi-fi/Bun Bun Item Details – Pane Open for Glaze.png' },
    { 'id': 4, 'src': 'assets/bunbun/hi-fi/Bun Bun Item Details – Filled.png' },
    { 'id': 5, 'src': 'assets/bunbun/hi-fi/Bun Bun Item Details – Cart Open Step 1.png' },
    { 'id': 6, 'src': 'assets/bunbun/hi-fi/Bun Bun Item Details – Cart Open Step 2.png' },
    { 'id': 7, 'src': 'assets/bunbun/hi-fi/Bun Bun Item Details – Cart Open Step 3.png' },
    { 'id': 8, 'src': 'assets/bunbun/hi-fi/Bun Bun - Order Complete.png' }
  ];
  constructor() { }
  ngOnInit() {
    this.leftFidelityCollection.forEach((x: any) => {
      x.imgSrc = `url('${x.src}')`;
    });
    this.rightFidelityCollection.forEach((x: any) => {
      x.imgSrc = `url('${x.src}')`;
    });
    console.log(this.leftFidelityCollection);
    console.log(this.rightFidelityCollection);
  }

}

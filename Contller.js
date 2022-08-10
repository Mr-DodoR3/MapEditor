class Contller {
  w;
  a;
  s;
  d;
  delta;
  ctrl;
  
  constructor() {
    this.w = false;
    this.a = false;
    this.s = false;
    this.d = false;
    this.delta = 0;
  }

  loop() {
    this.delta++;
    if (this.delta > 4) {
      if (select == -2) {
        if (this.w) player.y--;
        if (this.a) player.x--;
        if (this.s) player.y++;
        if (this.d) player.x++;
      }
      else if (select == -1) {
        if (this.w) global_y++;
        if (this.a) global_x++;
        if (this.s) global_y--;
        if (this.d) global_x--;
      }
      else {
        if (this.w) obj_data[select].y--;
        if (this.a) obj_data[select].x--;
        if (this.s) obj_data[select].y++;
        if (this.d) obj_data[select].x++;
      }
      this.delta = 0;
    }
  }
}
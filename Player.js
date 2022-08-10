class Player {
  img;
  x;
  y;
  w;
  h;
  catch;
  select;
  //mouseX_relative;
  //mouseY_relative;

  black = 100;
  black_plus = 5;

  constructor(timg) {
    this.img = timg;
    this.x = 30;
    this.y = 325;
    this.catch = false;
    this.select = false;
  }

  loop(push) {
    this.black += this.black_plus;
    if (this.black < 100 || this.black > 254) {
      this.black_plus *= -1;
    }
    if (this.select) tint(this.black, this.black, this.black);
    else tint(255, 255, 255);
    this.w = this.img.width / 10;
    this.h = this.img.height / 10;
    image(this.img, this.x * global_s + global_x, this.y * global_s + global_y, this.w * global_s, this.h * global_s);
    noTint();
    
    if (this.catch) {
      this.x += (mouseX - bmouseX) / global_s;
      this.y += (mouseY - bmouseY) / global_s;
      //this.x = mouseX + this.mouseX_relative;
      //this.y = mouseY + this.mouseY_relative;
      if (!(push)) {
        this.catch = false;
        if (this.x < 0 || this.x + this.w > MAPSIZE_X || this.y + this.h < 0 || this.y > MAPSIZE_Y) {
          this.x = 30;
          this.y = 325;
        }
      }
    }
  }
}
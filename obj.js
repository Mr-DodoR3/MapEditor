class Obj {
  name;
  img;
  x;
  y;
  w;
  h;
  s;
  catch;
  select;
  collision;

  black = 100;
  black_plus = 5;

  constructor(tname, timg) {
    this.collision = true;
    this.catch = true;
    this.select = true;
    this.name = tname;
    this.img = timg;
    this.w = this.img.width;
    this.h = this.img.height;
    this.x = (mouseX - this.w * global_s / 4 - global_x) / global_s;
    this.y = (mouseY - this.h * global_s / 4 - global_y) / global_s;
    this.s = 1.0;
  }

  loop(push) {
    this.black += this.black_plus;
    if (this.black < 100 || this.black > 254) {
      this.black_plus *= -1;
    }
    if (this.select) tint(this.black, this.black, this.black);
    else tint(255, 255, 255);
    image(this.img, this.x * global_s + global_x, this.y * global_s + global_y, this.w * this.s * global_s, this.h * this.s * global_s);
    noTint();

    if (this.catch) {
      this.x += (mouseX - bmouseX) / global_s;
      this.y += (mouseY - bmouseY) / global_s;
      //this.x = mouseX + this.mouseX_relative;
      //this.y = mouseY + this.mouseY_relative;
      if (!(push)) {
        this.catch = false;
        if (this.x < 0 || this.x + this.w * this.s > MAPSIZE_X || this.y + this.h * this.s < 0 || this.y > MAPSIZE_Y) {
          return true;
        }
      }
    }
    return false;
  }
}
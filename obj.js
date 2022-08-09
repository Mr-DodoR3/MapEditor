class obj {
  name;
  img;
  x;
  y;
  w;
  h;
  s;
  catch;
  select;
  mouseX_relative;
  mouseY_relative;

  black = 100;
  black_plus = 5;

  constructor(tname, timg) {
    this.catch = true;
    this.select = true;
    this.name = tname;
    this.img = timg;
    this.w = this.img.width;
    this.h = this.img.height;
    this.s = 0.5;
    this.mouseX_relative = -this.w / 4;
    this.mouseY_relative = -this.h / 4;
  }

  loop(push) {
    this.black += this.black_plus;
    if (this.black < 100 || this.black > 254) {
      this.black_plus *= -1;
    }
    if (this.select) tint(this.black, this.black, this.black);
    else tint(255, 255, 255);
    image(this.img, this.x, this.y, this.w * this.s, this.h * this.s);
    noTint();
    if (this.catch) {
      this.x = mouseX + this.mouseX_relative;
      this.y = mouseY + this.mouseY_relative;
      if (!(push)) {
        this.catch = false;
        if (this.y > 440) {
          return true;
        }
      }
    }
    return false;
  }
}
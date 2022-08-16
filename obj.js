class Obj {
  imgnum;
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

  constructor(check, tarray) {
    if (check == "new") {
      this.imgnum = tarray[0];
      this.collision = true;
      this.catch = true;
      this.select = true;
      this.name = tarray[1];
      this.img = tarray[2];
      this.w = this.img.width;
      this.h = this.img.height;
      this.x = (mouseX - this.w * global_s / 4 - global_x) / global_s;
      this.y = (mouseY - this.h * global_s / 4 - global_y) / global_s;
      this.s = 1.0;
    }
    else if (check == "load") {
      this.imgnum = tarray[0];
      this.collision = tarray[4];
      this.catch = false;
      this.select = false;
      this.name = obj_img[this.imgnum].name;
      this.img = obj_img[this.imgnum].img;
      this.w = (this.name == "地面" ? parseInt(tarray[3], 10) : this.img.width);
      this.h = this.img.height;
      this.x = parseInt(tarray[1], 10);
      this.y = parseInt(tarray[2], 10);
      this.s = (this.name == "地面" ? 1.0 : parseFloat(tarray[3], 10));
      //if (this.name == "地面") console.log(this.w + ", " + tarray[3]);
    }
    else {
      alert("ERROR");
    }
  }
/*
  constructor(timgnum, tname, timg) {
    this.imgnum = timgnum;
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
  
  constructor(ta, tx, ty, ts, tc) {
    this.imgnum = ta;
    this.collision = tc;
    this.catch = false;
    this.select = false;
    this.name = obj_img[this.imgnum].name;
    this.image = obj_img[this.imgnum].image;
    this.w = this.img.width;
    this.h = this.img.height;
    this.x = tx;
    this.y = ty;
    this.s = ts;
  }
  */
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
        if (this.x + this.w * this.s < 0 || this.x > MAPSIZE_X || this.y + this.h * this.s < 0 || this.y > MAPSIZE_Y) {
          return true;
        }
      }
    }
    return false;
  }
}
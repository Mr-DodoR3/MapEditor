var canvas;

var back_img;
var obj_img = [];
var obj_img_size = [];
var obj_img_ui = [];

var obj_data = [];

var mouse_push = false;

const UI_BOX_SIZE = 80;

var select = -1;

function setup() {
  back_img = loadImage("image/haikei1.png");
  obj_img.push({name: "標識", img: loadImage("image/hyousiki1.png")});
  obj_img.push({name: "標識", img: loadImage("image/hyousiki2.png")});
  obj_img.push({name: "木", img: loadImage("image/ki1.png")});
  obj_img.push({name: "コンビニ", img: loadImage("image/konnbini1.png")});
  obj_img.push({name: "車(赤)", img: loadImage("image/kuruma1.png")});
  obj_img.push({name: "車(青)", img: loadImage("image/kuruma2.png")});
  obj_img.push({name: "車(白)", img: loadImage("image/kuruma3.png")});
  obj_img.push({name: "車(緑)", img: loadImage("image/kuruma4.png")});
  obj_img.push({name: "ポスト", img: loadImage("image/posuto1.png")});
  obj_img.push({name: "時計", img: loadImage("image/tokei1.png")});
  obj_img.push({name: "トラック", img: loadImage("image/torakku1.png")});
  obj_img.push({name: "自販機", img: loadImage("image/zihannki1.png")});
  //obj_img.push({name: "地面", img: loadImage("image/zimenn.png")});

  obj_img.forEach (function(timg) {
    obj_img_ui.push(timg.img);
  });

  //X座標2048,Y座標440
  canvas = createCanvas(2048, 590);

  //obj_data.push(new obj(obj_img[0].img));
}

function draw() {
  background("#000");
  image(back_img, 0, 0, 2048, 440);
  select = -1;
  for (let i = 0; i < obj_data.length; i++) {
    if (obj_data[i].select) select = i;
    if (obj_data[i].loop(mouse_push)) {
      obj_data.splice(i, 1);
    }
  }
  ui();
  statusbar();
}

function ui() {
  fill("#FFF");
  textSize(18);
  try {
    if (select > -1) text(obj_data[select].name + ", " + "X:" + obj_data[select].x + ", Y:"+ obj_data[select].y + ", サイズ:"+ obj_data[select].s*100 + "%", 2, 20);
  }
  catch {

  }
  
}

function statusbar() {
  fill("#000");
  //rect(0, 440, width, 150);
  let box_size = UI_BOX_SIZE;
  fill("#FFF");

  setsize();
    
  let x = 0;
  obj_img_ui.forEach(function(timg) {
    rect(x*box_size + 10, 450, box_size, box_size);
    image(timg, x*box_size + 10 + (box_size - timg.width*obj_img_size[x])/2, 450 + (box_size - timg.height*obj_img_size[x])/2, timg.width*obj_img_size[x], timg.height*obj_img_size[x]);
    textSize(18);
    //text(obj_img.name[x], x*box_size + 10, 545);
    x++;
  });
}

function setsize() {
  let n = 0;
  obj_img_ui.forEach(function(timg) {
    let magnification = 1;
    let w = timg.width;
    let h = timg.height;
    while (w > UI_BOX_SIZE || h > UI_BOX_SIZE) {
      w *= 0.9;
      h *= 0.9;
      magnification *= 0.9;
    }
    obj_img_size[n] = magnification;
    n++;
  });
}

function mousePressed() {
  mouse_push = true;

  let box_size = UI_BOX_SIZE;
  let x = 0;
  obj_img.forEach(function(timg) {
    if (mouseX > x*box_size + 10 && mouseX < (x+1)*box_size + 10 && mouseY > 450 && mouseY < 450 + box_size) {
      obj_data.push(new obj(timg.name, timg.img));
      select = x;
    }
    x++;
  });

  obj_data.forEach(function(tobj) {
    if (mouseX > tobj.x && mouseX < tobj.x+tobj.w*tobj.s  && mouseY > tobj.y && mouseY < tobj.y+tobj.h*tobj.s) {
      tobj.mouseX_relative = tobj.x - mouseX;
      tobj.mouseY_relative = tobj.y - mouseY;
      tobj.catch = true;
      tobj.select = true;
      temp = true;
    }
    else if (!(tobj.catch)) {
      tobj.select = false;
    }
  });
}

function mouseReleased() {
  mouse_push = false;
}

function mouseWheel(event) {
  for (let i = 0; i < obj_data.length; i++) {
    if (i == select) {
      obj_data[i].s += event.delta/12500;
    }
  }
}
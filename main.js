var canvas;
var mode = 0;

var back_img = [];
var back_img_num = 0;
var player_img;
var obj_img = [];
var obj_img_size = [];
var obj_img_ui = [];

var obj_data = [];

var mouse_push = false;

var select = -3;

var global_x;
var global_y;
var global_s;
var bmouseX;
var bmouseY;

var player;
var contller;

const UI_BOX_SIZE = 80;
const MAPSIZE_X = 7680;
const MAPSIZE_Y = 2160;

var mapdataForLoading = [];

function setup() {
  init_file();
  create_opt_b();

  back_img.push(loadImage("image/haikei1.png"));
  back_img.push(loadImage("image/haikei2.png"));
  back_img.push(loadImage("image/haikei3.png"));
  player_img = loadImage("image/player.png");
  obj_img.push({ name: "標識", img: loadImage("image/hyousiki1.png") });
  obj_img.push({ name: "標識", img: loadImage("image/hyousiki2.png") });
  obj_img.push({ name: "木", img: loadImage("image/ki1.png") });
  obj_img.push({ name: "コンビニ", img: loadImage("image/konnbini1.png") });
  obj_img.push({ name: "車(赤)", img: loadImage("image/kuruma1.png") });
  obj_img.push({ name: "車(青)", img: loadImage("image/kuruma2.png") });
  obj_img.push({ name: "車(白)", img: loadImage("image/kuruma3.png") });
  obj_img.push({ name: "車(緑)", img: loadImage("image/kuruma4.png") });
  obj_img.push({ name: "ポスト", img: loadImage("image/posuto1.png") });
  obj_img.push({ name: "時計", img: loadImage("image/tokei1.png") });
  obj_img.push({ name: "トラック", img: loadImage("image/torakku1.png") });
  obj_img.push({ name: "自販機", img: loadImage("image/zihannki1.png") });
  obj_img.push({ name: "地面", img: loadImage("image/zimenn.png") });

  obj_img.forEach(function (timg) {
    obj_img_ui.push(timg.img);
  });

  let result = document.getElementById('canvas_pos');
  //X座標2048,Y座標440
  canvas = createCanvas(1480, 590);
  canvas.parent(result);
  global_x = 0;
  global_y = 0;
  global_s = 0.20;

  //obj_data.push(new obj(obj_img[0].img));
  player = new Player(player_img);
  contller = new Contller();
}

function draw() {
  background(mode == 0 ? "#222" : "#DDD");
  if (mode == 0) {
    image(back_img[0], global_x, global_y, back_img[0].width * global_s, back_img[0].height * global_s);
  }
  else {
    fill("#FFF")
    rect(global_x, global_y, back_img[0].width * global_s, back_img[0].height * global_s);
  }

  if (mouse_push && select == -1) {
    global_x += mouseX - bmouseX;
    global_y += mouseY - bmouseY;
  }
  //image(back_img[1], global_x, global_y - 50, back_img[1].width * global_s, back_img[1].height * global_s);
  player.loop(mouse_push);

  if (mouseX < 0 || mouseX > window || mouseY < 0 || mouseY > height) {
    select = -3;
    document.removeEventListener("mousewheel", disableScroll, { passive: false });
  }
  else {
    //select = -1;
    //document.addEventListener("mousewheel", disableScroll, { passive: false } );
  };

  if (player.select) select = -2;
  try {
    for (let i = 0; i < obj_data.length; i++) {
      if (obj_data[i].select) select = i;
      if (obj_data[i].loop(mouse_push)) {
        obj_data.splice(i, 1);
      }
    }
  }
  catch(e) {

  }
  ui();
  statusbar();
  contller.loop();

  bmouseX = mouseX;
  bmouseY = mouseY;
}

function ui() {
  fill(mode == 0 ? "#FFF" : "#222");
  textSize(18);
  try {
    if (select == -3) text("", 2, 20);
    if (select == -2) text("番号:NaN, プレイヤー, " + "X:" + parseInt(player.x) + ", Y:" + parseInt(player.y) + ", サイズ:100%, 衝突判定:False", 2, 20);
    if (select == -1) text("番号:未選択, カメラ, " + "X:" + parseInt(global_x) + ", Y:" + parseInt(global_y) + ", 倍率:" + parseInt(global_s * 100) + "%, 衝突判定:False", 2, 20);
    if (select > -1) text("番号:" + select + ", " + obj_data[select].name + ", " + "X:" + parseInt(obj_data[select].x) + ", Y:" + parseInt(obj_data[select].y) + ", " + (obj_data[select].name == "地面" ? ("横幅:" + (parseInt(obj_data[select].w)) + "px") : ("サイズ:" + (parseInt(obj_data[select].s * 100)) + "%")) + ", 衝突判定:" + (obj_data[select].collision ? "True" : "False"), 2, 20);
  }
  catch {

  }

}

function statusbar() {
  fill("#000");
  rect(0, 440, width, 150);
  let box_size = UI_BOX_SIZE;
  fill("#FFF");

  setsize();

  let x = 0;
  obj_img_ui.forEach(function (timg) {
    rect(x * box_size + 10, 450, box_size, box_size);
    image(timg, x * box_size + 10 + (box_size - timg.width * obj_img_size[x]) / 2, 450 + (box_size - timg.height * obj_img_size[x]) / 2, timg.width * obj_img_size[x], timg.height * obj_img_size[x]);
    textSize(18);
    text(obj_img[x].name, x * box_size + 10, 545);
    x++;
  });
}

function setsize() {
  let n = 0;
  obj_img_ui.forEach(function (timg) {
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
  print("MAPSIZE:" + back_img[0].width + ", " + back_img[0].height);
  print(parseInt(mouseX) + ", " + parseInt(mouseY));
  mouse_push = true;

  if (mouseX > MAPSIZE_X || mouseX < 0 || mouseY > 590 || mouseY < 0) {
    return;
  }

  if (mouseX > 0 && mouseX < MAPSIZE_X && mouseY > 0 && mouseY < MAPSIZE_Y) {
    select = -1;
    document.addEventListener("mousewheel", disableScroll, { passive: false });
  }

  let box_size = UI_BOX_SIZE;
  let x = 0;
  obj_img.forEach(function (timg) {
    if (mouseX > x * box_size + 10 && mouseX < (x + 1) * box_size + 10 && mouseY > 450 && mouseY < 450 + box_size) {
      let tarray = [x, timg.name, timg.img];
      obj_data.push(new Obj("new", tarray));
      select = x;
    }
    x++;
  });

  if (mouseX > (player.x * global_s + global_x) && mouseX < ((player.x * global_s + global_x) + (player.w * global_s)) && mouseY > (player.y * global_s + global_y) && mouseY < (player.y * global_s + global_y) + (player.h * global_s)) {
    player.mouseX_relative = player.x - mouseX;
    player.mouseY_relative = player.y - mouseY;
    player.catch = true;
    player.select = true;
  }
  else {
    player.select = false;
  }

  obj_data.forEach(function (tobj) {
    if (mouseX > (tobj.x * global_s + global_x) && mouseX < ((tobj.x * global_s + global_x) + (tobj.w * tobj.s * global_s)) && mouseY > (tobj.y * global_s + global_y) && mouseY < ((tobj.y * global_s + global_y) + (tobj.h * tobj.s * global_s))) {
      //tobj.mouseX_relative = tobj.x - mouseX;
      //tobj.mouseY_relative = tobj.y - mouseY;
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
  obj_info(select);
  mouse_push = false;
}

function mouseWheel(event) {
  if (select == -1) {
    let tglobal_s = global_s + event.delta / 12500;
    if (tglobal_s < 0.051) {
      tglobal_s = 0.05;
    }
    let percent_x = mouseX / width;
    let percent_y = mouseY / (height - 150);
    if (tglobal_s < 0) {
      global_x += (MAPSIZE_X * tglobal_s - MAPSIZE_X * global_s) * percent_x;
      global_y += (MAPSIZE_Y * tglobal_s - MAPSIZE_Y * global_s) * percent_y;
    }
    else {
      global_x += (MAPSIZE_X * global_s - MAPSIZE_X * tglobal_s) * percent_x;
      global_y += (MAPSIZE_Y * global_s - MAPSIZE_Y * tglobal_s) * percent_y;
    }
    global_s = tglobal_s;
  }
  for (let i = 0; i < obj_data.length; i++) {
    if (i == select) {
      if (obj_data[i].name == "地面") {
        let wtemp = obj_data[i].w;
        obj_data[i].w = obj_data[i].w + (event.delta / 125) * 10;
        if (obj_data[i].w < 9) {
          obj_data[i].w = 10;
        }
        else {
          obj_data[i].x += (wtemp - obj_data[i].w) / 2;
        }
      }
      else {
        let stemp = obj_data[i].s;
        obj_data[i].s = obj_data[i].s + event.delta / 12500;
        if (obj_data[i].s < 0.02) {
          obj_data[i].s = 0.01;
        }
        else {
          obj_data[i].x += (obj_data[i].w * stemp - obj_data[i].w * obj_data[i].s) / 2;
          obj_data[i].y += (obj_data[i].h * stemp - obj_data[i].h * obj_data[i].s) / 2;
        }
      }
    }
  }
}

function keyPressed() {
  print(keyCode);
  if (key == '1') mode = 0;
  if (key == '2') mode = 1;

  if (key == 'r') {
    player.x = 30;
    player.y = 1780;
    global_x = 0;
    global_y = 0;
    global_s = 0.20;
  }

  if (key == 'w') contller.w = true;
  if (key == 'a') contller.a = true;
  if (key == 's') contller.s = true;
  if (key == 'd') contller.d = true;
  
  if (key == 't') console.log(obj_data);

  if (select < 0) {

  }
  else {
    if (keyCode == 46) obj_data.splice(select, 1);
  }
}

function keyReleased() {
  if (key == 'w') contller.w = false;
  if (key == 'a') contller.a = false;
  if (key == 's') contller.s = false;
  if (key == 'd') contller.d = false;
}

//スクロール禁止
function disableScroll(event) {
  event.preventDefault();
}
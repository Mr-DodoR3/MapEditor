//参考--https://techacademy.jp/magazine/21725//
//参考--https://developer.mozilla.org/ja/docs/Web/API/Blob//
//参考--https://qiita.com/wadahiro/items/eb50ac6bbe2e18cf8813//

let txt;
let input_image = document.getElementById("input_image");

function settext() {
  txt = "";
  txt += ("[OBJECT_LIST] = " + obj_data.length + "\n");
  for (let i = 0; i < obj_data.length; i++) {
    txt += (i + ", " + parseInt(obj_data[i].x) + ", " + parseInt(obj_data[i].y) + ", " + obj_data[i].s.toFixed(2) + "\n");
  }
}

function func1() {
  settext();
  var blob = new Blob(
    [txt],
    { "type": "text/plain" });
  let link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = "kutc_mapdata.txt";
  link.click();
}

function func2() {
  settext();
  let bom = new Uint8Array([0xEF, 0xBB, 0xBF]);;
  var blob = new Blob(
    [bom, txt],
    { "type": "text/csv" });
  let link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = "kutc_mapdata.csv";
  link.click();
}

function init_file() {
  img = createFileInput(add_image);
  button = createButton("追加")
  button.position(0, 840)
  img.position(0, 810);
  button.mousePressed(mouse);
}

function add_image(file) {
  if (file.type === "image") {
    selecting_file = file;
  }
}

function mouse() {
  if (selecting_file) {
    img = createImg(selecting_file.data, '');
    img.hide();
    obj_img.push({ name: selecting_file.name, img: img });
    obj_img_ui.push(img);
  }
}
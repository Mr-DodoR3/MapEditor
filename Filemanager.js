//参考--https://techacademy.jp/magazine/21725//
//参考--https://developer.mozilla.org/ja/docs/Web/API/Blob//
//参考--https://qiita.com/wadahiro/items/eb50ac6bbe2e18cf8813//

let txt;

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

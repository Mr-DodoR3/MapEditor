let loadMapdata = document.getElementById("csv_file");
let add_image = document.getElementById("input_image");
let fileReader = new FileReader();
let aI_fileReader = new FileReader();

add_image.onchange = () => {
  aI_fileReader.readAsDataURL(add_image.files[0])
  aI_fileReader.onload = function () {
    check_img = new Image();
    check_img.onload = function () {
      document.getElementById("check_W_H").innerHTML = "幅:" + check_img.width + "高さ:" + check_img.height;
    }
    check_img.src = aI_fileReader.result;
    selecting_file = { name: add_image.files[0].name, data: aI_fileReader.result };
  }
};

loadMapdata.onchange = () => {
  let file = loadMapdata.files[0];
  fileReader.readAsText(file);
};

fileReader.onload = () => {
  let checkLoad = window.confirm("マップデータをロードしますか?\nロードした場合、現在編集中のデータは削除されます。");

  if (checkLoad) {
    try {
      // ファイル読み込み
      let fileResult = fileReader.result.split('\n');

      mapdataForLoading = [];

      for (let i = 1; i < fileResult.length; i++) {
        if (fileResult[i].length > 0) {
          mapdataForLoading.push(fileResult[i].split(','));
        }
      }

      console.log("読み込み成功");
      loadingmap(mapdataForLoading);
    }
    catch (e) {
      console.log("読み込み失敗");
      console.log("読み込みに失敗しました。");
    }
  }
  else {
    console.log("読み込み取り消し");
  }
}

function loadingmap(d) {
  obj_data = [];
  console.log(d);
  d.forEach(e => {
    print("配列" + e);
    obj_data.push(new Obj("load", e));
  });
}
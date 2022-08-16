let loadMapdata = document.getElementById("csv_file");
let fileReader = new FileReader();

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
    catch(e) {
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
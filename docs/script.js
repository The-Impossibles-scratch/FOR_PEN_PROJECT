let text = '';

document.getElementById("image").addEventListener("change", function (e) {
  let file = e.target.files[0];
  if (!file) return;

  let img = new Image();
  let reader = new FileReader();

  reader.onload = function (e) {
    img.src = e.target.result;

    img.onload = function () {
      const Max_W = 480;
      const Max_H = 360;

      let size_change = document.getElementById("size").value;  // "true" または "false"

      let width = img.width;
      let height = img.height;
      let scaleX = Max_W / width;
      let scaleY = Max_H / height;

      let scale;

      if (width > Max_W || height > Max_H) {
        scale = Math.min(scaleX, scaleY);
      } else if (size_change === "true") {
        scale = Math.min(scaleX, scaleY);
      } else {
        scale = 1;
      }

      width = Math.floor(width * scale);
      height = Math.floor(height * scale);

      let canvas = document.getElementById("canvas");
      canvas.width = width;
      canvas.height = height;
      let ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      let imageData = ctx.getImageData(0, 0, width, height).data;
      text = `${width}:${height}\n`;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          let index = (y * width + x) * 4;
          let r = imageData[index];
          let g = imageData[index + 1];
          let b = imageData[index + 2];
          let rgbInt = (r << 16) + (g << 8) + b;
          text += `${rgbInt}\n`;
        }
      }
    };
  };

  reader.readAsDataURL(file);
});

function download() {
  if (!text) {
    alert("画像を先に選択してください");
    return;
  }
  let blob = new Blob([text], { type: "text/plain" });
  let link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "output.txt";
  link.click();
}

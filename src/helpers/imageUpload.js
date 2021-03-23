const checkImage = file => {
  let err = "";
  if (!file) return err = "File does not exist";

  if (file.size > 1024 * 1024) {
    err = "Kích thước ảnh quá lớn.";
  }

  if (file.type !== "image/jpeg" && file.type !== "image/png") {
    err = "Ảnh format không đúng,";
  }

  return err;
};

export default checkImage;

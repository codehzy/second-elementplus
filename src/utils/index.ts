// 把驼峰转换成横杠连接
const toLine = (value: string) => {
  return value.replace(/([A-Z])/g, "-$1").toLocaleLowerCase();
};

export default toLine;

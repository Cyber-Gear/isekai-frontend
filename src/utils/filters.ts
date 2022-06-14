const _this = this;
export default {
  /**超出默认隐藏长度的文本显示省略号 */
  ellipsisNormal(value: string) {
    if (!value) return "";
    return value.slice(0, 6) + "...";
  },
  /**钱包地址超出 */
  ellipsisWallet(value: string) {
    if (!value) return "";
    const index = value.length;
    return value.slice(0, 6) + "..." + value.slice(index - 4, index);
  },
  /**邮箱超出 */
  ellipsisMail(value: string) {
    if (!value) return "";
    const index = value.length;
    const index2 = value.indexOf("@");
    return value.slice(0, 2) + "***" + value.slice(index2, index);
  },

  /**数字转换千分位 */
  digitalConversionInThousandths(value: number) {
    if (!value) return 0;
    return (Math.round(value) + "").replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, "$&,");
  },
  /**数字转换计数单位 */
  digitalConversionUnitOfCounting(value: number) {
    if (!value) return 0;
    // Number.isInteger(num) 判断是否是整数
    if (value >= 1000000) {
      const num = value / 1000000;
      return (Number.isInteger(num) ? num : num.toFixed(2)) + " M";
    } else if (value >= 1000) {
      const num = value / 1000;
      return (Number.isInteger(num) ? num : num.toFixed(2)) + " K";
    } else {
      return value;
    }
  },
  /**去掉小数后的0 */
  digitalCutZero(value: number) {
    const str = value.toString();
    const newstr = str;
    const leng = str.length - str.indexOf(".") - 1;
    if (str.indexOf(".") > -1) {
      for (let i = leng; i > 0; i--) {
        if (newstr.lastIndexOf("0") > -1 && Number(newstr.substr(newstr.length - 1, 1)) == 0) {
          const k = newstr.lastIndexOf("0");
          if (newstr.charAt(k - 1) == ".") return newstr.substring(0, k - 1);
          return newstr.substring(0, k);
        }
        return newstr;
      }
    }
    return value;
  },
};

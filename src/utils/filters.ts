export default {
  ellipsisWallet(value: string) {
    if (!value) return "";
    const index = value.length;
    return value.slice(0, 6) + "..." + value.slice(index - 4, index);
  },
  ellipsisIpfs(value: string) {
    if (!value) return "";
    return value.slice(0, 6) + "...";
  },
  thousandthsNumber(value: number) {
    if (!value) return 0;
    return (Math.round(value) + "").replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, "$&,");
  },
  mailEllipsis(value: string) {
    if (!value) return "";
    const index = value.length;
    const index2 = value.indexOf("@");
    return value.slice(0, 2) + "***" + value.slice(index2, index);
  },
};

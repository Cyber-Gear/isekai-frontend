export default {
  // 设置cookie过期时间
  setCookie(key: string, value: string, time: number) {
    const num = new Date(new Date().getTime() + time * 60 * 1000 * 60);
    document.cookie = `${key} = ${value};expires = ` + num.toUTCString() + ";path = /";
  },
  // 获取cookie
  getCookie(name: string) {
    let arr: any = [];
    const reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
    else return null;
  },
  delCookie(name: string) {
    this.setCookie(name, "", -1);
  },
  //禁止滚动条滚动
  forbiddenScroll() {
    const scroll = (e: any) => {
      e.preventDefault();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("touchmove", scroll, false);
  },
  //恢复滚动条滚动
  restoreTheScroll() {
    const scroll = (e: any) => {
      e.preventDefault();
    };
    document.body.style.overflow = "";
    document.removeEventListener("touchmove", scroll, false);
  },
};

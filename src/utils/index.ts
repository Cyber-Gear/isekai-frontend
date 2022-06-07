// import {wallet, network,sb,sn,getSourceUrl} from "sealemlab-sdk";
// import BigNumber from "bignumber.js";
// import store from "../store/index";
import { Message } from "element-ui";

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

  /**
   * 格式化时间
   * 调用 FormatDate(strDate, "yyyy-MM-dd HH:mm:ss")
   * @param strDate （中国标准时间）时间戳等都可以
   * @param strFormat 返回格式
   * @returns
   */
  formatDate(strDate: any, strFormat?: any) {
    if (!strDate) return;
    if (!strFormat) strFormat = "yyyy/MM/dd HH:mm";
    switch (typeof strDate) {
      case "string":
        strDate = new Date(strDate.replace(/-/g, "/"));
        break;
      case "number":
        strDate = new Date(strDate);
        break;
    }
    if (strDate instanceof Date) {
      const dict: any = {
        yyyy: strDate.getFullYear(),
        M: strDate.getMonth() + 1,
        d: strDate.getDate(),
        H: strDate.getHours(),
        m: strDate.getMinutes(),
        s: strDate.getSeconds(),
        MM: ("" + (strDate.getMonth() + 101)).substr(1),
        dd: ("" + (strDate.getDate() + 100)).substr(1),
        HH: ("" + (strDate.getHours() + 100)).substr(1),
        mm: ("" + (strDate.getMinutes() + 100)).substr(1),
        ss: ("" + (strDate.getSeconds() + 100)).substr(1),
      };
      return strFormat.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function (m: any) {
        return dict[m];
      });
    }
  },
  /**数字千分位 */
  formatNumber(num: number) {
    return (Math.round(num) + "").replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, "$&,");
  },
  /**
   * 复制
   * @param value
   */
  handleCopy(value: string) {
    // const dummy = document.createElement("input"); // 不支持换行符
    const dummy = document.createElement("textarea"); // 支持换行符
    document.body.appendChild(dummy);
    dummy.value = value;
    dummy.select(); // 选择对象
    document.execCommand("copy"); // 执行浏览器复制命令
    document.body.removeChild(dummy);
    Message({ message: "Copy Success" });
  },
  // //禁止滚动条滚动
  // forbiddenScroll() {
  //   const scroll = (e: any) => {
  //     e.preventDefault();
  //   };
  //   document.body.style.overflow = "hidden";
  //   document.addEventListener("touchmove", scroll, false);
  // },
  // //恢复滚动条滚动
  // restoreTheScroll() {
  //   const scroll = (e: any) => {
  //     e.preventDefault();
  //   };
  //   document.body.style.overflow = "";
  //   document.removeEventListener("touchmove", scroll, false);
  // },

  // 链接钱包方法封装
  // connectWallet(data:string){
  //   return new Promise(async resolve => {
  //     let obj = {
  //       account:'',
  //       chainID:'',
  //       status:false,
  //       changeAccount:-1,// 切换账号变量
  //     }
  //     let acc = await wallet.getAccount(data); //链接钱包
  //     obj.account = acc[0]
  //     obj.changeAccount = 0
  //     obj.chainID = await wallet.getChainId(); // 连接网络
  //     let net = network(); // 获取sdk返回的当前的环境
  //     if(obj.chainID == net.chainId){
  //       obj.status = true
  //       store.commit("setnewinfo",  JSON.stringify(obj))
  //       sessionStorage.setItem("setnewinfo",JSON.stringify(obj));
  //       resolve(obj)
  //     }else{
  //       wallet.addChain()
  //       resolve(obj)
  //     }
  //     wallet.onAccountChanged((res:any) => {
  //       if(res.length == 0){
  //         obj.account = ''
  //         obj.status = false
  //         obj.changeAccount = -1
  //         store.commit("setnewinfo",  JSON.stringify(obj))
  //         sessionStorage.setItem("setnewinfo",JSON.stringify(obj))
  //         resolve(obj)
  //       }else{
  //         obj.account = res[0]
  //         obj.changeAccount = ++obj.changeAccount
  //         // console.log("切换账号")
  //         if(obj.chainID == net.chainId){
  //           obj.status = true
  //           store.commit("setnewinfo",  JSON.stringify(obj))
  //           sessionStorage.setItem("setnewinfo",JSON.stringify(obj));
  //           resolve(obj)
  //         }else{
  //           obj.status = false
  //           store.commit("setnewinfo",  JSON.stringify(obj))
  //           sessionStorage.setItem("setnewinfo",JSON.stringify(obj));
  //           resolve(obj)
  //         }
  //       }
  //     })
  //     wallet.onChainChanged((res:any) => {
  //       obj.chainID = res
  //       if(obj.chainID == net.chainId){
  //         obj.status = true
  //         store.commit("setnewinfo",  JSON.stringify(obj))
  //         sessionStorage.setItem("setnewinfo",JSON.stringify(obj));
  //         resolve(obj)
  //       }else{
  //         obj.status = false
  //         store.commit("setnewinfo",  JSON.stringify(obj))
  //         sessionStorage.setItem("setnewinfo",JSON.stringify(obj));
  //         resolve(obj)
  //       }
  //     })
  //   })
  // },
};

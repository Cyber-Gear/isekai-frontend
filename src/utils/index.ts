// import {wallet, network,sb,sn,getSourceUrl} from "sealemlab-sdk";
// import BigNumber from "bignumber.js";
// import store from "../store/index";
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

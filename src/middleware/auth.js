import { useLoginStore } from "../store/useLoginStore";

export default function(store, next) {
  if ( store.authenticated === false ) {
    next("/");
    useLoginStore().setLoginOpen(true)
  } else {
    next()
  }
}
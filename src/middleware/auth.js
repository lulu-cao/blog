import { useAuthStore } from "../store/useAuthStore";

export default function(store, next) {
  if ( store.authenticated === false ) {
    next("/login");
  } else {
    next()
  }
}

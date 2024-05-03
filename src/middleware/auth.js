import { useAuthStore } from "../store/useAuthStore";

const isAuthenticated = localStorage.getItem("user");
export default function(store, next) {
  if ( store.authenticated === false && !isAuthenticated) {
    next("/login");
  } else {
    next()
  }
}

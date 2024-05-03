const a=localStorage.getItem("user");function i(e,t){e.authenticated===!1&&!a?t("/login"):t()}export{i as default};

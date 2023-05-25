import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import "./axios";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faClock,
  faUserSecret,
  faCarrot,
  faUserCheck,
  faSignal,
  faList,
  faCartShopping,
  faRightFromBracket,
  faSliders,
  faComments,
  faBookmark,
  faStar,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(
  faUserSecret,
  faClock,
  faCarrot,
  faUserCheck,
  faSignal,
  faList,
  faCartShopping,
  faRightFromBracket,
  faSliders,
  faComments,
  faBookmark,
  faStar,
  faPen,
  faTrashCan
);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(store)
  .use(router)
  .mount("#app");

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/storage.js";
import "bootstrap/dist/css/bootstrap.css";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CCardTitle,
  CCardText,
  CButton,
  CCardFooter,
  CFormInput,
  CFormTextarea,
  CToaster,
  CToast,
  CToastHeader,
  CToastBody,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from "@coreui/vue";

import { CIcon } from "@coreui/icons-vue";
import { cilArrowRight, cilBackspace } from "@coreui/icons";

const icons = {
  cilArrowRight,
  cilBackspace,
};

const app = createApp(App);

app.component("CCard", CCard);
app.component("CCardHeader", CCardHeader);
app.component("CCardBody", CCardBody);
app.component("CCardTitle", CCardTitle);
app.component("CCardText", CCardText);
app.component("CButton", CButton);
app.component("CCardFooter", CCardFooter);
app.component("CFormInput", CFormInput);
app.component("CFormTextarea", CFormTextarea);
app.component("CToaster", CToaster);
app.component("CToast", CToast);
app.component("CToastHeader", CToastHeader);
app.component("CToastBody", CToastBody);
app.component("CModal", CModal);
app.component("CModalBody", CModalBody);
app.component("CModalHeader", CModalHeader);
app.component("CModalTitle ", CModalTitle);
app.component("CModalBody", CModalBody);
app.component("CModalFooter", CModalFooter);
app.provide("icons", icons);
app.component("CIcon", CIcon);
app.use(store).use(router).mount("#app");

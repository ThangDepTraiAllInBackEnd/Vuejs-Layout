import { createApp } from 'vue'
import App from './App.vue'
import MButton from './components/base/Button/MButton.vue'
import TheToast from './components/base/Toats/TheToast.vue'
import TheDialog from "./components/base/Dialog/TheDialog.vue";
import MCombobox from "./components/base/Combobox/Combobox.vue";
import TheDialogNotice from "./components/base/DialogNotice/TheDialogNotice.vue";

global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

const app = createApp(App);
app.component('TheDialog', TheDialog);
app.component('MCombobox', MCombobox);
app.component('MButton', MButton);
app.component('TheToast', TheToast);
app.component('TheDialogNotice', TheDialogNotice);

app.mount('#app')

export default app;
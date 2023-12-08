<template>
  <div class="toastbox show">
    <div class="toast-message-container">
      <div class="toast-message">
        <span class="message-icon"><i :class="iconClass"></i></span>
        <div class="message-text">
          <span
            :class="{
              'message-title': true,
              'message-corlor-success': type === 'success',
              'message-corlor-fail': type === 'fail',
            }"
            >{{ title }}</span
          >
          <span class="message-content">{{ content }}</span>
        </div>
        <span class="message-redo"><a href="">Hoàn tác</a></span>
        <span class="message-close" id="btn-close-toast"
          ><i class="fa-solid fa-x"></i
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheToast",
  props: {
    type: {
      type: String,
      required: true,
      validator: (value) => ["success", "fail"].includes(value),
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
  computed: {
    iconClass() {
      let additionalClass;
      if (this.type === "success") {
        additionalClass = "message-corlor-success";
      } else if (this.type === "fail") {
        additionalClass = "message-corlor-fail";
      }
      return ["fa-solid", this.icon, additionalClass]; // Assuming you are using Font Awesome
    },
  },
};
</script>

<style>
</style>
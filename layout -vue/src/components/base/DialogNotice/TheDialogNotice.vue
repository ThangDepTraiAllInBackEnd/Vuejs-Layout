<template>
  <div id="log-confirm" class="show">
    <div class="m-dialog-container">
      <div class="m-dialog-content">
        <div class="m-dialog-header">
          <div class="m-dialog-title">
            <h3 id="confirm-title">{{ title }}</h3>
          </div>
          <div class="m-dialog-icon">
            <h3 id="btn-close-confirm" class="btn-dialog-close">
              <i class="fa-solid fa-x" @click="hiddenDialog"></i>
            </h3>
          </div>
        </div>

        <div class="m-dialog-details">
          <i class="fa-solid fa-circle-question" style="color: #ff0000"></i
          ><span id="confirm-content" class="dialog-details-txt">
            {{ content }}
          </span>
        </div>
        <div class="m-dialog-btn">
          <div>
            <MButton
              text="Đồng ý"
              type="primary"
              @click="hiddenDialog"
            ></MButton>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- toast message -->
</template>

<script>
export default {
  name: "TheDialogNotice",
  props: {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    hiddenDialog: {
      type: Function,
    },
  },
};
</script>

<style>
</style>
<template>
  <button 
    :class="{
      'm-button': type=== 'primary',
      'm-secondary-button': type === 'secondary',
      'm-button-icon': type === 'icon',
    }"
  >
    <i v-if="type === 'icon'" :class="iconClass"></i>
    <span :class="{ 'm-button-icon-txt': type === 'icon' }"> {{ text }}</span>
  </button>
</template>

<script>
export default {
  name: "MButton",
  props: {
    text: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      validator: (value) => ["primary", "secondary", "icon"].includes(value),
    },
    icon: {
      type: String, // only required when type is 'icon'
    },
  },

  computed: {
    iconClass() {
      return ["fas ", this.icon]; // Assuming you are using Font Awesome
    },
  },
};
</script>
<style scoped>
/* button */
.m-button {
  height: 36px;
  width: 79px;
  opacity: 100%;
  border-radius: 4px 4px 4px 4px;
  background-color: #50b83c;
  color: #ffff;
  border: none;
  cursor: pointer;
}

.m-button:hover {
  background-color: #57c841;
}

.m-secondary-button {
  height: 36px;
  width: 79px;
  opacity: 100%;
  border-radius: 4px 4px 4px 4px;
  background-color: #ffff;
  color: #000000;
  border: 0.5px solid rgb(209, 209, 209);
  cursor: pointer;
}

.m-button-icon {
  height: 36px;
  min-width: 80px;
  opacity: 100%;
  border-radius: 4px 4px 4px 4px;
  background-color: #50b83c;
  color: #ffff;
  border: none;
  cursor: pointer;
  padding-right: 16px;
  padding-left: 12px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.m-button-icon-txt {
  margin-left: 4px;
}

.m-button-icon:hover {
  background-color: #57c841;
}
/* end button */
</style>
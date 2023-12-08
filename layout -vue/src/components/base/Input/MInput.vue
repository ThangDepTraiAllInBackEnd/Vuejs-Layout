<template>
  <div>
    <label class="m-textfield-label" for="id">{{ label }} </label>
    <div
      class="m-textfield-full-input form-dialog-input"
      :class="{
        'form-dialog-input-err': errBorder,
      }"
    >
      <input class="input-form" :id="id" :type="type" v-model="value" />
    </div>
    <div :id="errorid" class="textfield-err">{{ errMsg }}</div>
  </div>
</template>

<script>
export default {
  name: "MInput",
  props: {
    type: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    errorid: {
      type: String,
      required: true,
    },
    inputValue: {
      type: String,
    },
    validRegex: {
      type: RegExp,
    },
    isRequired: {
      type: Boolean,
    },
    formatMsg: {
      type: String,
    },
  },
  created() {
    this.value = this.inputValue;
  },
  data() {
    return {
      value: "",
      errBorder: false,
      errMsg: "",
    };
  },
  methods: {
    /**
     * Format data base regex and required
     *
     * @param {*} data - Value to formated
     */
    validateData(data) {
      //data not required
      if (!this.isRequired) {
        return true;
      } else {
        // data must be validate base regex
        if (this.validRegex !== undefined) {
          if (data !== "") {
            // data not match regex
            if (!this.validRegex.test(data)) {
              this.errMsg = this.formatMsg;
              return false;
            } else {
              this.errMsg = "";
              return true;
            }
          } else {
            this.errMsg = "Không được để trống";
            return false;
          }
        } else {
          if (data !== "") {
            this.errMsg = "";
            return true;
          }
          this.errMsg = "Không được để trống";
          return false;
        }
      }
    },
  },
  watch: {
    value(newValue) {
      // valid value-> update data for parent componet
      if (this.validateData(newValue)) {
        this.errBorder = false;
        this.$emit("update:inputValue", newValue);
      } else {
        this.errBorder = true;
      }
    },
  },
};
</script>
<style scoped>
.form-dialog-input-err {
  border: 1px solid rgb(255, 49, 49);
}
</style>

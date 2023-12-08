
<template>
  <!-- form dialog -->
  <div id="log-con" class="show">
    <div class="form-container">
      <div class="form">
        <div class="form-header">
          <div class="form-title">
            <h2>Thông tin khách hàng</h2>
          </div>
          <div class="form-icon">
            <h3
              id="btn-close-form"
              title="đóng cửa sổ"
              class="btn-dialog-close"
            >
              <i class="fa-solid fa-x" @click="isShowForm"></i>
            </h3>
          </div>
        </div>
        <form class="form-table">
          <table class="form-data">
            <tr>
              <td>
                <MInput
                  type="text"
                  id="input-cuscode"
                  label="Mã khách hàng"
                  errorid="err-cuscode"
                  v-model:inputValue="customer.customerCode"
                />
              </td>
              <td>
                <MInput
                  type="text"
                  id="input-full-name"
                  label="Họ và tên"
                  errorid="err-fullname"
                  v-model:inputValue="customer.fullName"
                  :isRequired="true"
                />
              </td>
              <td>
                <MInput
                  type="date"
                  id="input-birthdate"
                  label="Ngày sinh"
                  errorid="err-birthdate"
                  v-model:inputValue="customer.dateOfBirth"
                />
              </td>

              <td>
                <MCombobox />
              </td>
            </tr>

            <tr>
              <td colspan="2">
                <MInput
                  type="text"
                  id="input-phone"
                  label="Số điện thoại"
                  errorid="err-phone"
                  v-model:inputValue="customer.phone"
                  :validRegex="phoneRegex"
                  :isRequired="true"
                  formatMsg="số điện thoại sai định dạng"
                />
              </td>
              <td>
                <MInput
                  type="text"
                  id="input-cmtnd"
                  label="Số CMTND"
                  errorid="err-cmtnd"
                />
              </td>
              <td>
                <MInput
                  type="date"
                  id="provide-date"
                  label="Ngày cấp"
                  errorid="err-providedate"
                />
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <MInput
                  type="text"
                  id="input-email"
                  label="Email"
                  errorid="err-email"
                  v-model:inputValue="customer.email"
                  :validRegex="emailRegex"
                  :isRequired="true"
                  formatMsg="email phải theo định dạng email@example.com"
                />
              </td>
              <td colspan="2">
                <MInput
                  type="text"
                  id="input-provide-province"
                  label="Nơi cấp"
                  errorid="err-provideplace"
                />
              </td>
            </tr>
            <tr>
              <td>
                <MInput
                  type="text"
                  id="input-owed"
                  label="Số tiền nợ"
                  errorid="err-owed"
                />
              </td>
            </tr>

            <tr>
              <td colspan="4">
                <MInput
                  type="text"
                  id="input-company"
                  label="Công ty "
                  errorid="err-company"
                />
              </td>
            </tr>
            <tr>
              <td colspan="4">
                <MInput
                  type="text"
                  id="input-address"
                  label="Địa chỉ"
                  errorid="err-address"
                />
              </td>
            </tr>
          </table>
        </form>
      </div>
      <div class="form-button">
        <div class="form-btn-cancel">
          <MButton text="Hủy" type="secondary" @click="isShowForm" />
        </div>
        <div class="form-btn-submit">
          <MButton text="Cất" type="primary" @click="showErrDialog" />
        </div>
      </div>
    </div>
    <TheDialogNotice
      v-if="isShowNoticeDialog"
      :title="noticeTitle"
      :content="noticeContent"
      :hiddenDialog="togleDialog"
    ></TheDialogNotice>
  </div>
  <!-- end form dialog -->
</template>
<script>
import MInput from "../Input/MInput.vue";

export default {
  name: "TheDialog",
  components: {
    MInput,
  },
  data() {
    return {
      customer: {
        customerCode: "",
        fullName: "",
        dateOfBirth: "",
        email: "",
        phone: "",
      },
      isCustomerCodeValid: true,
      emailRegex: new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/),
      phoneRegex: new RegExp(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/),
      // for noticeDialog
      isShowNoticeDialog: false,
      noticeTitle: "",
      noticeContent: "",
    };
  },
  props: ["isShowForm"],
  methods: {
    // submit form base all data is valid or not
    submitForm() {
      if (this.customer.customerCode !== "") {
        return false;
      } else {
        this.isCustomerCodeValid = false;
        return true;
      }
    },
    /**
     * show errr dialog
     */
    showErrDialog() {
      if (this.submitForm) {
        console.log("vao");
        this.noticeTitle = "Lỗi ";
        this.noticeContent = "Vui lòng điền đầy đủ các trường thông tin";
      }
      this.isShowNoticeDialog = true;
    },
    /**
     * change form's status ( show or hide )
     */
    togleDialog() {
      this.isShowNoticeDialog = false;
    },
  },
};
</script>
<style >
#log-con {
  opacity: 0;
  pointer-events: none;
  background: rgb(0, 0, 0, 0.5);
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

#log-con.show {
  opacity: 100;
  pointer-events: all;
}

.form-container {
  position: absolute;
  top: 35px;
  background-color: #ffff;
  border-radius: 4px 4px 4px 4px;
}

.form {
  margin: 0 24px;
  margin-bottom: 18px;
}

.form-header {
  display: flex;
  justify-content: space-between;
  position: relative;
}

.form-icon {
  cursor: pointer;
  color: red;
}
.form-data td {
  padding: 0px 5px;
}

.form-button {
  display: flex;
  justify-content: flex-end;
  padding: 12px 24px;
  background-color: #f5f5f5;
  border-radius: 4px 4px 4px 4px;
}

.form-btn-cancel {
  margin-right: 10px;
}

/*end-form-dialog */

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

/* text filed */
.m-textfield {
  height: 41px;
  width: 175px;
  margin: 24px;
}

.m-textfield label {
  font-weight: 500;
  font-size: 14px;
}

.m-textfield-input {
  height: 36px;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
}

.m-textfield-input input {
  /* width: 140px; */
  font-size: 14px;
  padding-top: 0px;
  padding-bottom: 0px;
  border: none;
  height: 100%;
}

.m-textfield-input i {
  font-size: 14px;
  margin-left: 0px;
  color: #4f4f4f;
}

.m-textfield-input input:focus {
  outline: none;
}

.m-textfield-input input:hover {
  background-color: #e6e6e6;
  cursor: pointer;
}

.m-textfield-input input::placeholder {
  color: #999999;
  font-size: 14px;
  padding-left: 12px;
}

/* text field */
.m-textfield {
  height: 41px;
  width: 175px;
}

.m-textfield label {
  font-weight: 500;
  font-size: 14px;
}

.m-textfield-input {
  height: 36px;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #e6e6e6;
  margin-top: 8px;
  display: flex;
  align-items: center;
}

.m-textfield-radio {
  margin-top: 4px;
}

.m-textfield-radio input {
  margin-top: 13px;
  margin-bottom: 13px;
  width: 15px;
  height: 15px;
}

.m-textfield-input input {
  width: 140px;
  font-size: 14px;
  padding-top: 0px;
  padding-bottom: 0px;
  border: none;
  height: 100%;
}

/* ---------------------------full input------------ */
.m-textfield-full-input {
  height: 34px;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #e6e6e6;
  margin-top: 8px;
  display: flex;
  align-items: center;
}

.m-textfield-full-input input {
  width: 100%;
  font-size: 14px;
  padding-top: 0px;
  padding-bottom: 0px;
  border: none;
  height: 100%;
}

.m-textfield-full-input input:focus {
  outline: none;
}

.m-textfield-full-input input:hover {
  background-color: #e6e6e6;
  cursor: pointer;
}

.m-textfield-full-input input::placeholder {
  color: #999999;
  font-size: 14px;
  padding-left: 12px;
}

.textfield-err {
  margin-top: 1px;
  color: red;
  height: 15px;
  background-color: white;
  font-size: 11px;
}

/* ------date------------- */

input::-webkit-datetime-edit,
input::-webkit-calendar-picker-indicator {
  color: #1f1f1f;
  font-family: Notosan;
}

.m-medium-textfield {
  width: 360px;
}

/* end text filed */

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
input {
  padding: 8px;
}
/* end button */
input {
  padding: 8px;
}
</style>
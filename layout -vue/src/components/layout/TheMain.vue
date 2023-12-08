

<template>
  <div class="main">
    <div class="main-content">
      <div class="main-top">
        <div class="main-top-title">
          <h3>Quản lý khách hàng</h3>
        </div>
        <div>
          <p>
            <MButton
              text="Thêm mới"
              type="icon"
              icon="fa-plus"
              @click="togleForm()"
            />
          </p>
        </div>
      </div>

      <div class="main-table">
        <!-- search field -->
        <div class="table-top">
          <div class="table-top-info">
            <div class="table-top-selected">
              Đã chọn: <strong id="totalCheckbox">{{ numberOfChecked }}</strong>
            </div>
            <div class="table-top-unselect" @click="toggleCheckAll(false)">
              Bỏ chọn
            </div>
            <div
              class="table-top-deleteall"
              id="btn-delete-all"
              @click="togleDialog()"
            >
              <i class="fa-solid fa-trash-can"></i>
              <button>Xóa tất cả</button>
            </div>
          </div>

          <div class="table-top-action">
            <div class="table-top-ex">
              <i class="fa-solid fa-file-excel"></i>
            </div>
            <div class="table-top-reload">
              <i class="fa-solid fa-rotate"></i>
            </div>
          </div>
        </div>
        <!-- end search field -->
        <!-- table -->
        <div class="main-table-content">
          <table class="m-table">
            <tr>
              <th class="td-data-left-checkbox">
                <input
                  id="header-checkbox"
                  type="checkbox"
                  v-model="selectAll"
                  @change="toggleCheckAll(true)"
                />
              </th>
              <th class="td-data-left-id">Mã khách hàng</th>
              <th class="td-data-left-name">Họ và tên</th>
              <th class="td-data-left-gender">Giới tính</th>
              <th class="td-data-left-date">Ngày sinh</th>
              <th class="td-data-left-company">Công ty</th>
              <th class="td-data-left-owed-header">Dư nợ</th>
            </tr>
            <tbody id="table-body">
              <!-- append body here -->
              <tr
                v-for="customer in customers"
                :key="customer.CustomerId"
                :class="{ 'is-tr-hover': customer.isChecked }"
                class="m-tr-hover m-tr-data"
              >
                <td class="td-checkbox-center">
                  <input
                    class="table-checkbox"
                    type="checkbox"
                    v-model="customer.isChecked"
                    @click="toggleRowHover(customer)"
                  />
                </td>
                <td class="td-data-left-id">{{ customer.CustomerCode }}</td>
                <td class="td-data-left-name">{{ customer.FullName }}</td>
                <td class="td-data-left-gender">
                  {{ customer.Gender === 1 ? "Nam" : "Nữ" }}
                </td>
                <td class="td-data-left-date">
                  {{ formatDateString(customer.DateOfBirth) }}
                </td>
                <td class="td-data-left-company">
                  {{ customer.CompanyName }}
                </td>
                <td class="td-data-left-owed">
                  {{ vndFormat(customer.DebitAmount) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- end table -->
        <!-- main footer -->
        <div class="main-table-footer">
          <div class="m-td-bottom">
            <div class="m-td-bottom-left">
              Tổng: <b id="total-record">{{ customers.length }}</b>
            </div>
            <div class="m-td-bottom-right">
              <span class="right-record-per-page">Số bản ghi/trang </span>
              <span class="right-selectpage"
                ><select>
                  <option value="">10</option>
                  <option value="20">20</option>
                </select>
              </span>
              <span class="right-numofrecord"> </span>
              <span class="right-button">
                <i class="fa-solid fa-chevron-left"></i>
                <i class="fa-solid fa-chevron-right"></i>
              </span>
            </div>
          </div>
        </div>
        <!-- main footer -->
      </div>
    </div>
  </div>
  <TheDialog v-if="isShowForm" :isShowForm="togleForm" />

  <TheToast
    v-if="isShowToast"
    :type="toastType"
    :title="toastTitle"
    :content="toastContent"
    :icon="toastIcon"
  />

  <TheDialogNotice
    v-if="isShowNoticeDialog"
    title="Title ở đây"
    content="Bạn có muốn xóa hết tất cả bản ghi không ?"
    :hiddenDialog="togleDialog"
  ></TheDialogNotice>
</template>
<script>
import axios from "axios";
export default {
  created() {
    /**
     *get data from api url
    */
    axios
      .get(this.apiUrl)
      .then((response) => {
        this.customers = response.data;
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu:", error);
        this.showToast(
          "fail",
          "Thất bại !",
          "Đã xảy ra lỗi khi tải dữ liệu",
          "fa-circle-xmark"
        );
      });
  },
  name: "TheMain",
  data() {
    return {
      // for dialog form
      isShowForm: false,
      customers: [],
      apiUrl: "https://cukcuk.manhnv.net/api/v1/Customers",
      numberOfChecked: 0,
      // for toast
      isShowToast: false,
      toastType: "",
      toastTitle: "",
      toastContent: "",
      toastIcon: "",
      // for noticeDialog
      isShowNoticeDialog: false,
      noticeTitle: "",
      noticeContent: "",
    };
  },
  methods: {
    /**
     * change form's status ( show or hide )
     */
    togleForm() {
      this.isShowForm = !this.isShowForm;
    },
    /**
     * change form's status ( show or hide )
     */
    togleDialog() {
      this.isShowNoticeDialog = !this.isShowNoticeDialog;
    },
    /**
     * format date to dd/mm/yyyy
     *
     * @param {*} inputDateString - Date to format
     * @returns - Date formated
     */
    formatDateString(inputDateString) {
      var dateObject = new Date(inputDateString);
      var month = dateObject.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      return (
        dateObject.getDate() + "/" + month + "/" + dateObject.getFullYear()
      );
    },
    /**
     * Show toast and close after 2s or click into button to close toast
     *
     * @param {*} type - Type of toast ( failed or success)
     * @param {*} title - Toast's title
     * @param {*} content -Toast's message content
     * @param {*} icon -Toast's icon base type
     */
    showToast(type, title, content, icon) {
      this.isShowToast = true;
      this.toastType = type;
      this.toastTitle = title;
      this.toastContent = content;
      this.toastIcon = icon;
      // hide toast after 2 seconds
      setTimeout(() => {
        this.isShowToast = false;
      }, 2000);
    },
    /**
     * check or uncheck all check box base button that use just click ( check box / uncheck all)
     * @param {*} status - true -> togle checkbox / false -> uncheck All check box
     */
    toggleCheckAll(status) {
      if (status) {
        this.customers.forEach((customer) => {
          customer.isChecked = this.selectAll;
        });
        if (this.selectAll) {
          this.numberOfChecked = this.customers.length;
        } else {
          this.numberOfChecked = 0;
        }
      } else {
        this.selectAll = false;
        this.customers.forEach((customer) => {
          customer.isChecked = this.selectAll;
        });

        this.numberOfChecked = 0;
      }
    },
    /**
     * add color for row base checkbox's status
     * @param {*} customer - Checkbox in row
     */
    toggleRowHover(customer) {
      customer.isChecked = !customer.isChecked;
      if (customer.isChecked) {
        this.numberOfChecked++;
      } else {
        if (this.selectAll) {
          this.selectAll = false;
        }
        this.numberOfChecked--;
      }
    },
    /**
     * Format money to VND
     * @param {*} amount Money to format
     */
    vndFormat(amount) {
      amount = parseFloat(amount).toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
      return amount.slice(0, -1);
    },
  },
};
</script>

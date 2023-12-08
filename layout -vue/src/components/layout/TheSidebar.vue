<template>
  <div class="nav">
    <div class="nav-sidebar">
      <div class="sidebar-container">
        <div class="sidebar-content">
          <div class="sidebar-item">
            <div class="sidebar-item-icon">
              <i class="fa-solid fa-chart-pie"></i>
            </div>
            <!-- <div class="sidebar-item-icon home-icon"> </div> -->
            <div class="sidebar-item-text"><a href="#">Trang chủ</a></div>
          </div>
          <div class="sidebar-item">
            <div class="sidebar-item-icon">
              <i class="fa fa-line-chart"></i>
            </div>
            <!-- <div class="sidebar-item-icon report-icon"> </div> -->
            <div class="sidebar-item-text"><a href="#">Báo cáo</a></div>
          </div>
          <div class="sidebar-item">
            <div class="sidebar-item-icon">
              <i class="fa-solid fa-users-gear"></i>
            </div>
            <!-- <div class="sidebar-item-icon customer-icon"> </div> -->
            <div class="sidebar-item-text"><a href="#">Khách hàng</a></div>
          </div>
          <div class="sidebar-item">
            <div class="sidebar-item-icon">
              <i class="fa-solid fa-gears"></i>
            </div>
            <!-- <div class="sidebar-item-icon settings-icon"> </div> -->
            <div class="sidebar-item-text"><a href="#">Cài đặt</a></div>
          </div>
        </div>
      </div>

      <div class="sidebar-footer">
        <div class="sidebar-footer-content">
          <div class="sidebar-item-icon">
            <i class="fa-solid fa-chevron-left"></i>
          </div>
          <div class="sidebar-item-text">Thu gọn</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TheSideBar",
};
</script>
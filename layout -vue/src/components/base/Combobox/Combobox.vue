<template>
  <label class="m-textfield-label" for="m-inputfield-id">Field label</label>
  <div class="m-textfield-combobox">
    <input placeholder="Place holder" id="search-field" />
    <div class="input-btn">
      <i class="fa-solid fa-chevron-down"></i>
    </div>
  </div>
  <div id="dropdown-container"></div>
  <div id="err-birthdate" class="textfield-err"></div>
</template>

<script>
import $ from "jquery";

export default {
    name: 'MCombobox',
    mounted: function() {
        window.setTimeout(function() {
            $('.logo').css('opacity', 0);   
        }, 1000);
    } 
}
</script>



<style>
/* combobox */

.m-textfield-combobox {
  height: 34px;
  width: 175px;
  margin-top: 8px;
  border-radius: 4px;
  border: 1px solid #e6e6e6;
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
}

.m-textfield-comboboxs:hover {
  background-color: #e6e6e6;
  cursor: pointer;
}

.m-textfield-combobox input {
  padding: 12px;
  width: 120px;
  font-size: 14px;
  padding-top: 0px;
  padding-bottom: 0px;
  border: none;
  height: 100%;
  outline: none;
  border-radius: 4px;
}

.m-textfield-combobox input::placeholder {
  color: #999999;
  font-size: 14px;
  /* padding-left: 12px */
}

.m-textfield-combobox input:hover {
  background-color: #e6e6e6;
  cursor: pointer;
}

.input-btn {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border-left: 1px solid red; */
  border-left: 1px solid #e6e6e6;
}

.input-btn:hover {
  cursor: pointer;
}

/* result */

#dropdown-container {
  position: absolute;
  background-color: white;
  width: 175px;
}

#result-container {
  /* padding: 8px 0; */
  max-width: 175px;
  max-height: 308;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  overflow-y: scroll;
}

/* result */
#result-container::-webkit-scrollbar {
  width: 0px;
}

#result-container::-webkit-scrollbar-thumb {
  background-color: gray;
  border-radius: 7px;
}

.result-item {
  height: 36px;
  color: black;
  display: flex;
  align-items: center;
  max-width: 175px;
}

.item-hover:hover {
  background-color: #e6e6e6;
}

.is-item-focus {
  background-color: #e6e6e6;
}

.result-item-checked {
  background-color: #f4f5f7;
  color: whitesmoke;
  background-color: #019160;
}

.result-icon {
  height: 36px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.result-item li {
  list-style-type: none;
  padding: 0px;
  width: 100px;
}
</style>
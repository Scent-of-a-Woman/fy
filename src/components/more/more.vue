<template>
  <div class="amap-page-container">
   <input type="text" name="" v-model="value"
   v-validataion="{
    val:value,
    reg:'^1\\d{3}$',
    toptips:'必须为1开头且为数字的11位数'
  }">
</div>
</template>

<style>
.amap-demo {
  height: 300px;
}
</style>

<script>
export default {
  data() {
    return {
      value:"wuhan",
      }
    }
    };
    </script>
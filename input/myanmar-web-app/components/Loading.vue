<template>
  <view
    class="Loads acea-row row-center-wrapper"
    v-if="loading || !loaded"
    style="margin-top: 20rpx;"
  >
    <template v-if="loading">
      <view
        class="iconfont icon-jiazai loading acea-row row-center-wrapper"
      ></view>
      တင်နေသည်
    </template>
    <template v-else>
      ပိုပြီးတင်ရန်တက်ပါ
    </template>
  </view>
</template>

<script>
export default {
  name: "Loading",
  props: {
    loaded: Boolean,
    loading: Boolean
  }
};
</script>

<script setup lang="ts"></script>

<template>
  <main>
    <div class="home-container mb-[20px]"></div>

    <div class="flex-column">
      <van-button type="primary">主要按钮</van-button>
      <van-button type="success">成功按钮</van-button>
      <van-button type="default">默认按钮</van-button>
      <van-button type="danger">危险按钮</van-button>
      <van-button type="warning">警告按钮</van-button>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.home-container {
  width: 300px;
  height: 300px;
  background-color: skyblue;
  border-radius: 10px;
}
</style>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { IisCheck, ItrafficInfo } from "../index";
import { calcuProgress } from "../utils/calcuProgress";
const isCheck = ref<IisCheck>(await window.request.doCheckIn());

const trafficInfo = ref<ItrafficInfo>(await window.request.doGetData());

setInterval(async () => {
  trafficInfo.value = await window.request.doGetData();
  console.log(trafficInfo.value);
}, 300000);

const styleVal = computed(() => {
  const progressObj = ref(calcuProgress(trafficInfo.value));
  return {
    "--todayPro": progressObj.value.todayPro,
    "--lastPro": progressObj.value.lastPro,
    "--unPro": progressObj.value.unPro,
  };
});
</script>

<template>
  <div class="main" :style="styleVal">
    <div class="today-use">
      <span class="today-label">今日已用:</span
      ><span class="today-value">{{ trafficInfo.todayUsedTraffic }}</span>
    </div>

    <div class="today-bg">
      <div class="today-inner"></div>
    </div>

    <div class="last-use">
      <span class="last-label">过去已用:</span
      ><span class="last-value">{{ trafficInfo.lastUsedTraffic }}</span>
    </div>

    <div class="last-bg">
      <div class="last-inner"></div>
    </div>

    <div class="un-used">
      <span class="un-label">流量剩余:</span
      ><span class="un-value">{{ trafficInfo.unUsedTraffic }}</span>
    </div>

    <div class="un-bg">
      <div class="un-inner"></div>
    </div>

    <div class="check">
      <span>{{
        isCheck.ret === 0 || isCheck.ret === 1
          ? "今日已自动帮您签到"
          : "签到系统好像出问题了"
      }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  font-size: 14px;
  padding: 10px;
  .today-use {
    display: flex;
    justify-content: space-between;
    span {
      display: block;
    }
    .today-value {
      font-size: 12px;
      font-weight: 600;
      color: #f74c56;
      border: 1px solid #ff6895;
      border-radius: 3px;
      background-color: #fff3f2;
      padding: 0 2px;
    }
  }
  .last-use {
    display: flex;
    justify-content: space-between;
    span {
      display: block;
    }
    .last-value {
      font-size: 12px;
      font-weight: 600;
      color: #f87245;
      border: 1px solid #e5c319;
      border-radius: 3px;
      background-color: #fef3ea;
      padding: 0 2px;
    }
  }
  .un-used {
    display: flex;
    justify-content: space-between;
    span {
      display: block;
    }
    .un-value {
      font-size: 12px;
      font-weight: 600;
      color: #70cc42;
      border: 1px solid #7eea19;
      border-radius: 3px;
      background-color: #f7fff0;
      padding: 0 2px;
    }
  }
  .today-label::before {
    content: "";
    display: inline-block;
    height: 10px;
    width: 10px;
    background-color: #ff6895;
    border-radius: 5px;
    margin-right: 6px;
  }
  .last-label::before {
    content: "";
    display: inline-block;
    height: 10px;
    width: 10px;
    background-color: #e99f14;
    border-radius: 5px;
    margin-right: 6px;
  }
  .un-label::before {
    content: "";
    display: inline-block;
    height: 10px;
    width: 10px;
    background-color: #7eea19;
    border-radius: 5px;
    margin-right: 6px;
  }

  .today-bg {
    margin: 2px 0;
    width: 100%;
    height: 13px;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    .today-inner {
      width: var(--todayPro);
      height: 100%;
      border-radius: 5px;
      background-color: #ff6895;
    }
  }

  .last-bg {
    margin: 2px 0;
    width: 100%;
    height: 13px;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    .last-inner {
      width: var(--lastPro);
      height: 100%;
      border-radius: 5px;
      background-color: #e99f14;
    }
  }
  .un-bg {
    margin: 2px 0;
    width: 100%;
    height: 13px;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    .un-inner {
      width: var(--unPro);
      height: 100%;
      border-radius: 5px;
      background-color: #7eea19;
    }
  }

  .check {
    color: rgba(0, 119, 255, 0.651);
    display: table;
    margin: 0 auto;
  }
}
</style>

::: anchor
:::

::: title 基础使用
:::

::: demo 使用 `lay-color-picker` 标签, 创建颜色选择器。

<template>
  <lay-color-picker v-model="color"></lay-color-picker>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const color = ref("#009688");

    return {
      color
    }
  }
}
</script>

:::

::: title 禁止选择
:::

::: demo 使用 `lay-color-picker` 标签, 创建颜色选择器。

<template>
  <lay-color-picker v-model="color" :disabled="true"></lay-color-picker>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const color = ref("#009688");

    return {
      color
    }
  }
}
</script>

:::

::: title 预设颜色
:::

::: demo 通过 `preset` 属性, 预设可选的颜色列表。

<template>
  <lay-color-picker v-model="color1" :preset="preset1"></lay-color-picker>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const color1 = ref("#FFB800");

    const preset1 = ref(["#009688", "#1e9fff", "#ffb800", "#ff5722", "#5fb878"])

    return {
      color1,
      preset1
    }
  }
}
</script>

:::

::: title 取色器
:::

::: demo

<template>
  {{ color }} 
  <lay-color-picker v-model="color" :eyeDropper="true"></lay-color-picker>
  <lay-button @click="changeColor">更换颜色</lay-button>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const color = ref("#009688");

    const changeColor = () => {
      color.value = "#393D49"
    }

    return {
      color,
      changeColor
    }
  }
}
</script>

:::

::: title 开启清空确认
:::

::: demo `allowClear` 开启清空 `simple`(默认为true) 即时改变 `modelValue`。

<template>
  <lay-color-picker v-model="color5" allowClear :simple="false"></lay-color-picker>
</template>

<script setup lang="ts">
import { ref } from "vue";

const color5 = ref("");
</script>

:::

::: title Icon Picker 属性
:::

::: table

|            |          |     |   |   | 
| ---------- | -------- | --- |--- |--- |
| v-model    | 选中色   | --  |--  |--  |
| preset | 预设颜色 | --  |--  |--  |
| size | 尺寸 | --  |--  |--  |
| eyeDropper | 取色器 | `boolean`  |--  |--  |
| disabled | 禁用 | `boolean`  |--  |lfase  |
| allowClear | 是否允许清空 | `boolean`  |--  | false |
| simple | 是否即时改变`modelValue` | `boolean`  |--  | true |
| contentStyle             | 内容自定义样式     | `StyleValue` | -- | -- |
| contentClass             | 内容自定义Class    | `string` `Array<string \| object>` `object` | -- | -- |

:::

::: previousNext colorPicker
:::

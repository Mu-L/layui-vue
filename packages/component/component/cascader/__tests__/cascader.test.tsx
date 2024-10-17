import { nextTick, ref, onMounted, Ref } from "vue";
import { describe, expect, expectTypeOf, test } from "vitest";
import { mount } from "@vue/test-utils";

import LayCascader from "../index.vue";
import LayDropdown from "../../dropdown/index.vue";
import { sleep } from "../../../test-utils";

describe("LayCascader", () => {
  test("options 数据源改变内部未更新", async () => {
    const wrapper = mount({
      setup() {
        const options = ref([
          { label: "label1", value: "1" },
          { label: "label2", value: "2" },
        ]);

        onMounted(() => {
          options.value = [
            { label: "label1", value: "1" },
            { label: "label2", value: "2" },
            { label: "label3", value: "3" },
          ];
        });

        return () => <LayCascader options={options.value}></LayCascader>;
      },
    });

    const component = wrapper.getComponent(LayCascader);

    await nextTick();

    expect((component.vm as any)._context.flatData.value.length).toBe(3);
  });

  test("modelValue 兼容", async () => {
    const wrapper = mount(LayCascader, {
      props: {
        options: [
          {
            label: "label1",
            value: "1",
            children: [
              {
                label: "label1-1",
                value: "1-1",
                children: [{ label: "label1-1-1", value: "1-1-1" }],
              },
            ],
          },
          { label: "label2", value: "2" },
          { label: "label3", value: "3" },
        ],
        modelValue: "1/1-1/1-1-1",
      },
    });

    const component = wrapper.getComponent(LayCascader);

    await nextTick();
    expect((component.vm as any)._context.selectLabel.value).toBe(
      "label1 / label1-1 / label1-1-1"
    );

    wrapper.setProps({
      modelValue: ["1", "1-1"],
    });

    await nextTick();
    expect((component.vm as any)._context.selectLabel.value).toBe(
      "label1 / label1-1"
    );
  });

  test("modelValue 跟随初始类型", async () => {
    const wrapper = mount({
      setup() {
        const modelValue: Ref<string | string[]> = ref(["1", "1-1"]);
        const options = ref([
          {
            label: "label1",
            value: "1",
            children: [
              {
                label: "label1-1",
                value: "1-1",
                children: [{ label: "label1-1-1", value: "1-1-1" }],
              },
            ],
          },
          { label: "label2", value: "2" },
          { label: "label3", value: "3" },
        ]);

        onMounted(() => {
          nextTick(() => (modelValue.value = "1/1-1"));
        });

        return () => (
          <LayCascader
            options={options.value}
            modelValue={modelValue.value}
          ></LayCascader>
        );
      },
    });

    const component = wrapper.getComponent(LayCascader);
    await nextTick();
    expect(component.props("modelValue")).toMatchObject(["1", "1-1"]);
  });

  test("dropdown 显示和隐藏", async () => {
    const wrapper = mount(LayCascader, {});

    const component = wrapper.getComponent(LayCascader);
    const dropdown = wrapper.findComponent(LayDropdown);
    component.find(".layui-input").trigger("click");
    await nextTick();
    await sleep();
    expect(dropdown).toBeDefined();
    expect((dropdown.vm as any).open).toBe(true);
    document.dispatchEvent(new Event("click"));
    await nextTick();
    await sleep();
    expect((dropdown.vm as any).open).toBe(false);
  });
});

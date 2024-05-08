import Button from "../Button.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

describe("Button component", () => {
  test("emits event when clicked", async () => { // use async/await to wait for the event to be emitted
    const wrapper = mount(Button);
    await wrapper.trigger("click"); // other methods: .setProps(), .setData(), .setMethods()
    const buttonClickCall = wrapper.emitted("btn-click"); // this returns an array that includes the name of the event
    expect(buttonClickCall).toHaveLength(1);
  });
});

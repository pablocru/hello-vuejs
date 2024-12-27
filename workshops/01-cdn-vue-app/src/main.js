const { createApp, ref, computed } = Vue;

const originalHeadingList = ["Hello, Vue.js!", "Vue.js is awesome"];

createApp({
  setup() {
    const headingList = ref(originalHeadingList);

    const currentHeading = ref(0);
    const heading = computed(() => headingList.value[currentHeading.value]);
    function switchHeading() {
      currentHeading.value = ++currentHeading.value % headingList.value.length;
    }

    const showHeadingList = ref(true);

    const newHeading = ref("");
    function addHeading() {
      const theHeading = newHeading.value.trim();

      if (theHeading.length) {
        headingList.value.push(theHeading);
        newHeading.value = "";
      }
    }

    return {
      heading,
      headingList,
      showHeadingList,
      newHeading,
      switchHeading,
      addHeading,
    };
  },
}).mount("#switchHeading");

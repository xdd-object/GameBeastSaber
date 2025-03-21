<template>
  <AccountBook :currency-ids="currencyIds"></AccountBook>

</template>

<script>

import AccountBook from "@/views/common/components/accountBook.vue";
import {mapGetters} from "vuex";

export default {
  name: "wel",
  components: {
    AccountBook
  },
  data() {
    return {
      currencyIds: [1,4]
    };
  },
  computed: {

  },
  created() {

  },
  methods: {

  },

};
</script>

<style scoped="scoped" lang="scss">
</style>

<template>
  <AccountBook :types="types" :currency-ids="currencyIds"></AccountBook>

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
      types:[34,35,177,178,179],
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

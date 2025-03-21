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
      types:[189,190,191,192,193],
      currencyIds:[6,7],
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

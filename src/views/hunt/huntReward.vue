<template>
  <AccountBook :types="types" :currency-ids="currencyIds" :type-display="true" :currency-display="true"></AccountBook>

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
      types:[194],
      currencyIds:[1],
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

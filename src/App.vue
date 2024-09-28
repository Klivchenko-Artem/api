<template>
  <div>
    <HeaderReg />  
    <router-view />  
  </div>
</template>

<script>
import HeaderReg from './components/HeaderReg.vue';  

export default {
  components: {
    HeaderReg,  
  },
  created() {
    this.$store.dispatch('autoLogin');  
  },
};
</script>
<template>
  <div class="hello">
    <label>Username</label>
    <input placeholder="enter username" type="text" v-model="name" />

    <label>Password</label>
    <input placeholder="enter password" type="password" v-model="password" />

    <button @click="login()">Login</button>
    <button @click="signup()">Sign Up</button>
  </div>
</template>

<script>
import {user} from '@/utils/user'
import {mapState} from 'vuex'

export default {
  name: 'Login',
  data(){
    return{
      name: '',
      password: ''
    }
  },
  methods:{
    login(){
      user.auth(this.name, this.password, ({err})=> err && alert(err));
    },
    signup(){
      user.create(this.name, this.password, ({err})=> {
        if(err){
          alert(err)
        }else{
          this.login()
        }
      });
    },
  },
  computed:{
    ...mapState(['username'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

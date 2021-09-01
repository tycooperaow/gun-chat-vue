<template>
  <div class="hello">
    <section class="header">

      <div v-if="username">
        <h1>Hello {{username}}</h1>
        <button @click="signout()" > Log out</button>
      </div>

      <!-- <div v-else>
        <button @click="login()" > Login </button>
      </div> -->

    </section>

    <p>You are connected to <strong>{{chat_group}}</strong></p>

    <section class="chat">
      <div class="chat-bubble" :class="{'me': username== m.who}" v-for="(m, idx) in all_messages" :key="idx">
        <p>{{m.what}}</p>
        {{m.when.toFixed(0)}}
        <small>{{m.who}} | {{$simplfyDate(m.when.toFixed(0))}}</small>
      </div>
      <div class="chat-input">
        <input placeholder="Send a message" v-model="msg" />
        <button @click="sendMsg()">Send</button>
      </div>
    </section>
  </div>
</template>

<script>
import {user} from '@/utils/user'
import GUN from 'gun'
import {mapState} from 'vuex'
import 'gun/sea'

const db = GUN()

export default {
  name: 'HelloWorld',
  data(){
    return{
      msg: '',
      all_messages: [],
    }
  },
  methods:{
    async sendMsg(){
      const secret = await GUN.SEA.encrypt(this.msg, '#foo');
      // const secret = '#bitcoin'
      const message = user.get('all').set({ what: secret})
      const index = new Date().toISOString()
      db.get(this.chat_group).get(index).put(message)
      this.msg = ''

    },
  },
  computed:{
    ...mapState(['username', 'chat_group'])
  },
  mounted(){
    db.get(this.chat_group)
    .map()
    .once(async (data) =>{
      if(data){
        const key = '#foo'
        var message = {
          who: await db.user(data).get('alias'),
          what: (await GUN.SEA.decrypt(data.what, key)) + '',
          when: GUN.state.is(data, 'what'),
        }
      }

      if(message.what){
        console.log(message)
        this.all_messages = [...this.all_messages, message].sort((a, b) => a.when - b.when)
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
.chat {
  text-align: left;
  width: 80%;
  margin: 0 auto;
}
.chat-bubble{
  background-color: #f1f0f0;
  padding: 1rem;
  margin: .5rem 0;
  border-radius: 10px;
}
.me{
  background-color: #b8e6d1;
  text-align: right;

}
</style>

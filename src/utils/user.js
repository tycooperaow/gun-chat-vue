import GUN from 'gun';
import 'gun/axe'
import 'gun/sea'
import store from '@/_store/store'


//database
export const db = GUN();

//Gun user
//allows user to stay logged in between browser sessions
export const user = db.user().recall({sessionStorage: true})

// //current user's username
// export const username = '';

user.get('alias').on(v => store.mutations.SET_USERNAME(v))

db.on('auth', async(event)=>{
  const alias = await user.get('alias')
  store.commit("SET_USERNAME", alias)
  console.log('signed in as: ', alias)
  console.log(event)
})

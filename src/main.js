import Vue from 'vue'
import App from './App.vue'
import store from './_store/store'

Vue.config.productionTip = false

Vue.prototype.$simplfyDate = function(epoch) {
  let simplfied_time;
  const now = new Date()
  const utc_epoch = Math.round(now.getTime() / 1000)
  let time_ago = utc_epoch - epoch
  if (time_ago < 180) { //3mins or less
    simplfied_time = `now`
  } else if (time_ago >= 180 && time_ago < 3600) {
    let min = time_ago / 60 //by mins until hour
    if (min == 1 && min < 2) {
      simplfied_time = `${min.toFixed(0)} min ago`
    } else {
      simplfied_time = `${min.toFixed(0)} mins ago`
    }
  } else if (time_ago >= 3600 && time_ago < 86400) {
    let hour = time_ago / 3600 //by mins until hour
    if (hour == 1 && hour < 2) {
      simplfied_time = `${hour.toFixed(0)} hour ago`
    } else {
      simplfied_time = `${hour.toFixed(0)} hours ago`
    }
  } else if (time_ago >= 86400 && time_ago < 604800) {
    let day = time_ago / 86400
    if (day == 1 && day < 2) {
      simplfied_time = `${day.toFixed(0)} day ago`
    } else {
      simplfied_time = `${day.toFixed(0)} days ago`
    }
  } else if (time_ago >= 604800 && time_ago < 18144000) {
    let week = time_ago / 604800
    if (week >= 1 && week < 2) {
      simplfied_time = `${week.toFixed(0)} week ago`
    } else {
      simplfied_time = `${week.toFixed(0)} weeks ago`
    }
  } else if (time_ago >= 18144000 && time_ago < 31556952) {
    let month = time_ago / 18144000
    if (month >= 1 && month < 2) {
      simplfied_time = `${month.toFixed(0)} month ago`
    } else {
      simplfied_time = `${month.toFixed(0)} months ago`
    }
  } else if (time_ago >= 31556952) {
    let year = time_ago / 31556952
    if (year == 1 && year < 2) {
      simplfied_time = `${year.toFixed(0)} year ago`
    } else {
      simplfied_time = `${year.toFixed(0)} years ago`
    }
  }
  return simplfied_time
}
Vue.prototype.$fmtDate = function(epoch) {
  var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(epoch);
  let date_num = d.getDate()
  let month = d.getMonth()
  let year = d.getFullYear()
  let hour = d.getHours()
  let minute = d.getMinutes()
  let fmtMin = `${minute}`
  if(minute < 10){
    fmtMin = `0${minute}`
  }
  return `${hour}:${fmtMin} - ${month+1}/${date_num}/${year}`
}


new Vue({
  store,
  render: h => h(App),
}).$mount('#app')

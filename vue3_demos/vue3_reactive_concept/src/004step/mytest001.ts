import {
  effect,
  ref,
  reactive,
  computed
} from './dist/vue'

const usr = reactive({
  firstName: 'jio',
  lastName: 'pi'
})

let fullName = ''

effect(() => {
  fullName = usr.firstName + '-' + usr.lastName
})

console.log('fullName is: ', fullName)
// change firstName
usr.firstName = '404'
console.log('fullName is: ', fullName)

// computed
const count = ref(1)
const double = computed(() => count.value * 2)

console.log('double is: ', double.value)
count.value++
console.log('after count change, double is: ', double.value)

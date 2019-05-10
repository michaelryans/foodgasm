const url = 'http://localhost:3000'

let app = new Vue({
  el : "#app",
  data:{
    isLogin : false,
    userLogin:{
      email: "",
      password: ""
    },
    userRegister:{
      email:'',
      password: '',
      name:""
    },
    file: "",
    tag:"",
    tags:[],
    dummyImages: [
      {
        caption: "EH BENTAR LAGI LEBARAN CUK",
        tags :["lebaran", "anjay", "mohon maaf", "ramadhan"],
        image: "http://www.dapurkobe.co.id/wp-content/uploads/opor-ayam-lebaran.jpg"
      },
      {
        caption: "Mohon maaf lahir dan batin",
        tags :["ayam", "forgiveness", "Unyaw", "Hehe"],
        image: "data:image/jpeg;base64,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"
      },
      {
        caption: "EH BENTAR LAGI LEBARAN CUK,EH BENTAR LAGI LEBARAN CUK,EH BENTAR LAGI LEBARAN CUK,EH BENTAR LAGI LEBARAN CUK,EH BENTAR LAGI LEBARAN CUK,EH BENTAR LAGI LEBARAN CUK",
        tags :["lebaran", "anjay", "mohon maaf", "ramadhan","lebaran", "anjay", "mohon maaf", "ramadhan","ayam", "forgiveness", "Unyaw", "Hehe","ayam", "forgiven"],
        image: "http://www.dapurkobe.co.id/wp-content/uploads/opor-ayam-lebaran.jpg"
      },
      {
        caption: "EH BENTAR LAGI LEBARAN CUK",
        tags :["lebaran", "anjay", "mohon maaf", "ramadhan"],
        image: "http://www.dapurkobe.co.id/wp-content/uploads/opor-ayam-lebaran.jpg"
      },
      {
        caption: "EH BENTAR LAGI LEBARAN CUK",
        tags :["lebaran", "anjay", "mohon maaf", "ramadhan"],
        image: "http://www.dapurkobe.co.id/wp-content/uploads/opor-ayam-lebaran.jpg"
      },
      {
        caption: "EH BENTAR LAGI LEBARAN CUK",
        tags :["lebaran", "anjay", "mohon maaf", "ramadhan"],
        image: "http://www.dapurkobe.co.id/wp-content/uploads/opor-ayam-lebaran.jpg"
      },
      {
        caption: "EH BENTAR LAGI LEBARAN CUK",
        tags :["lebaran", "anjay", "mohon maaf", "ramadhan"],
        image: "http://www.dapurkobe.co.id/wp-content/uploads/opor-ayam-lebaran.jpg"
      },
      {
        caption: "EH BENTAR LAGI LEBARAN CUK",
        tags :["lebaran", "anjay", "mohon maaf", "ramadhan"],
        image: "http://www.dapurkobe.co.id/wp-content/uploads/opor-ayam-lebaran.jpg"
      }
      
  ]
  },
  methods:{
    login(input){
      axios({
        url: `${url}/users/login`,
        method: "post",
        data:{
          email: input.email,
          password: input.password
        }
      })
      .then(({data})=>{
        localStorage.setItem("token", data.token)
        this.isLogin = true
        this.$swal("Welcome!", "What are you craving on?", "success")
      })
      .catch(err=>{
        this.$swal("Oops..", "Invalid password/email", "error")
      })
    },
    logout(){
      localStorage.removeItem('token')
      this.isLogin = false
    },
    register(){
      axios({
        url: `${url}/users/register`,
        method: "post",
        data: {
          email: this.userRegister.email,
          name: this.userRegister.name,
          password: this.userRegister.password
        }
      })
      .then(({data})=>{
        this.$swal("Welcome foodist!", "Now you may log in", "success")
      })
    }
  },
  created(){
    if (localStorage.token){
      this.isLogin = true
    }else{
      this.isLogin = false
    }
  }
})
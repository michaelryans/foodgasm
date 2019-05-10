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
        this.userLogin.password = ""
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
        this.$bvModal.hide("register-modal");
        this.userRegister.email = ""
        this.userRegister.password = ""
        this.userRegister.name=""
        this.$swal("Welcome foodist!", "Now you may log in", "success")
      })
      .catch(err=>{
        this.$swal(`Oops`, "That email is already taken", "error")
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
const url = 'http://localhost:3000'

let app = new Vue({
  el : "#app",
  data:{
    searchInput : "",
    user:{},
    isLoading: false,
    image:"",
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
    isAccepted: false,
    file: "",
    url:"",
    tag:"",
    tags:[],
    caption: "",
    fetchedFeed: [],
    dataSearch: []
  },
  methods:{
    search(){
      axios({
        url: `${url}/foods`,
        method: "get",
        headers:{
          token : localStorage.token
        },
        params:{
          search: this.searchInput,
          tag: this.searchInput
        }
      })
      .then(({data})=>{
        this.fetchedFeed = data
      })
      .catch(err=>{
        console.log(err.response.data.message)
      })
    },
    unlike(id){
      axios({
        url : `${url}/foods/like/${id}`,
        method: "patch",
        headers :{
          token: localStorage.token
        }
      })
      .then(({data})=>{
        let index = this.fetchedFeed.findIndex(el=>{
          return el._id === id
        })
        let idIndex = this.fetchedFeed[index].likes.indexOf(this.user.id)
        this.fetchedFeed[index].likes.splice(idIndex, 1)
      })
    },
    likeAPic(id){
      axios({
        url: `${url}/foods/like/${id}`,
        method: "patch",
        headers:{
          token : localStorage.token
        }
      })
      .then(({data})=>{
        this.fetchedFeed = this.fetchedFeed.map(el=>{
          if(el._id === id){
            el.likes.push(this.user.id)
          }
          return el
        })
      })
      .catch(err=>{
        console.log(err.response.data.message)
      })
    }
    ,
    fetchFeed(){
      axios({
        url: `${url}/foods`,
        headers : {
          token : localStorage.token
        }
      })
      .then(({data})=>{
        console.log(data)
        console.log('berhasil fetch data')
        this.fetchedFeed = []
        this.fetchedFeed = data
      })
    },

    submitFile(){
      axios({
        url: `${url}/foods`,
        method: "post",
        headers:{
          token: localStorage.token
        },
        data:{
          caption: this.caption,
          tags: this.tags,
          image: this.image
        }
      })
      .then(({data})=>{
        this.$bvModal.hide("upload-modal")
        this.caption = ''
        this.tags = []
        this.fetchedFeed.push(data)
      })
      .catch(err=>{
        console.log(err.reponse)
      })
    },
    uploadFile(){
      this.isLoading = true
      let formData = new FormData()
      formData.append('file', this.file)
      axios({
        url: `${url}/foods/upload`,
        method: "post",
        headers:{
          token: localStorage.token
        },
        data: formData
      })
      .then(({data})=>{
        console.log(data)
        this.tags = data.tags
        this.isLoading = false
        this.isAccepted = true
        this.image = data.image
      })
      .catch(err=>{
        this.isLoading = false
        this.$swal("Umm.. that was a food?", `${err.response.data.message}`, "error")
      })
    },
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
        localStorage.setItem('id', data.id)
        this.fetchFeed()
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
      this.$swal("Byebye", "Hope to see you soon...", "info")
      localStorage.clear()
      this.isLogin = false
      this.fetchedFeed = []
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
      this.user = {id : localStorage.id}
      this.isLogin = true
      this.fetchFeed()
    }else{
      this.isLogin = false
    }
  },
})
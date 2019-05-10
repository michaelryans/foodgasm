Vue.component("card",{
  props:["image"],
  template:`
        <b-card
          img-alt="Image"
          :img-src="image.image"
          img-top
          :key="image._id"
        >
          <b-card-text>
            <h3>{{image.caption}}</h3>
          </b-card-text>
          <div class="d-flex justify-content-end">
            <small>By {{image.user_id.name}}</small>
          </div>
          <b-row class="d-flex justify-content-end m-3">
            <b-row class="d-flex align-items-center">
              <a :href="gettwitter()"target="_blank" class="px-2"> <i class="fab fa-twitter-square fa-2x"></i> </a>
              <a :href="getFacebook()" target="_blank" class="px-2"><i class="fab fa-facebook-f fa-2x"></i></a>
              <a href="#" @click.prevent="like(image._id)" v-if="!liked" style="color:black"><i class="fas fa-heart"></i></a>
              <a href="#" @click.prevent="unlike(image._id)" v-if="liked" style="color:red"><i class="fas fa-heart"></i></a>
              <div class="m-1">{{image.likes.length}}</div>
            </b-row>
          </b-row>
          <b-row>
            <b-badge pill variant="info" href="#" v-for="tag in image.tags" class="mx-1 px-3 mb-2">{{tag.text}}</b-badge>
          </b-row>
        </b-card>
 `,
   data(){
     return{

     }
   },
   methods:{
     like(id){
       console.log(id)
       this.$emit("like-image",id)
     },
     unlike(id){
       console.log(id)
       this.$emit('unlike-image', id)
     },
     gettwitter(){
      return `https://Twitter.com/intent/tweet?text=${this.image.image}`
    },
    getFacebook(){
      return `https://www.facebook.com/sharer/sharer.php?u=${this.image.image}`
    }
   },
   computed :{
     liked(){
      return this.image.likes.includes(localStorage.id)
     }
   }
})
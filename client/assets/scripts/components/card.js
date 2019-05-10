Vue.component("card",{
  props:["dummy"],
  template:`
        <b-card
          title="Card title that wraps to a new line"
          img-alt="Image"
          :img-src="dummy.image"
          img-top
        >
          <b-card-text>
            {{dummy.caption}}
          </b-card-text>
          <b-row class="d-flex justify-content-end m-3">
            <b-row class="d-flex align-items-center">
              <a href="#" @click.prevent="" style="color:black"><i class="fas fa-heart"></i></a>
              <div class="m-1">100</div>
            </b-row>
          </b-row>
          <b-row>
            <b-badge pill style="background-color: #E3B505" href="#" v-for="tag in dummy.tags" class="mx-1 px-3 mb-2">{{tag}}</b-badge>
          </b-row>
        </b-card>
 `,
   data(){
     return{

     }
   }
})
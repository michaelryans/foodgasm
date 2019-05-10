Vue.component("form-user", {
  template: `
              <div>
                <b-row class="mt-5 d-flex justify-content-center">
                  <h1>Hello</h1>
                </b-row>
                <b-row class="mt-1 d-flex justify-content-center">
                  <small class="text-muted">FoodGasm</small>

                </b-row>
                <b-form class="mt-2">
                  <b-form-group
                    id="input-group-1"
                    label="Email"
                    label-for="input-1"
                    description="We'll never share your email with anyone else."
                  >
                    <b-form-input
                      id="input-1"
                      type="email"
                      required
                      v-model="userLogin.email"
                      placeholder="Enter email"
                    ></b-form-input>
                  </b-form-group>
            
                  <b-form-group id="input-group-2" label="Password" label-for="input-2" class="my-2">
                    <b-form-input
                      type="password"
                      placeholder="Enter password"
                      id="input-2"
                      required
                      v-model="userLogin.password"
                    ></b-form-input>
                  </b-form-group>
                  <b-row class="d-flex justify-content-around mt-5">
                    <b-button type="submit" style="background-color: #084C61; font-color: white" @click.prevent="login">Login</b-button>
                    <small class="text-muted mt-2">or</small>
                    <b-button type="reset" style="background-color: #4F6D7A; font-color: white">Register</b-button>
                </b-row>
                </b-form>
              </div>
  `,
  data() {
    return {
      userLogin:{
        email: "",
        password: ""
      }
    };
  },
  methods:{
    login(){
      this.$emit("submit-login",{
        email: this.userLogin.email,
        password: this.userLogin.password
      })
    }
  }
});

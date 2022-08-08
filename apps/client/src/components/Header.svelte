<script lang="ts">
  let name = "world";
  import { MyCounterButton } from "ui";
</script>

<nav class="row">
  <section class="login">
    <div class="container">
      <header class="col s6 right-align">
        <h4 class="">Please Login</h4>
      </header>

      <!-- hide when logged in -->
      <form class="row connect col s6">
        <div class="input-field col s8">
          <i class="material-icons prefix">account_circle</i>
          <input
            type="text"
            name="username"
            class="validate blue-grey darken-4 white-text text-accent-3"
            maxlength="30"
          />
          <label for="username" class="">Username</label>
        </div>

        <a href="#" class="col s4">
          <button type="submit" class="btn waves-effect">Connect</button>
        </a>
      </form>
    </div>

    <!-- hide when not logged in -->
    <form class="disconnect center-align">
      <a href="#">
        <button type="button" class="btn waves-effect">Disconnect</button>
      </a>
    </form>
  </section>
</nav>

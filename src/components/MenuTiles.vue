<template>
  <div class="tile-back">
    <!--<div class="topbar">
      <h2>Menu</h2>
    </div>
     <div id="Tiles">
       <router-link to="/Grades">
      <div class="tile-border">
        <div class="tile-content">
          <img src="@/assets/sort-by-numeric-order.png" width="128px" height="128px"/>
        </div>
      </div></router-link>
      <router-link to="/Mail">
      <div class="tile-border">
        <div class="tile-content">
          <img src="@/assets/check.png" width="128px" height="128px"/>
        
      </div>
      </div></router-link><router-link to="/Tasks">
      <div class="tile-border">
        <div class="tile-content">
          <img src="@/assets/list.png" width="128px" height="128px"/>
        </div>
      </div></router-link><router-link to="/Posts">
      <div class="tile-border">
        <div class="tile-content">
          <img src="@/assets/multiple-users-silhouette.png" width="128px" height="128px"/>
        </div>
      </div></router-link>
      <div class="tile-border">
        <div class="tile-content">
          <img src="@/assets/envelope.png" width="128px" height="128px"/>
        </div>
      </div>
      <div class="tile-border">
        <div class="tile-content">
          <img src="@/assets/notebook-of-contacts.png" width="128px" height="128px"/>
        </div>
      </div>
    </div> -->
    <div class="side">
      <h2>Najnowsze Wiadomości</h2>
      <b-card-group columns>
    <b-card bg-variant="info" text-variant="white" header="Zadania" class="text-center">
    <b-card-text> 
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim, eaque libero porro qui cum neque ab assumenda velit voluptatem distinctio modi optio, animi magnam saepe rem, accusamus dolorum? Illo, vero?
    </b-card-text>
    </b-card>
    <b-card bg-variant="success" text-variant="white" header="Oceny" class="text-center">
    <b-card-text> 
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim, eaque libero porro qui cum neque ab assumenda velit voluptatem distinctio modi optio, animi magnam saepe rem, accusamus dolorum? Illo, vero?
    </b-card-text>
    </b-card>
    <b-card bg-variant="secondary" text-variant="white" header="Czaty" class="text-center">
    <b-card-text> 
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim, eaque libero porro qui cum neque ab assumenda velit voluptatem distinctio modi optio, animi magnam saepe rem, accusamus dolorum? Illo, vero?
    </b-card-text>
    </b-card>
    <b-card bg-variant="danger" text-variant="white" header="Maile" class="text-center">
    <b-card-text> 
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim, eaque libero porro qui cum neque ab assumenda velit voluptatem distinctio modi optio, animi magnam saepe rem, accusamus dolorum? Illo, vero?
    </b-card-text>
    </b-card>
      </b-card-group>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
#Tiles {
  align-content: center;
  overflow:auto;
}
.tile-border {
  display: inline-block;
  padding: 100px;
  border: black;
  background-color: gray;
  margin: 10px;
}
.topbar {
  width: 100%;
  background-color: cornflowerblue;
  padding: 25px;
}
.topbar h2 {
  color: whitesmoke;
  text-align: center;
}
.side {
  width:100%;
}
</style>


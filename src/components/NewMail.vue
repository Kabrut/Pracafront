<template>
<div>
  <b-dropdown id="dropdown-form" text="Dropdown with form" dropup ref="dropdown" class="m-2">
    <b-dropdown-form>
      <b-form-group label="Odbiorca">
        <b-form-input placeholder="Odbiorca"/>
      </b-form-group>
      <b-form-group label="Wiadomość">
        <b-form-textarea placeholder="Treść"/>
      </b-form-group>
      </b-dropdown-form>
  </b-dropdown>
</div>
   
</template>
<script>
export default {
   methods: {
      onClick() {
        this.$refs.dropdown.hide(true)
      }
    }
}
</script>
<template>
<div id="grade">
<b-card>
   <b-table-simple striped hover responsive>
        <b-thead head-variant="dark">
           <b-tr>
               <b-th colspan="4">Przedmiot</b-th>
               <b-th colspan="2">Ocena</b-th>
           </b-tr>
        </b-thead>
         <b-tbody>
      <b-tr>
     
        <b-th class="text-right">Antwerp</b-th>
        <b-td>{{grades}}</b-td>
        <b-td>22</b-td>
        <b-td>43</b-td>
        <b-td variant="success">72</b-td>
        <b-td>23</b-td>
      </b-tr>
      <b-tr>
        
        <b-th class="text-right">Antwerp</b-th>
        <b-td>56</b-td>
        <b-td>22</b-td>
        <b-td>43</b-td>
        <b-td variant="success">72</b-td>
        <b-td>23</b-td>
      </b-tr>
      </b-tbody>
   </b-table-simple>
   
</b-card>
</div> 

</template>
<script>
export default {
    props: {
       grades:[5, 4, 6, 8, 2, 4]
    }
}
</script>
<style scoped>
#grade{
    float: right;
    width: 100%;
}
</style>
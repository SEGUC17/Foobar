<template>
  <div>

<ul>
 <li v-for =" Sp in pendingSPs"> {{Sp._id}} <button @click ="Approve(Sp._id,Sp.name)"> Approve 
 </button> 
<button @click ="Decline(Sp._id)">
  Decline
</button>
 </li>

</ul>


  </div>
</template>
<script>
export default {
  name: 'PendingSp',
  data () {
    return {
      pendingSPs:[]
    }
  },
created(){
  this.getAllPending()
},
methods:{
    getAllPending: function () {
      this.$http.get('http://localhost:3000/api/admins/pendingSPRequests').then(response => {

        this.pendingSPs=response.data.data.pendingSP;
        console.log(pendingSP)
        

      })
    }
    ,
    Approve:function(id,name){
      console.log(id);
      console.log(name);
    },
    Decline:function(id){
      console.log(id);
    }
  }

}
</script>

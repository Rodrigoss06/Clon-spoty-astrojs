<script lang="ts">
    const currentTime= new Date
    const currentHour = currentTime.getHours()
    let saludo=""
    if (currentHour<12){
        saludo="Buenos Dias"
    } else if(currentHour<18){
        saludo="Buenas Tardes"
    } else{
        saludo="Buenos Dias"
    }
</script>

<h1 class="text-3xl font-bold">{saludo}</h1>
<script>
    export let slideimages;
    import { getImageUrl, getLink } from "../utils";
    let currentSlide=0;
    setInterval(()=>{
        if(currentSlide<slideimages.length-1){
            currentSlide+=1;
        } else{
            currentSlide=0;
        }
    },8000);
</script>

<style>
    .bcslides{
        height:400px;
        width:100%;
        position:relative;
    }
    .slide{
        height:400px;
        width:100%;
        position:absolute;
        top:0;
        left:0;
         -webkit-opacity: 0;
    -moz-opacity: 0;
    opacity: 0;
    -webkit-transition: all 2s ease;
    -moz-transition: all 2s ease;
    -ms-transition: all 2s ease;
    -o-transition: all 2s ease;
    transition: all 2s ease;
    }
    .slide.active{
        -webkit-opacity: 1;
    -moz-opacity: 1;
    opacity: 1;
    -webkit-transition: all 2s ease;
    -moz-transition: all 2s ease;
    -ms-transition: all 2s ease;
    -o-transition: all 2s ease;
    transition: all 2s ease;
    }
</style>

<div class="bcslides">
    {#each slideimages as item, idx}
              <div class=" slide {currentSlide == idx?'active':0}" style="background:url({getImageUrl(item.bild, 'c_fit,w_2000,h_400')})
                      left center no-repeat;background-size:cover;" />
            {/each}
</div>
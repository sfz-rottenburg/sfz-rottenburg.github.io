<script>
  import request from "superagent";
  import { link } from "svelte-spa-router";
  import { get } from "lodash";
  import { getImageUrl,getLink } from "../utils";
  export let data;
  export let slug;
</script>
<div id="page-{slug}" class="bc_subpage">
  <div
    id="bc_sub_headerimg"
    style={get(data, 'pagedata.acf.hauptbild') ? `background:url(${getImageUrl(get(data, 'pagedata.acf.hauptbild'), 'c_scale,w_2000,h_500')})center center no-repeat; background-size:cover` : ''}>
    <div class="container">
      <div class="row">
        <div class="col s12">
          <h1 class={get(data, 'pagedata.acf.farbe_seitentitel')}>
            {@html get(data, 'pagedata.title', '')}
          </h1>
        </div>
      </div>
    </div>
  </div>
  <div class="clearfix"></div>
  <div class="container">
    <div class="row">
      <div class="col s12 bc_standardcontent">
      {#if get(data, 'pagedata.acf.untertitel')}
      <div class="row">
            <div class="col s12">
              <h2 class="left-align">{@html get(data, 'pagedata.acf.untertitel')}</h2>
            </div>
          </div>
      {/if}
        <div class="row">
         {#if get(data, 'pagedata.acf.elemente')}
         {#each get(data, 'pagedata.acf.elemente',[]) as item}
         <div class="bc_elem">
                <div class="col s12 m4 l2 ">
                <a href={getLink(item.link)} use:link>
                    <img
                          alt={ item.titel}
                          src={getImageUrl(get(item, 'bild'), 'c_fit,w_400,h_400')} />
                    <h3>{@html item.titel}</h3>
                  </a>
                </div>
                <div class="col .hide-on-med-and-down l1">&nbsp;</div>
              </div>
         {/each}
         {/if}
        </div>
      </div>
    </div>
  </div>
</div>
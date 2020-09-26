<script>
  import request from "superagent";
  import { link } from "svelte-spa-router";
  import { get } from "lodash";
  import { getImageUrl, getLink } from "../utils";
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
  <div class="clearfix" />
  <div class="container">
    <div class="row">
      <div class="col s12 bc_standardcontent">
        {#if get(data, 'pagedata.acf.untertitel')}
          <div class="row">
            <div class="col s12">
              <h2 class="left-align">
                {@html get(data, 'pagedata.acf.untertitel')}
              </h2>
            </div>
          </div>
        {/if}
         {#if get(data, 'pagedata.content.rendered', '')}
        <div class="row">
          <div class="col s12 m6 l4">
            {@html get(data, 'pagedata.content.rendered', '')}
          </div>
        </div>
        {/if}
      </div>
    </div>
  </div>
  <div id="bc_google_maps">
   {@html get(data, 'pagedata.acf.google_maps', '')}
  </div>
</div>
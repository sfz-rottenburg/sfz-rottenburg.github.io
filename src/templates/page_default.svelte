<script>
  import request from "superagent";
  import { link } from "svelte-spa-router";
  import { get } from "lodash";
  import { getImageUrl, getLink,prepareHtmlContent } from "../utils";
  export let data;
  export let slug;
</script>

<div id="page-{slug}" class="bc_subpage default">
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
      <div class="col s12 m8 l9 bc_standardcontent bc_padright">
        {#if get(data, 'pagedata.acf.untertitel')}
          <div class="row">
            <div class="col s12">
              <h2 class="left-align">
                {@html get(data, 'pagedata.acf.untertitel')}
              </h2>
            </div>
          </div>
        {/if}
        <div class="row">
          <div class="col s12">
            {@html prepareHtmlContent(get(data, 'pagedata.content.rendered', ''))}
          </div>
        </div>
        <div class="row imggal">
          {#if get(data, 'pagedata.acf.bildergalerie')}
            {#each get(data, 'pagedata.acf.bildergalerie', []) as item}
              <div class="col s6 m4 l3 ">
                <img
                  class="materialboxed2"
                  alt={item.title}
                  src={getImageUrl(item.bild, 'c_scale,w_400,h_300')} />
              </div>
            {/each}
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>

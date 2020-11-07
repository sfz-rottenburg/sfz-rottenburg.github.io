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
        <div class="row">
          {#if get(data, 'pagedata.acf.elemente')}
            {#each get(data, 'pagedata.acf.elemente', []) as item}
              <div class="col s12 m6 bc_elem">
                <div class="row">
                  <div class="col s12">
                    <div class={item.farbe}>
                      <h3>
                        {@html item.titel}
                      </h3>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col s12 bc_standardcontent">
                    {@html item.text}
                  </div>
                </div>
              </div>
            {/each}
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>

<script>
  import request from "superagent";
  import { link } from "svelte-spa-router";
  import { get } from "lodash";
  import { getImageUrl, getLink } from "../utils";
  export let data;
  export let slug;
  const getNews = async () =>
    new Promise((rs, rj) => {
      const base64URL = btoa(
        `http://cms.sfz-rottenburg.de/wp-json/wp/v2/posts?per_page=6`
      );
      request
        .get(` https://cache.b-coding.io/${base64URL}`)
        .then((response) => {
          rs(response.body);
        })
        .catch((err) => rj(err));
    });
  let promiseNews = getNews();
</script>

<div id="page-{slug}" class="bc_subpage">
  <div
    id="bc_sub_headerimg"
    style={get(data, 'pagedata.acf.hauptbild',get(data, 'headerfooterdata.acf.ersatzbild')) ? `background:url(${getImageUrl(get(data, 'pagedata.acf.hauptbild'), 'c_scale,w_2000,h_500')})center center no-repeat; background-size:cover` : ''}>
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
        <div class="row bc_aktuelles_item">
        {#if get(data, 'pagedata.acf.bild')}
        <div class="col s12">
              <div class="bc_img_bordered {get(data, 'pagedata.acf.farbe')}">
                <img
                  alt=""
                  src={getImageUrl(get(data, 'pagedata.acf.bild'), 'c_scale,w_950,h_300')} />
              </div>
            </div>
        {/if}

        </div>
        <div class="row">
          <div class="col s12">
             {@html get(data, 'pagedata.content.rendered', '')}
          </div>
        </div>
        <div class="row">
          {#if get(data, 'pagedata.acf.bildergalerie')}
            {#each get(data, 'pagedata.acf.bildergalerie', []) as item}
              <div class="col s6 m4 l3 bc_quadratimg">
                <img
                  class="materialboxed"
                  alt={item.title}
                  src={getImageUrl(item.bild, 'c_scale,w_400,h_300')} />
              </div>
            {/each}
          {/if}
        </div>
      </div>
      <div class="col s12 m4 l3">
        <div id="bc_sidebar" style="margin-top:20px;">
          <div
            class="bc_sidebartitle_wrapper {get(data, 'pagedata.acf.farbe')}">
            <div
              class="bc_sidebartitle_wrapper_inner"
              style={get(data, 'pagedata.acf.icon_titel_sidebar') ? `background:url(${getImageUrl(get(data, 'pagedata.acf.icon_titel_sidebar'), 'c_scale,w_70,h_70')})right center no-repeat` : ''}>
              <h2
                class="bc_sidebartitle left-align {get(data, 'pagedata.acf.textfarbe_titel_sidebar')}">
                {@html get(data, 'headerfooterdata.acf.titel_sidebar_weitere_artikel', '')}
              </h2>
            </div>
          </div>
          <ul id="bc_sidebarmenu">
            {#await promiseNews then submenudata}
                  {#each submenudata as item}
                <li class="bc_level_0">
                  <a href={getLink(get(item,'link',''))} use:link>
                    <div class="truncate">{@html get(item, 'title.rendered', get(item, 'title', ''))}</div>
                  </a>
                </li>
              {/each}
            {/await}
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
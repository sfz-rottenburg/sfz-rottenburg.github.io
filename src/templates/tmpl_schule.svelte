<script>
  import request from "superagent";
  import { link } from "svelte-spa-router";
  import { get } from "lodash";
  import { getImageUrl,getLink } from "../utils";
  export let data;
  export let slug;
  const getMenu = async (menu) =>
    new Promise((rs, rj) => {
      const base64URL = btoa(
        `https://cms.sfz-rottenburg.de/wp-json/wp-api-menus/v2/menu-locations/${menu}`
      );
      request
        .get(` https://cache.sfz-rottenburg.de/${base64URL}`)
        .then((response) => {
          rs(response.body);
        })
        .catch((err) => rj(err));
    });
  let promiseSubmenu = getMenu("menu_schule");
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
      <div class="col s12 m8 l9 bc_standardcontent bc_padright">
        <div class="row">
          <div class="col s12">
            {@html get(data, 'pagedata.content.rendered', get(data, 'pagedata.content', ''))}
          </div>
        </div>
        <div class="row">
          <div class="col s6">
            {@html get(data, 'pagedata.acf.content_unten_spalte_links', '')}
          </div>
          <div class="col s6">
            {@html get(data, 'pagedata.acf.content_unten_spalte_rechts', '')}
          </div>
        </div>
      </div>
      <div class="col s12 m4 l3">
        <div id="bc_sidebar">
          <div
            class="bc_sidebartitle_wrapper {get(data, 'pagedata.acf.hintergrundfarbe_titel_sidebar')}">
            <div
              class="bc_sidebartitle_wrapper_inner"
              style={get(data, 'pagedata.acf.icon_titel_sidebar') ? `background:url(${getImageUrl(get(data, 'pagedata.acf.icon_titel_sidebar'), 'c_scale,w_70,h_70')})right center no-repeat` : ''}>
              <h2
                class="bc_sidebartitle left-align {get(data, 'pagedata.acf.textfarbe_titel_sidebar')}">
                {@html get(data, 'pagedata.post_parent.post_title.rendered', get(data, 'pagedata.post_parent.post_title', ''))}
              </h2>
            </div>
          </div>
          <ul id="bc_sidebarmenu">
            {#await promiseSubmenu then submenudata}
              {#each submenudata as item}
                <li class="bc_level_0">
                  <a href={getLink(item.url)} use:link>
                    {@html get(item, 'title', '')}
                  </a>

                </li>
              {/each}
            {/await}
          </ul>
        </div>
        {#if get(data, 'pagedata.acf.downloadlink_flyer')}
          <a
            href={get(data, 'pagedata.acf.downloadlink_flyer')}
            target="_blank">
            <div
              class="bc_button {get(data, 'pagedata.acf.hintergrundfarbe_titel_sidebar', '')}"
              id="bc_downloadbutton">
              {get(data, 'pagedata.acf.titel_button_download_flyer', '')}
            </div>
          </a>
        {/if}
      </div>
    </div>
  </div>
  {#if get(data, 'pagedata.acf.infobalken_unten')}
    <div
      id="bc_sub_infobalken"
      class={get(data, 'pagedata.acf.infobalken_unten_hintergrundfarbe', '')}>
      <div class="container">
        <div class="row">
          <div class="col s12">
            {@html get(data, 'pagedata.acf.infobalken_unten')}
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

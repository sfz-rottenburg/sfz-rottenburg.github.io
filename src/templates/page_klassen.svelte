<script>
  import request from "superagent";
  import { link } from "svelte-spa-router";
  import { get } from "lodash";
  import { getImageUrl, getLink } from "../utils";
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
  let promiseSubmenu = getMenu("menu_ueber_uns");
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
        {#if get(data, 'pagedata.acf.klassen')}
          {#each get(data, 'pagedata.acf.klassen',[]) as item}
              <div class="col s12 m6 l4 bc_klassen_item">
                <div class="{get(item,'hintergrundfarbe','')}">
                  <h3>{@html get(item,'klassenbezeichnung','')}</h3>
                </div>
                <h4>{get(item,'lehrer_name','')}</h4>
                {@html get(item,'lehrer_position','')}
              </div>
            
          {/each}
        {/if}
        </div>
      </div>
      <div class="col s12 m4 l3" id="bc_sidebar">
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
    </div>
  </div>
</div>
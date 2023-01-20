<script>
  import request from "superagent";
  import { link } from "svelte-spa-router";
  import { get } from "lodash";
  import { getImageUrl, getLink } from "../utils";
import { DataTransferItem } from "lodash/_freeGlobal";
  export let data;
  export let slug;
  const getMenu = async (menu) =>
    new Promise((rs, rj) => {
      const base64URL = btoa(
        `http://cms.sfz-rottenburg.de/wp-json/wp-api-menus/v2/menu-locations/${menu}`
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
        {#if get(data, 'pagedata.content.rendered', '')}
          <div class="row">
            <div class="col s12">
              {@html get(data, 'pagedata.content.rendered', '')}
            </div>
          </div>
        {/if}
        {#if get(data, 'pagedata.acf.schulleitung')}
          {#each get(data, 'pagedata.acf.schulleitung',[]) as item}
            <div class="row">
              <div class="col s12 m8 bc_sl_elem">
                <h3 class="left-align">{get(item,'vorname_nachname','')}</h3>
                <div class="bc_about_pos">
                  {get(item,'position','')}
                </div>
                <div class="bc_about_aufg">
                {get(item,'aufgabenbereich','')}
                </div>
              </div>
              <div class="col s12 m4">
                {#if get(item,'emailadresse','')}
                  <a href="mailto:{get(item,'emailadresse','')}">
                    <div class="bc_button green-button small">
                      {get(item,'beschriftung_emailbutton','')}
                    </div>
                  </a>
                {/if}
              </div>
            </div>
          {/each}
        {/if}
        <div class="bc_horiz_ruler_rainbow"></div>
        <div class="row">
          <div class="col s12">
            <h2 class="left-align" style="margin-top:20px;">{ get(data, 'pagedata.acf.titel_kollegium','')}</h2>
          </div>
        </div>
        {#if get(data, 'pagedata.acf.kollegium')}
          {#each get(data, 'pagedata.acf.kollegium',[]) as item}
            <div class="row">
              <div class="col s12 m8 bc_sl_elem">
                <h3 class="left-align">{get(item,'vorname_nachname','')}</h3>
                <div class="bc_about_pos">
                  {get(item,'position','')}
                </div>
                <div class="bc_about_aufg">
                {get(item,'aufgabenbereich','')}
                </div>
                <div class="bc_about_aufg">
                  {get(item,'sprechstunde','')}
                </div>
              </div>
              <div class="col s12 m4">
                {#if get(item,'emailadresse','')}
                  <a href="mailto:{get(item,'emailadresse','')}">
                    <div class="bc_button green-button small">
                      {get(item,'beschriftung_emailbutton','')}
                    </div>
                  </a>
                {/if}
              </div>
            </div>
          {/each}
        {/if}
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
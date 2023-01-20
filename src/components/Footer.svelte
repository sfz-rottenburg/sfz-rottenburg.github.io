<script context="module">
  import request from "superagent";
  import { link } from "svelte-spa-router";
  import { get } from "lodash";
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
  let promiseMenu1 = getMenu("menu_footer");
</script>

<script>
  import { getLink, getImageUrl, nl2br } from "../utils";
  import { afterUpdate } from "svelte";
  export let data;
  afterUpdate(() => {
    window.$('.mb.inactive').click(function() {
      window.$( this ).addClass('active');
      window.$( this ).removeClass('inactive');
      window.$('.mb.active,.mb.active *').click(function() {
      window.$('.mb.active' ).removeClass('active').addClass('inactive');
    });
    });
    
  });
</script>

<footer id="bc_footer">
  <div class="container">
    <div class="row nomargin">
      <div class="col s12 m6 l3">
        <div class="row">
          <div class="col s12">
            <h3>{get(data, 'headerfooterdata.acf.footer_1_titel', ' ')}&nbsp;</h3>
            <div class="bc_minihdiv" />
          </div>
        </div>
        {#if get(data, 'headerfooterdata.acf.footer_1_adressdaten', false)}
          {#each get(data, 'headerfooterdata.acf.footer_1_adressdaten', []) as item}
            <div class="row">
              <div class="col s2 m2">
                {#if item.Symbol}
                  <img
                    alt=""
                    src={getImageUrl(item.Symbol, 'c_fit,w_16,h_16')} />
                {/if}
              </div>
              <div class="col s10 m10">
                {@html nl2br(item.text)}
              </div>
            </div>
          {/each}
        {/if}
      </div>
      <div class="col s12 m6 l3">
        <div class="row">
          <div class="col s12">
            <h3>{get(data, 'headerfooterdata.acf.footer_2_titel', ' ')}&nbsp;</h3>
            <div class="bc_minihdiv" />
          </div>
        </div>
        <div class="row">
          <div class="col s12">
            {@html get(data, 'headerfooterdata.acf.footer_2_text', ' ')}
          </div>
        </div>
      </div>
      <div class="col s12 m6 l3">
        <div class="row">
          <div class="col s12">
            <h3>{get(data, 'headerfooterdata.acf.footer_3_titel', ' ')}&nbsp;</h3>
            <div class="bc_minihdiv" />
          </div>
        </div>
        <div class="row">
          <div class="col s12">
            {@html get(data, 'headerfooterdata.acf.footer_3_text', ' ')}
          </div>
        </div>
      </div>
      <div class="col s12 m6 l3">
        <div class="row">
          <div class="col s12">
            <h3>{get(data, 'headerfooterdata.acf.footer_4_titel', ' ')}&nbsp;</h3>
            <div class="bc_minihdiv" />
          </div>
        </div>
        <div class="row">
          <div class="col s12">
            {@html get(data, 'headerfooterdata.acf.footer_4_text', ' ')}
            <div id="imgfooter">
            {#each get(data, 'headerfooterdata.acf.footer_4_bildergalerie', []) as item}
                  <div class="mb inactive">
                    <div class="bc_footer_smallimg" style="background:url({getImageUrl(get(item, 'bild', ''), 'c_fit,w_1200,h_1200')})center center no-repeat;background-size:cover"></div>
                    </div>
                    <!--<img
                  class="materialboxed"
                  src={getImageUrl(get(item, 'bild', ''), 'c_fit,w_1200,h_1200')} />-->
                  
                {/each}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>
<footer id="bc_subfooter">
  <div class="container">
    <div class="row nomargin">
      <div class="col s12 m6">
        <ul id="bc_footermenu">
          {#await promiseMenu1 then menudata1}
            {#each menudata1 as item}
              <li class="bc_level_0">
                <a href={getLink(item.url)} use:link>
                  {get(item, 'title', '')}
                </a>
              </li>
            {/each}
          {/await}

        </ul>
      </div>
      <div class="col s12 m6">
        <a
          href="http://elvirabeck-design.de"
          target="_blank"
          class="right bc_single_footerlink">
          elvira.beck | design
        </a>
      </div>
    </div>
  </div>
</footer>

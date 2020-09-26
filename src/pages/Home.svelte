<script context="module">
  import request from "superagent";
  import { link } from "svelte-spa-router";
  import { get } from "lodash";
  import { getImageUrl, getLink } from "../utils";
  import { DataTransferItem } from "lodash/_freeGlobal";
  const getNews = async () =>
    new Promise((rs, rj) => {
      const base64URL = btoa(
        `http://cms.sfz-rottenburg.de/wp-json/wp/v2/posts?filter[cat]=8&per_page=6`
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

<script>
  import Data from "../components/Data.svelte";
</script>

<Data let:data>
  <div id={data.location} class="bc_page_home">
    <!--
  S L I D E R
  -->
    <div id="bc_slider_wrapper_fullwidth " class="hide-on-small-only">
      <div class="slider">
        <ul class="slides">
          {#if get(data, 'pagedata.acf.slider', false)}
            {#each get(data, 'pagedata.acf.slider', []) as item}
              <li>
                <img
                  alt=""
                  src={getImageUrl(item.bild, 'c_scale,w_2000,h_400')} />
              </li>
            {/each}
          {/if}
        </ul>
      </div>
    </div>
    <!--
  B U T T O N L E I S T E
  -->
    <div id="bc_buttonleiste">
      <div class="container">
        <div class="bc_buttonleiste_wrapper">
          <div class="row">
            {#if get(data, 'pagedata.acf.buttonleiste', false)}
              {#each get(data, 'pagedata.acf.buttonleiste', []) as item}
                <a href={getLink(item.link)} use:link>
                  <div class="col s12 m4 {item.hintergrundfarbe} nopadding">
                    <div
                      style="background:url({getImageUrl(item.icon, 'c_fit,w_70,h_70')})
                      left center no-repeat;background-size:contain;">
                      <div class="bc_button_title center-align">
                        {item.titel}
                      </div>
                    </div>
                  </div>
                </a>
              {/each}
            {/if}
          </div>
        </div>
      </div>
    </div>
    <!--
  T E A S E R  1
  -->
    <div class="container" id="bc_home_teaser_1">
      <div class="row">
        <div class="col s12">
          <h2 class="left-align">
            {get(data, 'pagedata.acf.titel_teaser_1', '')}
          </h2>
          <h3 class="left-align">
            {@html get(data, 'pagedata.acf.untertitel_teaser_1', '')}
          </h3>
          <div class="bc_minihdiv sfz_gelb" />
        </div>
      </div>
      <div class="row">
        {#if get(data, 'pagedata.acf.teaser_1_elemente', '')}
          {#each get(data, 'pagedata.acf.teaser_1_elemente', []) as item}
            <div class="col s12 m6 l4 bc_home_teaser_1_elem">
              <div class="row">
                <div class="col s3 m2 nopaddingright">
                  <img
                    alt=""
                    src={getImageUrl(item.icon, 'c_scale,w_70,h_70')} />
                </div>
                <div class="col s9 m10 ">
                  <a href={getLink(item.link)} use:link>
                    <h4>{item.titel}</h4>
                  </a>
                  {item.text}
                  <div class="bc_link">
                    <a href={getLink(item.link)} use:link>
                      {item.link_beschriftung}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        {/if}
      </div>
    </div>
    <!--
  Z I T AT
  -->
    <div
      id="bc_zitat"
      style="background:url({get(data, 'pagedata.acf.motto_hintergrundbild') ? getImageUrl(get(data, 'pagedata.acf.motto_hintergrundbild'), 'c_fit,w_2000,h_500') : ''})
      center center no-repeat; background-size:cover;">
      <div class="container">
        <div class="row">
          <div class="col s12 m9">
            {@html get(data, 'pagedata.acf.motto_text', '')}
          </div>
          <div class="col s12 m3 valign-wrapper">
            {#if get(data, 'pagedata.acf.motto_button_link', '')}
              <a
                href={getLink(get(data, 'pagedata.acf.motto_button_link', ''))}
                use:link>
                <div class="bc_button blue-button valign">
                  {get(data, 'pagedata.acf.motto_button_beschriftung')}
                </div>
              </a>
            {/if}
          </div>
        </div>
      </div>
    </div>
    <!--
  A K T U E L L E S  u n d   V E R A N S T A L T U N G E N
  -->
    <div class="container" id="bc_home_teaser_1">
      <div class="row">
        <div class="col s12">
          <h2 class="left-align">
            {@html get(data, 'pagedata.acf.titel_aktuelles', '&nbsp')}
          </h2>
          <h3 class="left-align">
            {@html get(data, 'pagedata.acf.untertitel_aktuelles', '&nbsp')}
          </h3>
          <div class="bc_minihdiv sfz_gruen" />
        </div>
      </div>
      <div class="row">
        {#await promiseNews then news}
          {#each news as item}
            <div class="col s12 m6 l4">
              <div
                class="card-panel {get(item, 'acf.farbe', '')} bc_samesize news">
                <div
                  style={get(item, 'acf.icon') ? 'background:url(' + getImageUrl(get(item, 'acf.icon'), 'c_fit,w_64,h_64') + ') right bottom no-repeat' : ''}>
                  {#if get(item, 'acf.bild')}
                    <a href={getLink(get(item, 'link'))} use:link>
                      <div class="bc_fullcardimage">
                        <img
                          alt={item.title.rendered}
                          src={getImageUrl(get(item, 'acf.bild'), 'c_fit,w_500,h_260')} />
                      </div>
                    </a>
                  {/if}
                  <a href={getLink(get(item, 'link'))} use:link>
                    <h4>{item.title.rendered}</h4>
                  </a>
                </div>
              </div>
            </div>
          {/each}
        {/await}
      </div>
    </div>
  </div>
</Data>

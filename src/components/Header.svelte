<script context="module">
  import request from "superagent";
  import { link } from "svelte-spa-router";
  import { get } from "lodash";
  import { getImageUrl } from "../utils";
  const getMenu = async (menu) =>
    new Promise((rs, rj) => {
      const base64URL = btoa(
        `http://cms.sfz-rottenburg.de/wp-json/wp-api-menus/v2/menu-locations/${menu}`
      );
      request
        .get(` https://cache.b-coding.io/${base64URL}`)
        .then((response) => {
          rs(response.body);
        })
        .catch((err) => rj(err));
    });
  let promiseMenu1 = getMenu("menu_main_1");
  let promiseMenu2 = getMenu("menu_main_2");
</script>

<script>
  import { getPageTitel, getLink } from "../utils";
  export let data;
  let pageTitle = getPageTitel(data.headerfooterdata, data.pagedata);
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="keywords" content={get(data, 'pagedata.acf.seo_keywords', '')} />
  <meta
    name="description"
    content={get(data, 'pagedata.acf.seo_description', '')} />
  <meta property="og:title" content={pageTitle} />
  <meta property="og:type" content="website" />
  <meta
    property="og:url"
    content={get(data, 'headerfooterdata.acf.base_url', '') + get(data, 'location', '')} />
  <meta
    property="og:description"
    content={get(data, 'pagedata.acf.seo_description', '')} />
  <meta property="og:locale" content="de" />
  <meta
    property="og:site_name"
    content={get(data, 'pagedata.acf.seo_page_title', '')} />
  <meta charset="utf-8" />
  <link
    rel="canonical"
    href={get(data, 'headerfooterdata.acf.base_url', '') + get(data, 'location', '')} />
</svelte:head>
<ul class="side-nav" id="mobile-nav">
  {#await promiseMenu1 then menudata1}
    {#each menudata1 as item}
      <li class="bc_level_0">
        <a href={getLink(item.url)} use:link>{@html get(item, 'title', '')}</a>
        {#if item.children}
          <ul class="bc_mainmenu_sub">
            {#each item.children as child}
              <li>
                <a href={getLink(child.url)} class="truncate" use:link>
                  {@html get(child, 'title', '')}
                </a>
              </li>
            {/each}
          </ul>
        {/if}
      </li>
    {/each}
  {/await}
  {#await promiseMenu2 then menudata2}
    {#each menudata2 as item}
      <li class="bc_level_0">
        <a href={getLink(item.url)} use:link>{@html get(item, 'title', '')}</a>
        {#if item.children}
          <ul class="bc_mainmenu_sub">
            {#each item.children as child}
              <li>
                <a href={getLink(child.url)} class="truncate" use:link>
                  {@html get(child, 'title', '')}
                </a>
              </li>
            {/each}
          </ul>
        {/if}
      </li>
    {/each}
  {/await}
</ul>

<div id="bc_header">
  <div class="hide-on-med-and-up" style="width:100%;">
    <div class="row ">
      <div class="col s12" style="background:white;">
        <a href="#s" data-activates="mobile-nav" class="button-collapse">
          <i class="mdi-navigation-menu" style="font-size:40px;" />
        </a>
      </div>
      <a href="/" use:link>
        <div id="bc_head_menubar_logo_mobile">
          {#if get(data, 'headerfooterdata.acf.logo', '')}
            <img
              alt=""
              src={getImageUrl(get(data, 'headerfooterdata.acf.logo', ''), 'c_fit,w_200,h_80')} />
          {/if}
        </div>
      </a>

    </div>
  </div>
  <div class="container hide-on-small-only" id="bc_header_container">
    <div class="row hide-on-small-only">
      <div class="col s12" id="bc_header_infoline">
        <div class="row">
          <div class="col m5 hide-on-small-only">&nbsp;</div>
          <div class="col m2">
            &nbsp;
            <a href="/" use:link>
              <div id="bc_head_menubar_logo">
                {#if get(data, 'headerfooterdata.acf.logo', '')}
                  <img
                    alt=""
                    src={getImageUrl(get(data, 'headerfooterdata.acf.logo', ''), 'c_scale,w_319,h_222')} />
                {/if}
              </div>
            </a>
          </div>
          <div class="col m5">
            <div id="bc_head_kontaktinfos right">
              {@html get(data, 'headerfooterdata.acf.kontaktinfos_header', '')}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bc_horiz_ruler_rainbow" />
    <div class="clearfix" />
    <div class="row">
      <div class="col s6">
        <ul id="bc_mainmenu" class="bc_desktop left">
          {#await promiseMenu1 then menudata1}
            {#each menudata1 as item}
              <li class="bc_level_0">
                <a href={getLink(item.url)} use:link>
                  {@html get(item, 'title', '')}
                </a>
                {#if item.children}
                  <ul class="bc_mainmenu_sub">
                    {#each item.children as child}
                      <li>
                        <a href={getLink(child.url)} use:link>
                          {@html get(child, 'title', '')}
                        </a>
                      </li>
                    {/each}
                  </ul>
                {/if}
              </li>
            {/each}
          {/await}
        </ul>
      </div>
      <div class="col s6">
        <ul id="bc_mainmenu" class="bc_desktop right">
          {#await promiseMenu2 then menudata2}
            {#each menudata2 as item}
              <li class="bc_level_0">
                <a href={getLink(item.url)} use:link>
                  {@html get(item, 'title', '')}
                </a>
                {#if item.children}
                  <ul class="bc_mainmenu_sub">
                    {#each item.children as child}
                      <li>
                        <a href={getLink(child.url)} use:link>
                          {@html get(child, 'title', '')}
                        </a>
                      </li>
                    {/each}
                  </ul>
                {/if}
              </li>
            {/each}
          {/await}
        </ul>
      </div>
    </div>
  </div>
</div>

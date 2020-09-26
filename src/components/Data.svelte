<script>
  import { location } from "svelte-spa-router";
  import { setContext } from "svelte";
  import Footer from "./Footer.svelte";
  import Header from "./Header.svelte";
  import request from "superagent";

  let data = { location: $location };
   export let slug='';
  const getPage = async (targetAttr, slug='') =>
    new Promise((rs, rj) => {
      const base64URL = btoa(
        `http://cms.sfz-rottenburg.de/wp-json/wp/v2/pages?slug=${slug}`
      );
      request
        .get(`https://cache.b-coding.io/${base64URL}`)
        .then((response) => {
          data[targetAttr] = response.body[0] || {};
          rs("ok");
        })
        .catch((err) => rj(err));
    });
</script>
{#await Promise.all([
    getPage("pagedata",slug|| $location.replace(/^\/+/, "") || "home"),
    getPage("headerfooterdata", "_config"),
  ])}
  <Header {data} />
  <slot {data} />
  <Footer {data} />
{:then number}
  <Header {data} />
  <slot {data} />
  <Footer {data} />
{/await}

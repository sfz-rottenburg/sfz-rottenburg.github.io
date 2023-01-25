<script>
  import { location } from "svelte-spa-router";
  import { setContext } from "svelte";
  import Footer from "./Footer.svelte";
  import Header from "./Header.svelte";
  import request from "superagent";

  let data = { location: $location };
   export let slug='';
   export let posttype='pages';
  const getPage = async (targetAttr, slug='',posttype='pages') =>
    new Promise((rs, rj) => {
      const base64URL = btoa(
        `https://cms.sfz-rottenburg.de/wp-json/wp/v2/${posttype}?slug=${slug}`
      );
      request
        .get(`https://cache.sfz-rottenburg.de/${base64URL}`)
        .then((response) => {
          data[targetAttr] = response.body[0] || {};
          rs("ok");
        })
        .catch((err) => rj(err));
    });
</script>
{#await Promise.all([
    getPage("pagedata",slug|| $location.replace(/^\/+/, "") || "home",posttype),
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

<script>
  import { get } from "lodash";
  import Data from "../components/Data.svelte";
  import PageNews from "../templates/page_news.svelte";
  export let params = {};
</script>

<Data let:data slug={params.slug} posttype="posts">
  <PageNews {data} slug={params.slug} />
</Data>

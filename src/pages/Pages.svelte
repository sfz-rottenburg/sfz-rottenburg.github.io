<script>
  import {get} from 'lodash';
  import Data from "../components/Data.svelte";
  import TmplSchule from "../templates/tmpl_schule.svelte";
  import PageSchule from "../templates/page_schule.svelte";
  import PageUeberUns from '../templates/page_ueber_uns.svelte';
  import PageLeitbild from '../templates/page_leitbild.svelte';
  export let params={};
</script>
<Data let:data slug={params.slug}>
{#if get(data,'pagedata.acf.template','')==='tmpl_schule'}<TmplSchule data={data} slug={params.slug}/>{/if}
{#if get(data,'pagedata.acf.template','')==='page_schule'}<PageSchule data={data} slug={params.slug}/>{/if}
{#if get(data,'pagedata.acf.template','')==='page_ueber_uns'}<PageUeberUns data={data} slug={params.slug}/>{/if}
{#if get(data,'pagedata.acf.template','')==='page_leitbild'}<PageLeitbild data={data} slug={params.slug}/>{/if}
</Data>

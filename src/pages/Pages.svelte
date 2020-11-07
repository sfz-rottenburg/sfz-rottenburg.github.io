<script>
  import { get } from "lodash";
  import Data from "../components/Data.svelte";
  import TmplSchule from "../templates/tmpl_schule.svelte";
  import PageSchule from "../templates/page_schule.svelte";
  import PageUeberUns from "../templates/page_ueber_uns.svelte";
  import PageLeitbild from "../templates/page_leitbild.svelte";
  import PageVerwaltung from "../templates/page_verwaltung.svelte";
  import PageSozialeKompetenzen from "../templates/page_soziale_kompetenzen.svelte";
  import PageSchulleitung from "../templates/page_schulleitung.svelte";
  import PageKlassen from  "../templates/page_klassen.svelte";
  import PageDefault from "../templates/page_default.svelte";
  import PageJas from "../templates/page_jas.svelte";
  import PageKontakt from "../templates/page_kontakt.svelte";
  export let params = {};
</script>

<Data let:data slug={params.slug}>
  {#if get(data, 'pagedata.acf.template', '') === 'tmpl_schule'}
    <TmplSchule {data} slug={params.slug} />
  {/if}
  {#if get(data, 'pagedata.acf.template', '') === 'page_schule'}
    <PageSchule {data} slug={params.slug} />
  {/if}
  {#if get(data, 'pagedata.acf.template', '') === 'page_ueber_uns'}
    <PageUeberUns {data} slug={params.slug} />
  {/if}
  {#if get(data, 'pagedata.acf.template', '') === 'page_leitbild'}
    <PageLeitbild {data} slug={params.slug} />
  {/if}
  {#if get(data, 'pagedata.acf.template', '') === 'page_verwaltung'}
    <PageVerwaltung {data} slug={params.slug} />
  {/if}
  {#if get(data, 'pagedata.acf.template', '') === 'page_soziale_kompetenzen'}
    <PageSozialeKompetenzen {data} slug={params.slug} />
  {/if}
  {#if get(data, 'pagedata.acf.template', '') === 'page_schulleitung'}
    <PageSchulleitung {data} slug={params.slug} />
  {/if}
   {#if get(data, 'pagedata.acf.template', '') === 'page_klassen'}
    <PageKlassen {data} slug={params.slug} />
  {/if}
  {#if get(data, 'pagedata.acf.template', '') === 'page_default'}
    <PageDefault {data} slug={params.slug} />
  {/if}
  {#if get(data, 'pagedata.acf.template', '') === 'page_jas'}
    <PageJas {data} slug={params.slug} />
  {/if}
  {#if get(data, 'pagedata.acf.template', '') === 'page_kontakt'}
    <PageKontakt {data} slug={params.slug} />
  {/if}

</Data>

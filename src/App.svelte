<script>
  import Router from "svelte-spa-router";
  import Header from "./components/Header.svelte";
  import Home from "./pages/Home.svelte";
  import Pages from "./pages/Pages.svelte";
  import News from "./pages/News.svelte";
  const routes = {
    // Exact path
    "/": Home,
    "/:year/:month/:day/:slug": News,
    "/:level1/:slug": Pages,
    "/:slug": Pages,
    "*": Pages,
  };
</script>

<Router {routes} />

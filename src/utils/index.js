import { get } from "lodash";
export const getPageTitel = (headerfooterdata = {}, pagedata = {}) => {
  pagedata.title = get(pagedata, "title.rendered", get(pagedata, "title", ""));
  headerfooterdata.acf = headerfooterdata.acf || {};
  headerfooterdata.acf.seo_page_titel = get(
    headerfooterdata,
    "acf.seo_page_titel.rendered",
    get(headerfooterdata, "acf.seo_page_titel", "")
  );
  return (
    headerfooterdata.acf.seo_page_titel +
    " | " +
    pagedata.title.replace(/<(?:.|\n)*?>/gm, "")
  );
};
export const getLink=(url='')=>{
  url = url.replace('http://', '');
  url = url.replace('https://', '');
  url = url.substr(url.indexOf('/'));
  return url;
};
//export const getImageUrl=(url='',options='')=>`https://res.cloudinary.com/b-coding/image/fetch/${options}/${url}`;
export const getImageUrl=(url='',options='')=>`${url}`;

export const nl2br = (txt)=> txt.replace(/(?:\r\n|\r|\n)/g, '<br />');
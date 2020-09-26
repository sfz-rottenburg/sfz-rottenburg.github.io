<div id="{{slug}}" class="bc_subpage">
  <div id="bc_sub_headerimg"
       style="background: {{#with pagedata.acf.hauptbild}}url({{{getImageUrl 'resize' this '2000' '400'
                                                                             pagedata.acf.title}}}{{/with}}) center center no-repeat">
    <div class="container">
      <div class="row">
        <div class="col s12">
          <h1 class="{{pagedata.acf.farbe_seitentitel}}">{{{pagedata.title}}}</h1>
        </div>
      </div>
    </div>
  </div>
  <div class="clearfix"></div>
  <div class="container">
    <div class="row">
      <div class="col s12 m8 l9 bc_standardcontent bc_padright">
        {{#with pagedata.acf.untertitel}}
          <div class="row">
            <div class="col s12">
              <h2 class="left-align">{{{this}}}</h2>
            </div>
          </div>
        {{/with}}
        <div class="row">
          <div class="col s12">
            {{{pagedata.content}}}
          </div>
        </div>
        <div class="row" id="bc_kontakt_sprechzeiten">
          <div class="col s12 m6">
            <div class="{{pagedata.acf.farbe_kontakt}}">
              <h3>{{pagedata.acf.titel_kontakt}}</h3>
            </div>
            {{{pagedata.acf.inhalt_kontakt}}}
          </div>
          <div class="col s12 m6">
            <div class="{{pagedata.acf.farbe_sprechzeiten}}">
              <h3>{{pagedata.acf.titel_sprechzeiten}}</h3>
            </div>
            {{#with pagedata.acf.sprechzeiten}}
              <table>
                {{#each this}}
                  <tr>
                    <td>
                      {{this.tag}}
                    </td>
                    <td>
                      {{this.uhrzeit}}
                    </td>
                  </tr>
                {{/each}}
              </table>
            {{/with}}
          </div>
        </div>
      </div>
      <div class="col s12 m4 l3">
        {{#with submenudata}}
          <div id="bc_sidebar">
            <div class="bc_sidebartitle_wrapper {{../pagedata.acf.hintergrundfarbe_titel_sidebar}}">
              <div class="bc_sidebartitle_wrapper_inner"
                   style="{{#with ../pagedata.acf.icon_titel_sidebar}}background:url({{getImageUrl 'resize' this '70'
                                                                                                   '70' }}) right center no-repeat{{/with}}">
                <h2
                   class="bc_sidebartitle left-align {{../pagedata.acf.textfarbe_titel_sidebar}}">{{../pagedata.post_parent.post_title}}</h2>
              </div>
            </div>
            <ul id="bc_sidebarmenu">
              {{#with ../submenudata}}
                {{#each this}}
                  <li class="bc_level_0">
                    <a href="{{getLink this.url}}">
                      {{{this.title}}}
                    </a>
                  </li>
                {{/each}}
              {{/with}}
            </ul>
          </div>
        {{/with}}
        {{#with pagedata.acf.downloadlink_flyer}}
          <a href="{{this}}" target="_blank">
            <div class="bc_button {{../pagedata.acf.hintergrundfarbe_titel_sidebar}}" id="bc_downloadbutton">
              {{../pagedata.acf.titel_button_download_flyer}}
            </div>
          </a>
        {{/with}}
      </div>
    </div>
  </div>
</div>
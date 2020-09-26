<div id="{{slug}}" class="bc_subpage">
  <div id="bc_sub_headerimg"
       style="background: {{#with pagedata.acf.hauptbild}}url({{{getImageUrl 'resize' this '2000' '400'
                                                                             pagedata.acf.title}}}){{else}}url({{{getImageUrl
          'zoomandcrop' headerfooterdata.acf.ersatzbild '2000' '400'
          pagedata.acf.title}}}{{/with}}) center center no-repeat">
    <div class="container">
      <div class="row">
        <div class="col s12">
          <h1 class="{{pagedata.acf.farbe}}">{{{pagedata.title}}}</h1>
        </div>
      </div>
    </div>
  </div>
  <div class="clearfix"></div>
  <div class="container">
    <div class="row">
      <div class="col s12 m8 l9 bc_standardcontent bc_padright">
        <div class="row bc_aktuelles_item">
          {{#with pagedata.acf.bild}}
            <div class="col s12">
              <div class="bc_img_bordered {{../pagedata.acf.farbe}}">
                {{{getImageTag 'zoomandcrop' this '950' '300' this.title ''}}}
              </div>
            </div>
          {{/with}}

        </div>
        <div class="row">
          <div class="col s12">
            {{{pagedata.content}}}
          </div>
        </div>
        <div class="row">
          {{#with pagedata.acf.bildergalerie}}
            {{#each this}}
              <div class="col s6 m4 l3 bc_quadratimg">
                {{{getImageTag 'zoomandcrop' this.bild '200' '200' this.title 'materialboxed' this.bild this.format}}}
              </div>
            {{/each}}
          {{/with}}
        </div>
      </div>
      <div class="col s12 m4 l3">
        <div id="bc_sidebar" style="margin-top:20px;">
          <div class="bc_sidebartitle_wrapper {{pagedata.acf.farbe}}">
            <div class="bc_sidebartitle_wrapper_inner"
                 style="{{#with pagedata.acf.icon_titel_sidebar}}background:url({{getImageUrl 'resize' this '70'
                                                                                              '70' }}) right center no-repeat{{/with}}">
              <h2
                 class="bc_sidebartitle left-align {{pagedata.acf.textfarbe_titel_sidebar}}">{{{headerfooterdata.acf.titel_sidebar_weitere_artikel}}}</h2>
            </div>
          </div>
          <ul id="bc_sidebarmenu">
            {{#with newsdata}}
              {{#each this}}
                <li>
                  <a href="{{getLink this.link}}">
                    <div class="truncate">{{{this.title.rendered}}}</div>
                  </a>
                </li>
              {{/each}}
            {{/with}}
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
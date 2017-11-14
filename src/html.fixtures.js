export const desktopAbove = `
  <div class="akva-grid akva-grid-desktop-and-above" style="max-width: 1200px; width: 92%; opacity: 0.5; z-index: 1; height: 0px;">
    <div class="akva-inner" style="margin-left: -1%; margin-right: -1%;">

      <div class="akva-cols">
        <div class="akva-col" style="border-color: blue; border-style: solid; margin: 0px 1%;"></div>
        <div class="akva-col" style="border-color: blue; border-style: solid; margin: 0px 1%;"></div>
        <div class="akva-col" style="border-color: blue; border-style: solid; margin: 0px 1%;"></div>
        <div class="akva-col" style="border-color: blue; border-style: solid; margin: 0px 1%;"></div>
        <div class="akva-col" style="border-color: blue; border-style: solid; margin: 0px 1%;"></div>
        <div class="akva-col" style="border-color: blue; border-style: solid; margin: 0px 1%;"></div>
      </div>

      <div class="akva-baseline">

        <div>
          <div class="akva-baseline-unit" style="height: 2em;"></div>
        </div>
        <div>
          <div class="akva-baseline-unit" style="height: 2em;"></div>
        </div>
        <div>
          <div class="akva-baseline-unit" style="height: 2em;"></div>
        </div>
        <div>
          <div class="akva-baseline-unit" style="height: 2em;"></div>
        </div>
        <div>
          <div class="akva-baseline-unit" style="height: 2em;"></div>
        </div>

      </div>
    </div>
  </div>`.replace(/^\s+|\s+$/gm, '').split('\n').join('')

export const mobileAndTablet = `
  <div class="akva-grid akva-grid-mobile-and-tablet" style="max-width: 1200px; opacity: 0.5; z-index: 1; height: 0px;">
    <div class="akva-inner" style="margin-left: 1.5%; margin-right: 1.5%;">

      <div class="akva-cols">
        <div class="akva-col" style="border-color: purple; border-style: dashed; margin: 0px 1.5%;"></div>
        <div class="akva-col" style="border-color: purple; border-style: dashed; margin: 0px 1.5%;"></div>
        <div class="akva-col" style="border-color: purple; border-style: dashed; margin: 0px 1.5%;"></div>
        <div class="akva-col" style="border-color: purple; border-style: dashed; margin: 0px 1.5%;"></div>
      </div>

    </div>
  </div>`.replace(/^\s+|\s+$/gm, '').split('\n').join('')

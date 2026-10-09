export function LiquidShaderDef() {
  return (
    <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
      <defs>
        {/* 
          Edge-Isolated Character Outline Displacement Filter
          Displaces ONLY the silhouette perimeter of Maria Concepcion portrait.png,
          leaving the interior face and body sharp, and preventing any rectangular box artifacts!
        */}
        <filter id="liquid-hero" x="-20%" y="-20%" width="140%" height="140%">
          {/* 1. Generate organic fractal turbulence */}
          <feTurbulence type="fractalNoise" baseFrequency="0.015 0.02" numOctaves="3" seed="2" result="rawNoise" />

          {/* 2. Extract silhouette outline band using morphological dilation and erosion */}
          <feMorphology in="SourceAlpha" operator="dilate" radius="8" result="outerSilhouette" />
          <feMorphology in="SourceAlpha" operator="erode" radius="4" result="innerSilhouette" />
          
          {/* 3. Subtract inner from outer to isolate ONLY the perimeter edge ring */}
          <feComposite in="outerSilhouette" in2="innerSilhouette" operator="out" result="edgeBand" />

          {/* 4. Modulate noise by the edge mask: neutral gray outside yields zero displacement */}
          <feFlood floodColor="#808080" result="neutralMap" />
          <feComposite in="rawNoise" in2="edgeBand" operator="in" result="maskedNoise" />
          <feComposite in="maskedNoise" in2="neutralMap" operator="over" result="displacementSource" />

          {/* 5. Displace only the outline perimeter */}
          <feDisplacementMap
            id="disp-hero"
            in="SourceGraphic"
            in2="displacementSource"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displacedGraphic"
          />

          {/* 6. Strict alpha containment so it never bleeds into a rectangular box */}
          <feComposite in="displacedGraphic" in2="outerSilhouette" operator="in" />
        </filter>

        {/* Release and Press Liquid Filters */}
        <filter id="liquid-r1" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.015" numOctaves="3" seed="5" result="n" />
          <feDisplacementMap id="disp-r1" in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="liquid-r2" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.013 0.017" numOctaves="3" seed="8" result="n" />
          <feDisplacementMap id="disp-r2" in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="liquid-r3" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.011 0.016" numOctaves="3" seed="11" result="n" />
          <feDisplacementMap id="disp-r3" in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="liquid-r4" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.014 0.019" numOctaves="3" seed="14" result="n" />
          <feDisplacementMap id="disp-r4" in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="liquid-p1" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.016" numOctaves="3" seed="17" result="n" />
          <feDisplacementMap id="disp-p1" in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="liquid-p2" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.014" numOctaves="3" seed="20" result="n" />
          <feDisplacementMap id="disp-p2" in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="liquid-p3" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.013 0.018" numOctaves="3" seed="23" result="n" />
          <feDisplacementMap id="disp-p3" in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}

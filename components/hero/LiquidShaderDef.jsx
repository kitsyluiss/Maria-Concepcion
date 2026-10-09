export function LiquidShaderDef() {
  return (
    <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
      <defs>
        {/* 
          Hero Portrait: Outline-Isolated Liquid Shader
          scale=1, baseFrequency=0.009, numOctaves=2
          Displaces ONLY the silhouette outline of Maria Concepcion portrait.png
        */}
        <filter id="liquid-hero" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence id="turb-hero" type="fractalNoise" baseFrequency="0.009" numOctaves="2" seed="2" result="rawNoise" />
          <feMorphology in="SourceAlpha" operator="dilate" radius="8" result="outerSilhouette" />
          <feMorphology in="SourceAlpha" operator="erode" radius="4" result="innerSilhouette" />
          <feComposite in="outerSilhouette" in2="innerSilhouette" operator="out" result="edgeBand" />
          <feFlood floodColor="#808080" result="neutralMap" />
          <feComposite in="rawNoise" in2="edgeBand" operator="in" result="maskedNoise" />
          <feComposite in="maskedNoise" in2="neutralMap" operator="over" result="displacementSource" />
          <feDisplacementMap
            id="disp-hero"
            in="SourceGraphic"
            in2="displacementSource"
            scale="1"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displacedGraphic"
          />
          <feComposite in="displacedGraphic" in2="outerSilhouette" operator="in" />
        </filter>

        {/* General Photos & Cards: Releases 01..04 (scale=1, baseFrequency=0.009, numOctaves=2) */}
        <filter id="liquid-r1" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence id="turb-r1" type="fractalNoise" baseFrequency="0.009" numOctaves="2" seed="5" result="n" />
          <feDisplacementMap id="disp-r1" in="SourceGraphic" in2="n" scale="1" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="liquid-r2" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence id="turb-r2" type="fractalNoise" baseFrequency="0.009" numOctaves="2" seed="8" result="n" />
          <feDisplacementMap id="disp-r2" in="SourceGraphic" in2="n" scale="1" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="liquid-r3" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence id="turb-r3" type="fractalNoise" baseFrequency="0.009" numOctaves="2" seed="11" result="n" />
          <feDisplacementMap id="disp-r3" in="SourceGraphic" in2="n" scale="1" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="liquid-r4" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence id="turb-r4" type="fractalNoise" baseFrequency="0.009" numOctaves="2" seed="14" result="n" />
          <feDisplacementMap id="disp-r4" in="SourceGraphic" in2="n" scale="1" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        {/* Testimonial Portraits: Press 01..03 (scale=1, baseFrequency=0.009, numOctaves=2) */}
        <filter id="liquid-p1" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence id="turb-p1" type="fractalNoise" baseFrequency="0.009" numOctaves="2" seed="17" result="n" />
          <feDisplacementMap id="disp-p1" in="SourceGraphic" in2="n" scale="1" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="liquid-p2" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence id="turb-p2" type="fractalNoise" baseFrequency="0.009" numOctaves="2" seed="20" result="n" />
          <feDisplacementMap id="disp-p2" in="SourceGraphic" in2="n" scale="1" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="liquid-p3" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence id="turb-p3" type="fractalNoise" baseFrequency="0.009" numOctaves="2" seed="23" result="n" />
          <feDisplacementMap id="disp-p3" in="SourceGraphic" in2="n" scale="1" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}

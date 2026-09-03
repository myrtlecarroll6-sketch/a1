document.addEventListener('DOMContentLoaded', () => {
  const progressBar = document.querySelector('.reading-progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      progressBar.style.width = scrolled + '%';
    });
  }

  const themeBtn = document.querySelector('.btn-theme-chronometer');
  const savedTheme = localStorage.getItem('wristmechanic_theme');
  if (savedTheme === 'light') {
    document.body.classList.add('theme-chronometer-light');
    if (themeBtn) themeBtn.textContent = 'Dark Caliber';
  }
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('theme-chronometer-light');
      themeBtn.textContent = isLight ? 'Dark Caliber' : 'Light Dial';
      localStorage.setItem('wristmechanic_theme', isLight ? 'light' : 'dark');
    });
  }

  const mobileToggle = document.querySelector('.mobile-toggle-horo');
  const navMenu = document.querySelector('.horo-nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.style.display === 'flex';
      navMenu.style.display = isOpen ? 'none' : 'flex';
      if (!isOpen) {
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.background = 'var(--bg-horo-surface)';
        navMenu.style.padding = '1.75rem';
        navMenu.style.boxShadow = 'var(--shadow-horo)';
        navMenu.style.borderBottom = '1px solid var(--border-horo)';
      }
    });
  }

  /* ==========================================================================
     1. HOROLOGICAL CALIBER WORKBENCH ENGINE
  ========================================================================== */
  let currentEscapement = 'lever';
  let currentSpring = 'silicon';
  let currentComplication = 'chronograph';

  const escapementCards = document.querySelectorAll('.wb-escapement-card');
  const springBtns = document.querySelectorAll('#spring-badges .wb-badge-btn');
  const complicationBtns = document.querySelectorAll('#complication-badges .wb-badge-btn');

  const gFreqNum = document.getElementById('gauge-freq-num');
  const gFreqBadge = document.getElementById('gauge-freq-badge');
  const gFreqBar = document.getElementById('gauge-freq-bar');
  const gFreqNote = document.getElementById('gauge-freq-note');

  const gRateNum = document.getElementById('gauge-rate-num');
  const gRateBadge = document.getElementById('gauge-rate-badge');
  const gRateNote = document.getElementById('gauge-rate-note');
  const barPos1 = document.getElementById('bar-pos1-val');
  const barPos2 = document.getElementById('bar-pos2-val');
  const barPos3 = document.getElementById('bar-pos3-val');

  const gReserveNum = document.getElementById('gauge-reserve-num');
  const gReserveBadge = document.getElementById('gauge-reserve-badge');
  const gReserveBar = document.getElementById('gauge-reserve-bar');
  const gReserveNote = document.getElementById('gauge-reserve-note');

  const tEscapement = document.getElementById('telem-escapement');
  const tSpring = document.getElementById('telem-spring');
  const tComplication = document.getElementById('telem-complication');
  const tCertification = document.getElementById('telem-certification');

  function updateCaliberWorkbench() {
    if (!gFreqNum) return;

    let freqVal = '28,800';
    let freqBadge = '4.0 Hz Standard Beat';
    let freqBarPct = 80;
    let freqNote = 'Swiss Lever Escapement & Ruby Pallet Jewels';

    let rateVal = '± 0.8';
    let rateBadge = 'METAS Master Chronometer';
    let rateNote = 'Tested Across 6 Static & Dynamic Positions';
    let pP1 = '+0.4 s/d (Dial Up)';
    let pP2 = '-0.6 s/d (Crown Left)';
    let pP3 = '+0.8 s/d (Crown Down)';

    let reserveVal = '72';
    let reserveBadge = '3-Day Nivaflex';
    let reserveBarPct = 60;
    let reserveNote = 'Dual-Barrel Continuous Torque Delivery';

    let esc = 'Swiss Lever with Synthetic Ruby Pallets';
    let spr = 'Monocrystalline Silicon (Silinvar) Hairspring';
    let comp = 'Column-Wheel Lateral Clutch Chronograph';
    let cert = 'METAS Master Chronometer (15,000 Gauss)';

    if (currentEscapement === 'coaxial') {
      esc = 'Daniels Dual-Impulse Co-Axial Escapement';
      freqVal = '25,200';
      freqBadge = '3.5 Hz Co-Axial Beat';
      freqBarPct = 70;
      freqNote = 'Zero Sliding Friction / Minimal Lubrication';
    } else if (currentEscapement === 'tourbillon') {
      esc = '1-Minute Flying Tourbillon Carriage';
      freqVal = '21,600';
      freqBadge = '3.0 Hz Classical Beat';
      freqBarPct = 60;
      freqNote = 'Continuous 360° Gravitational Error Cancellation';
      rateVal = '± 0.5';
      rateBadge = 'Geneva Seal Haute Standard';
    } else if (currentEscapement === 'highbeat') {
      esc = 'High-Frequency 36,000 VPH Chrono Caliber';
      freqVal = '36,000';
      freqBadge = '5.0 Hz High-Beat';
      freqBarPct = 100;
      freqNote = '1/10th Second Chronograph Resolution';
    }

    if (currentSpring === 'nivarox') {
      spr = 'Nivarox I Invar-Elinvar Nickel Alloy';
      cert = 'COSC Chronometer (-4 / +6 s/d)';
      rateVal = '± 2.5';
      rateBadge = 'COSC Certified';
      pP1 = '+1.8 s/d (Dial Up)';
      pP2 = '-2.1 s/d (Crown Left)';
      pP3 = '+2.5 s/d (Crown Down)';
    } else if (currentSpring === 'gyromax') {
      spr = 'Free-Sprung Gyromax Balance with Gold Weights';
      rateVal = '± 1.2';
      rateBadge = 'Poinçon de Genève';
    }

    if (currentComplication === 'perpetual') {
      comp = 'Instantaneous Jump Perpetual Calendar Module';
      reserveVal = '120';
      reserveBadge = '5-Day Power Reserve';
      reserveBarPct = 100;
      reserveNote = 'Twin-Series Barrels with Geneva Stopwork';
    } else if (currentComplication === 'gyrotourbillon') {
      comp = 'Multi-Axis Spherical Gyrotourbillon Carriage';
      reserveVal = '48';
      reserveBadge = 'Constant-Force Reserve';
      reserveBarPct = 40;
    }

    gFreqNum.innerHTML = freqVal;
    gFreqBadge.innerHTML = freqBadge;
    gFreqBar.style.width = freqBarPct + '%';
    gFreqNote.innerHTML = freqNote;

    gRateNum.innerHTML = rateVal;
    gRateBadge.innerHTML = rateBadge;
    gRateNote.innerHTML = rateNote;
    barPos1.innerHTML = pP1;
    barPos2.innerHTML = pP2;
    barPos3.innerHTML = pP3;

    gReserveNum.innerHTML = reserveVal;
    gReserveBadge.innerHTML = reserveBadge;
    gReserveBar.style.width = reserveBarPct + '%';
    gReserveNote.innerHTML = reserveNote;

    tEscapement.innerHTML = esc;
    tSpring.innerHTML = spr;
    tComplication.innerHTML = comp;
    tCertification.innerHTML = cert;
  }

  escapementCards.forEach(card => {
    card.addEventListener('click', () => {
      escapementCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      currentEscapement = card.getAttribute('data-escapement');
      updateCaliberWorkbench();
    });
  });

  springBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      springBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSpring = btn.getAttribute('data-spring');
      updateCaliberWorkbench();
    });
  });

  complicationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      complicationBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentComplication = btn.getAttribute('data-complication');
      updateCaliberWorkbench();
    });
  });

  updateCaliberWorkbench();

  /* ==========================================================================
     2. 5-STAGE HAUTE HORLOGERIE FINISHING MATRIX
  ========================================================================== */
  const matrixData = {
    "1": {
      tag: "Stage 01: Ebauche Micro-Milling",
      title: "5-Axis Spark Erosion CNC Milling & Caliber Baseplate Roughing",
      desc: "Raw German silver (Maillechort) or titanium baseplates are milled using 5-axis CNC diamond tooling and electrical discharge machining (EDM), creating jewel sinkings and pinion pivots within sub-micron tolerances.",
      spi: "0.5 Micron Tolerance",
      tannage: "Untreated German Silver (Maillechort)",
      edge: "Sub-Micron Pinion Pockets",
      time: "8 Hours Multi-Axis Milling",
      action: "CNC Diamond Tooling & EDM",
      artifact: "Milled Raw Ebauche Plate Suite",
      metric: "100% Dimensional Conformity",
      cue: "<strong>Master Watchmaker Cue:</strong> German silver ages with a warm golden patina over decades, requiring cleanroom assembly with zero bare-finger skin contact."
    },
    "2": {
      tag: "Stage 02: Hand Anglage (Beveling)",
      title: "Hand Anglage & Inward Sharp Corner Polishing (Berceau Beveling)",
      desc: "The true test of a master horologist. Using steel files, gentian wood pegwood sticks, and diamond paste, all bridge edges are beveled to a 45-degree curve (berceau) with sharp, mirror-polished inward angles that no CNC machine can cut.",
      spi: "45° Berceau Convex Bevel",
      tannage: "Gentian Wood & Diamond Paste",
      edge: "Razor Mirror Inward Angles",
      time: "25-35 Hours Pure Hand Anglage",
      action: "Gentian Wood Hand Buffing",
      artifact: "Mirror-Beveled Caliber Bridges",
      metric: "Flawless Distortion-Free Reflection",
      cue: "<strong>Master Watchmaker Cue:</strong> Sharp internal corners require filing with a micro-triangular needle file to achieve a seamless, knife-edge intersection."
    },
    "3": {
      tag: "Stage 03: Glazing & Perlage",
      title: "Côtes de Genève Glazing & Circular Grain Perlage Stippling",
      desc: "Top bridge surfaces receive straight or circular Côtes de Genève stripes using abrasive wooden wheels. Hidden lower plate surfaces are finished with overlapping circular perlage stipples to trap micro-dust particles away from pivots.",
      spi: "0.8mm Stripe Spacing",
      tannage: "Boxwood Wheel & Emery Paste",
      edge: "Symmetrical Parallel Grain",
      time: "10 Hours Glazing & Perlage",
      action: "Rotary Boxwood Surface Glazing",
      artifact: "Geneva Striped Bridge Suite",
      metric: "Perfect Light-Refraction Luster",
      cue: "<strong>Master Watchmaker Cue:</strong> Overlapping circular perlage dots must maintain 50% diameter overlap with constant spindle pressure across the plate."
    },
    "4": {
      tag: "Stage 04: Poising & Regulation",
      title: "Dynamic Balance Poising, Hairspring Colleting & 6-Position Timing",
      desc: "The balance wheel is statically and dynamically poised on ruby knife-edges. The hairspring is pinned to the collet, centered, and regulated across 6 physical positions (Dial Up/Down, Crown Up/Down/Left/Right) in a thermal chamber.",
      spi: "Delta Error < 1.0 s/day",
      tannage: "Nivaflex Mainspring & Silinvar",
      edge: "6-Position Thermal Regulation",
      time: "15 Hours Chronometer Tuning",
      action: "Witschi Timegrapher Analysis",
      artifact: "Calibrated Balance Assembly",
      metric: "COSC / METAS Timing Mastery",
      cue: "<strong>Master Watchmaker Cue:</strong> Regulating isochronism requires adjusting the curb pins or rotating free-sprung Gyromax inertia weights by microscopic arc degrees."
    },
    "5": {
      tag: "Stage 05: Casing & Geneva Seal",
      title: "Final Casing, Sapphire Sealing & Poinçon de Genève Verification",
      desc: "The completed movement is cased into a titanium or platinum chassis with anti-reflective sapphire crystals. The watch undergoes 200 hours of automated winding, water-resistance pressure tests, and Poinçon de Genève inspection.",
      spi: "Poinçon de Genève Seal",
      tannage: "Solid Grade 5 Titanium Chassis",
      edge: "100m Hydrostatic Pressure Seal",
      time: "200 Hours Chronometric Testing",
      action: "Full Casing & Pressure Test",
      artifact: "Certified Masterpiece Timepiece",
      metric: "0.00% Defect Rate Certification",
      cue: "<strong>Master Watchmaker Cue:</strong> Every screw head must be mirror black-polished (poli noir) with chamfered slots before receiving the final seal of the canton of Geneva."
    }
  };

  const matrixStepBtns = document.querySelectorAll('.matrix-step-btn');
  const dTag = document.getElementById('matrix-display-tag');
  const dTitle = document.getElementById('matrix-display-title');
  const dDesc = document.getElementById('matrix-display-desc');
  const dSpi = document.getElementById('matrix-spi-val');
  const dTannage = document.getElementById('matrix-tannage-val');
  const dEdge = document.getElementById('matrix-edge-val');
  const dTime = document.getElementById('matrix-time-val');
  const dAct = document.getElementById('matrix-act-val');
  const dArtifact = document.getElementById('matrix-artifact-val');
  const dMetric = document.getElementById('matrix-metric-val');
  const dCue = document.getElementById('matrix-horo-text');

  if (matrixStepBtns.length > 0) {
    matrixStepBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        matrixStepBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const phaseKey = btn.getAttribute('data-phase');
        const data = matrixData[phaseKey];
        if (data && dTitle) {
          dTag.innerHTML = data.tag;
          dTitle.innerHTML = data.title;
          dDesc.innerHTML = data.desc;
          dSpi.innerHTML = data.spi;
          dTannage.innerHTML = data.tannage;
          dEdge.innerHTML = data.edge;
          dTime.innerHTML = data.time;
          dAct.innerHTML = data.action;
          dArtifact.innerHTML = data.artifact;
          dMetric.innerHTML = data.metric;
          dCue.innerHTML = data.cue;
        }
      });
    });
  }

  /* ==========================================================================
     3. FAQ & BLOG SEARCH
  ========================================================================== */
  const faqBtns = document.querySelectorAll('.faq-horo-btn');
  if (faqBtns.length > 0) {
    faqBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-horo-item').forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    });
  }

  const searchInput = document.getElementById('horo-search-input');
  const blogCards = document.querySelectorAll('.blog-horo-card');
  if (searchInput && blogCards.length > 0) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      blogCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = (q === '' || text.includes(q)) ? 'flex' : 'none';
      });
    });
  }
});

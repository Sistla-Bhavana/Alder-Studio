/**
 * ============================================================================
 * ALDER STUDIO — VANILLA JAVASCRIPT APPLICATION
 * Zero external frameworks or libraries.
 *
 * EDITING GUIDE FOR HANDOVER:
 * 1. Update `SITE_CONFIG.whatsappPhoneNumber` below (country code + number, no '+' or spaces).
 * 2. Update `HERO_SECTORS`, `SPRINT_PHASES`, or `MODULE_DELIVERABLES` to customize copy.
 * ============================================================================
 */

const SITE_CONFIG = {
  // EDIT: Replace with your business WhatsApp phone number (digits only, include country code)
  whatsappPhoneNumber: '6581234567',
  defaultPage: 'home',
  validPages: ['home', 'about', 'services', 'results', 'contact'],
};

const MODULE_DELIVERABLES = {
  'Conversion Website Architecture':
    'Mobile-first Swiss Bento layout, semantic HTML5 build & Core Web Vitals optimization',
  'Local & Technical SEO':
    'Schema markup, keyword architecture & local search landing pages',
  'Enquiry & WhatsApp Funnel':
    'Guided pre-qualification popover & dynamic WhatsApp message routing',
  'Brand & Swiss Design System':
    'Editorial typography scale, pastel CSS token library & reusable card templates',
};

const HERO_SECTORS = {
  architecture: {
    kicker: 'Architecture Practice',
    sprint: '5-Week Build',
    stat: '+148% Qualified Enquiries',
    note: 'Kovac Architecture grew monthly project briefs from 11 to 27 using scope estimators and WhatsApp routing.',
    industry: 'consultancy',
    traffic: 3500,
    timeline: 5,
    modules: ['Conversion Website Architecture', 'Enquiry & WhatsApp Funnel'],
  },
  healthcare: {
    kicker: 'Healthcare & Clinics',
    sprint: '4-Week Sprint',
    stat: '-42% Cost Per Booking',
    note: 'Harbourview Dental replaced multi-step portals with treatment Bento cards and two-field WhatsApp triage.',
    industry: 'clinic',
    traffic: 4500,
    timeline: 4,
    modules: ['Conversion Website Architecture', 'Local & Technical SEO', 'Enquiry & WhatsApp Funnel'],
  },
  b2b: {
    kicker: 'B2B Distribution',
    sprint: '6-Week System',
    stat: '$420K Quote Pipeline',
    note: 'Nordic Timber turned 14 spec sheets into comparison tables with instant WhatsApp specification requests.',
    industry: 'b2b',
    traffic: 6000,
    timeline: 6,
    modules: [
      'Conversion Website Architecture',
      'Local & Technical SEO',
      'Brand & Swiss Design System',
    ],
  },
};

const SPRINT_PHASES = [
  {
    week: 'Week 1',
    gate: 'Sign-off: Strategy Brief',
    title: '01. Funnel & Search Audit',
    summary:
      'We map where current visitors drop off, benchmark local commercial keywords, and define the highest-intent WhatsApp enquiry entry points.',
    deliverables: [
      'Analytics & conversion drop-off scorecard',
      'Keyword & page hierarchy blueprint',
    ],
    clientInput:
      'One 45-minute kickoff call plus read-only access to current Search Console or site analytics.',
  },
  {
    week: 'Week 2',
    gate: 'Sign-off: Visual Prototype',
    title: '02. Swiss Bento Wireframing',
    summary:
      'Interactive layout prototypes establish clear typographic hierarchy, soft pastel surface rhythm, and thumb-friendly mobile ergonomics.',
    deliverables: [
      'Clickable desktop & mobile Bento wireframe',
      'Draft conversion headlines & offer framing',
    ],
    clientInput:
      'Review prototype comments asynchronously within 48 hours and approve tone of voice.',
  },
  {
    week: 'Weeks 3–4',
    gate: 'Sign-off: Staging QA',
    title: '03. Vanilla Build & QA',
    summary:
      'We write commented semantic HTML5, CSS3 variables, and pure vanilla JavaScript—connecting estimators, forms, and WhatsApp routing.',
    deliverables: [
      'Production-ready codebase (95+ Lighthouse target)',
      'Cross-device testing & Core Web Vitals verification',
    ],
    clientInput:
      'Verify final WhatsApp destination number and confirm team contact details.',
  },
  {
    week: 'Week 5',
    gate: 'Sign-off: Live Launch',
    title: '04. Handover & Attribution',
    summary:
      'We deploy to your domain, verify 301 SEO redirects, configure click attribution, and train your staff on updating text or Bento cards.',
    deliverables: [
      'Recorded 15-minute code & editing walkthrough',
      'GA4 / UTM conversion event tracking setup',
    ],
    clientInput:
      'DNS pointer update for launch and 30-minute handover call with your marketing lead.',
  },
];

const INDUSTRY_MULTIPLIERS = {
  consultancy: { rate: 0.013, label: 'Service Firm' },
  clinic: { rate: 0.016, label: 'Clinic / Practice' },
  b2b: { rate: 0.011, label: 'B2B Supply' },
};

/**
 * Helper: Build a properly encoded https://wa.me URL.
 */
function buildWhatsAppUrl(message) {
  const cleanPhone = SITE_CONFIG.whatsappPhoneNumber.replace(/\D/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * 1. READING PROGRESS BAR & METRIC COUNT-UP ANIMATION
 */
function initScrollProgress() {
  const bar = document.getElementById('header-progress');
  if (!bar) return;

  function updateProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
    bar.style.transform = `scaleX(${ratio})`;
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  updateProgress();
}

function animateMetricCounters(scopeEl = document) {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const counters = scopeEl.querySelectorAll('[data-count-target]');

  counters.forEach((el) => {
    const target = Number(el.getAttribute('data-count-target'));
    const decimals = Number(el.getAttribute('data-count-decimals') || 0);
    const prefix = el.getAttribute('data-count-prefix') || '';
    const suffix = el.getAttribute('data-count-suffix') || '';

    if (Number.isNaN(target)) return;

    if (prefersReduced) {
      el.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
      return;
    }

    const duration = 650;
    const startTime = performance.now();

    function frame(now) {
      const progress = Math.min(1, (now - startTime) / duration);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      el.textContent = `${prefix}${current.toFixed(decimals)}${suffix}`;
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
      }
    }

    requestAnimationFrame(frame);
  });
}

/**
 * 2. SPA MULTI-PAGE NAVIGATION & MOBILE MENU
 */
function initNavigation() {
  const pageViews = document.querySelectorAll('.page-view');
  const navLinks = document.querySelectorAll('[data-nav-target]');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const jumpEstimatorBtn = document.getElementById('jump-to-estimator-btn');

  function setMobileMenuOpen(isOpen) {
    if (!mobileToggle || !mobileDrawer) return;
    mobileToggle.setAttribute('aria-expanded', String(isOpen));
    mobileDrawer.hidden = !isOpen;
  }

  function showPage(pageKey, updateHash = true) {
    const targetPage = SITE_CONFIG.validPages.includes(pageKey)
      ? pageKey
      : SITE_CONFIG.defaultPage;

    pageViews.forEach((section) => {
      const isMatch = section.getAttribute('data-page') === targetPage;
      section.hidden = !isMatch;
      section.classList.toggle('is-active', isMatch);
      if (isMatch) {
        if (targetPage === 'home') {
          animateMetricCounters(section);
        }
        if (typeof window.__observeBentoCards === 'function') {
          window.__observeBentoCards(section);
        }
      }
    });

    navLinks.forEach((link) => {
      const isMatch = link.getAttribute('data-nav-target') === targetPage;
      link.classList.toggle('is-active', isMatch);
      if (link.classList.contains('nav-link')) {
        if (isMatch) {
          link.setAttribute('aria-current', 'page');
        } else {
          link.removeAttribute('aria-current');
        }
      }
    });

    if (updateHash && window.location.hash !== `#${targetPage}`) {
      history.replaceState(null, '', `#${targetPage}`);
    }

    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = link.getAttribute('data-nav-target');
      if (!target) return;
      event.preventDefault();
      showPage(target, true);
    });
  });

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      setMobileMenuOpen(!isExpanded);
    });
  }

  if (jumpEstimatorBtn) {
    jumpEstimatorBtn.addEventListener('click', () => {
      showPage('home', true);
      requestAnimationFrame(() => {
        const estimatorEl = document.getElementById('estimator-section');
        if (estimatorEl) {
          estimatorEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  window.addEventListener('hashchange', () => {
    const hashPage = window.location.hash.replace('#', '').trim();
    if (SITE_CONFIG.validPages.includes(hashPage)) {
      showPage(hashPage, false);
    }
  });

  const initialHash = window.location.hash.replace('#', '').trim();
  showPage(SITE_CONFIG.validPages.includes(initialHash) ? initialHash : SITE_CONFIG.defaultPage, false);
}

/**
 * 3. HERO SECTOR BENCHMARK SWITCHER
 */
function initHeroBenchmark(applyEstimatorPreset) {
  const sectorButtons = document.querySelectorAll('[data-hero-sector]');
  const kickerEl = document.getElementById('hero-sector-kicker');
  const sprintEl = document.getElementById('hero-sector-sprint');
  const statEl = document.getElementById('hero-sector-stat');
  const noteEl = document.getElementById('hero-sector-note');
  const prefillBtn = document.getElementById('hero-prefill-estimator');

  let activeSectorKey = 'architecture';

  function renderSector(key) {
    const data = HERO_SECTORS[key];
    if (!data) return;
    activeSectorKey = key;

    sectorButtons.forEach((btn) => {
      const isActive = btn.getAttribute('data-hero-sector') === key;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-selected', String(isActive));
    });

    if (kickerEl) kickerEl.textContent = data.kicker;
    if (sprintEl) sprintEl.textContent = data.sprint;
    if (statEl) statEl.textContent = data.stat;
    if (noteEl) noteEl.textContent = data.note;
  }

  sectorButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-hero-sector');
      if (key) renderSector(key);
    });
  });

  if (prefillBtn && typeof applyEstimatorPreset === 'function') {
    prefillBtn.addEventListener('click', () => {
      const data = HERO_SECTORS[activeSectorKey];
      if (data) {
        applyEstimatorPreset(data);
        const estimatorEl = document.getElementById('estimator-section');
        if (estimatorEl) {
          estimatorEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  }
}

/**
 * 4. INTERACTIVE SERVICE & ROI / PROJECT ESTIMATOR DASHBOARD + LIVE SVG CHART
 */
function initEstimatorDashboard() {
  const checkboxes = document.querySelectorAll('input[name="estimator-module"]');
  const industryButtons = document.querySelectorAll('[data-est-industry]');
  const trafficSlider = document.getElementById('scope-traffic-slider');
  const timelineSlider = document.getElementById('scope-timeline-slider');
  const trafficOutput = document.getElementById('scope-traffic-output');
  const timelineOutput = document.getElementById('scope-timeline-output');
  const countEl = document.getElementById('est-selected-count');
  const enquiriesEl = document.getElementById('est-enquiries');
  const roiEl = document.getElementById('est-roi');
  const investmentEl = document.getElementById('est-investment');
  const deliverablesList = document.getElementById('est-deliverables-list');
  const waLink = document.getElementById('estimator-wa-link');
  const copyBtn = document.getElementById('estimator-copy-btn');
  const copyStatus = document.getElementById('estimator-copy-status');

  // SVG Chart elements
  const baselinePath = document.getElementById('est-baseline-path');
  const projectedArea = document.getElementById('est-projected-area');
  const projectedLine = document.getElementById('est-projected-line');
  const chartPointsGroup = document.getElementById('est-chart-points');
  const chartReadout = document.getElementById('est-chart-readout');

  if (!trafficSlider || !timelineSlider || !waLink) return () => {};

  let activeIndustry = 'consultancy';
  let latestSummaryMessage = '';

  function renderChart(baselineMonthly, highLeads) {
    if (!baselinePath || !projectedArea || !projectedLine || !chartPointsGroup) return;

    const xCoords = [24, 128, 232, 336];
    const monthLabels = ['Month 1', 'Month 3', 'Month 4', 'Month 6'];
    const baseVal = Math.max(4, baselineMonthly);
    const peakVal = Math.max(baseVal + 6, highLeads);

    // 4-point S-curve progression from Month 1 to Month 6
    const projectedValues = [
      Math.round(baseVal + (peakVal - baseVal) * 0.22),
      Math.round(baseVal + (peakVal - baseVal) * 0.58),
      Math.round(baseVal + (peakVal - baseVal) * 0.82),
      peakVal,
    ];

    const maxScale = Math.max(peakVal * 1.15, 25);
    const minY = 20;
    const maxY = 92;

    function valToY(val) {
      const clamped = Math.min(maxScale, Math.max(0, val));
      return Math.round(maxY - (clamped / maxScale) * (maxY - minY));
    }

    const baseY = valToY(baseVal);
    baselinePath.setAttribute('d', `M ${xCoords[0]} ${baseY} L ${xCoords[3]} ${baseY - 3}`);

    const pts = xCoords.map((x, idx) => ({
      x,
      y: valToY(projectedValues[idx]),
      val: projectedValues[idx],
      label: monthLabels[idx],
    }));

    const linePath = `M ${pts[0].x} ${pts[0].y} C ${pts[0].x + 48} ${pts[0].y}, ${pts[1].x - 42} ${pts[1].y}, ${pts[1].x} ${pts[1].y} S ${pts[2].x - 36} ${pts[2].y}, ${pts[2].x} ${pts[2].y} S ${pts[3].x - 40} ${pts[3].y}, ${pts[3].x} ${pts[3].y}`;
    const areaPath = `${linePath} L ${pts[3].x} ${maxY} L ${pts[0].x} ${maxY} Z`;

    projectedLine.setAttribute('d', linePath);
    projectedArea.setAttribute('d', areaPath);

    chartPointsGroup.innerHTML = '';
    pts.forEach((pt, idx) => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', String(pt.x));
      circle.setAttribute('cy', String(pt.y));
      circle.setAttribute('r', idx === pts.length - 1 ? '5' : '4');
      circle.setAttribute('fill', idx === pts.length - 1 ? '#166534' : '#FFFFFF');
      circle.setAttribute('stroke', '#166534');
      circle.setAttribute('stroke-width', '2');
      circle.setAttribute('tabindex', '0');
      circle.setAttribute('role', 'button');
      circle.setAttribute('aria-label', `${pt.label}: ${pt.val} projected enquiries`);
      circle.classList.add('chart-point-btn');

      const updateReadout = () => {
        if (chartReadout) {
          chartReadout.textContent = `${pt.label} target: +${pt.val} enquiries/mo vs. ${baseVal} baseline`;
        }
      };

      circle.addEventListener('mouseenter', updateReadout);
      circle.addEventListener('focus', updateReadout);
      chartPointsGroup.appendChild(circle);
    });

    if (chartReadout) {
      chartReadout.textContent = `Month 6 target: +${peakVal} enquiries/mo vs. ${baseVal} baseline`;
    }
  }

  function updateEstimator() {
    const selectedModules = Array.from(checkboxes).filter((cb) => cb.checked);
    const monthlyTraffic = Number(trafficSlider.value);
    const targetWeeks = Number(timelineSlider.value);
    const industryConfig = INDUSTRY_MULTIPLIERS[activeIndustry] || INDUSTRY_MULTIPLIERS.consultancy;

    if (trafficOutput) {
      trafficOutput.textContent = `${monthlyTraffic.toLocaleString()} / mo`;
    }
    if (timelineOutput) {
      timelineOutput.textContent = `${targetWeeks} Weeks`;
    }

    let totalBasePrice = 0;
    let totalWeeks = 0;
    let totalUplift = 0;
    const selectedNames = [];

    selectedModules.forEach((cb) => {
      totalBasePrice += Number(cb.dataset.price || 0);
      totalWeeks += Number(cb.dataset.weeks || 0);
      totalUplift += Number(cb.dataset.uplift || 0);
      selectedNames.push(cb.value);
    });

    if (selectedModules.length === 0) {
      totalBasePrice = 1200;
      totalWeeks = 2;
      totalUplift = 0.25;
      selectedNames.push('Custom Discovery Sprint');
    }

    const rushMultiplier = targetWeeks <= 3 ? 1.12 : 1.0;
    const estimatedCost = Math.round((totalBasePrice * rushMultiplier) / 100) * 100;

    const baselineMonthly = Math.max(4, Math.round(monthlyTraffic * industryConfig.rate));
    const effectiveRate = industryConfig.rate * (1 + totalUplift);
    const lowLeads = Math.max(baselineMonthly + 4, Math.round(monthlyTraffic * effectiveRate * 0.9));
    const highLeads = Math.max(lowLeads + 6, Math.round(monthlyTraffic * effectiveRate * 1.22));
    const roiPercent = Math.round(95 + totalUplift * 110);
    const scheduleWeeks = Math.max(2, Math.min(12, Math.round((totalWeeks + targetWeeks) / 2)));

    if (countEl) {
      countEl.textContent =
        selectedModules.length === 1
          ? '1 Module Active'
          : `${selectedModules.length} Modules Active`;
    }
    if (enquiriesEl) {
      enquiriesEl.textContent = `+${lowLeads} – ${highLeads} / mo`;
    }
    if (roiEl) {
      roiEl.textContent = `+${roiPercent}%`;
    }
    if (investmentEl) {
      investmentEl.textContent = `$${estimatedCost.toLocaleString()} · ~${scheduleWeeks} wks`;
    }

    renderChart(baselineMonthly, highLeads);

    if (deliverablesList) {
      deliverablesList.innerHTML = '';
      selectedNames.forEach((name) => {
        const li = document.createElement('li');
        li.textContent =
          MODULE_DELIVERABLES[name] ||
          'Tailored discovery roadmap, wireframes & WhatsApp conversion setup';
        deliverablesList.appendChild(li);
      });
    }

    latestSummaryMessage = [
      `Hi! I used your Project Estimator on Alder Studio (${industryConfig.label}).`,
      `Selected modules: ${selectedNames.join(', ')}.`,
      `Monthly traffic: ~${monthlyTraffic.toLocaleString()} visitors.`,
      `Target timeline: ${targetWeeks} weeks (Est. $${estimatedCost.toLocaleString()}, +${lowLeads}–${highLeads} enquiries/mo).`,
      'I would like to discuss next steps.',
    ].join(' ');

    waLink.href = buildWhatsAppUrl(latestSummaryMessage);
  }

  industryButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-est-industry');
      if (!key || !INDUSTRY_MULTIPLIERS[key]) return;
      activeIndustry = key;
      industryButtons.forEach((other) => {
        const active = other === btn;
        other.classList.toggle('is-active', active);
        other.setAttribute('aria-pressed', String(active));
      });
      updateEstimator();
    });
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(latestSummaryMessage);
        if (copyStatus) copyStatus.textContent = 'Project brief copied to clipboard.';
      } catch {
        if (copyStatus) copyStatus.textContent = 'Ready — tap Send Custom Estimate to open WhatsApp.';
      }
      setTimeout(() => {
        if (copyStatus) {
          copyStatus.textContent =
            'Opens WhatsApp with your selected modules, timeline, and estimated deliverables pre-filled.';
        }
      }, 2800);
    });
  }

  checkboxes.forEach((cb) => cb.addEventListener('change', updateEstimator));
  trafficSlider.addEventListener('input', updateEstimator);
  timelineSlider.addEventListener('input', updateEstimator);

  updateEstimator();

  return function applyPreset(preset) {
    if (preset.industry && INDUSTRY_MULTIPLIERS[preset.industry]) {
      activeIndustry = preset.industry;
      industryButtons.forEach((btn) => {
        const active = btn.getAttribute('data-est-industry') === activeIndustry;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-pressed', String(active));
      });
    }
    if (preset.traffic) trafficSlider.value = String(preset.traffic);
    if (preset.timeline) timelineSlider.value = String(preset.timeline);
    if (Array.isArray(preset.modules)) {
      checkboxes.forEach((cb) => {
        cb.checked = preset.modules.includes(cb.value);
      });
    }
    updateEstimator();
  };
}

/**
 * 5. INTERACTIVE SPRINT EXPLORER (ABOUT PAGE)
 */
function initSprintExplorer() {
  const stepBtns = document.querySelectorAll('[data-sprint-step]');
  const weekEl = document.getElementById('sprint-detail-week');
  const gateEl = document.getElementById('sprint-detail-gate');
  const titleEl = document.getElementById('sprint-detail-title');
  const summaryEl = document.getElementById('sprint-detail-summary');
  const deliverablesEl = document.getElementById('sprint-detail-deliverables');
  const clientEl = document.getElementById('sprint-detail-client');

  if (!stepBtns.length) return;

  function selectPhase(index) {
    const phase = SPRINT_PHASES[index];
    if (!phase) return;

    stepBtns.forEach((btn, idx) => {
      const isMatch = idx === index;
      btn.classList.toggle('is-active', isMatch);
      btn.setAttribute('aria-selected', String(isMatch));
    });

    if (weekEl) weekEl.textContent = phase.week;
    if (gateEl) gateEl.textContent = phase.gate;
    if (titleEl) titleEl.textContent = phase.title;
    if (summaryEl) summaryEl.textContent = phase.summary;
    if (clientEl) clientEl.textContent = phase.clientInput;

    if (deliverablesEl) {
      deliverablesEl.innerHTML = '';
      phase.deliverables.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        deliverablesEl.appendChild(li);
      });
    }
  }

  stepBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.getAttribute('data-sprint-step'));
      if (!Number.isNaN(idx)) selectPhase(idx);
    });
  });
}

/**
 * 6. SERVICES CATEGORY FILTER & CASE STUDY BEFORE/AFTER TOGGLE
 */
function initServicesFilter() {
  const filterBtns = document.querySelectorAll('[data-service-filter]');
  const serviceCards = document.querySelectorAll('#services-bento-grid > article[data-category]');
  const countEl = document.getElementById('service-filter-count');

  if (!filterBtns.length || !serviceCards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-service-filter') || 'all';

      filterBtns.forEach((other) => {
        const active = other === btn;
        other.classList.toggle('is-active', active);
        other.setAttribute('aria-selected', String(active));
      });

      let visibleCount = 0;
      serviceCards.forEach((card) => {
        const match = category === 'all' || card.getAttribute('data-category') === category;
        card.hidden = !match;
        if (match) visibleCount += 1;
      });

      if (countEl) {
        countEl.textContent = `Showing ${visibleCount} of ${serviceCards.length} services`;
      }
    });
  });
}

function initCaseStudyComparison() {
  const modeBtns = document.querySelectorAll('[data-case-mode]');
  const headlineEl = document.getElementById('case-headline');
  const valLeads = document.getElementById('case-val-leads');
  const barLeads = document.getElementById('case-bar-leads');
  const valSpeed = document.getElementById('case-val-speed');
  const barSpeed = document.getElementById('case-bar-speed');
  const summaryEl = document.getElementById('case-summary-text');

  if (!modeBtns.length) return;

  const states = {
    after: {
      headline: '+148% Qualified Project Enquiries',
      leadsText: '27 / mo',
      leadsWidth: '90%',
      speedText: '0.9s',
      speedWidth: '92%',
      summary:
        'Rebuilt in a clean Bento case-study structure with residential/commercial scope estimators and direct WhatsApp booking—growing qualified briefs from 11 to 27 per month.',
    },
    before: {
      headline: 'Baseline Before Redesign',
      leadsText: '11 / mo',
      leadsWidth: '37%',
      speedText: '5.4s',
      speedWidth: '24%',
      summary:
        'Legacy heavy template site with unoptimized gallery assets, no service-level pricing anchors, and a generic contact form buried in the footer.',
    },
  };

  modeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-case-mode');
      const data = states[mode];
      if (!data) return;

      modeBtns.forEach((other) => {
        const active = other === btn;
        other.classList.toggle('is-active', active);
        other.setAttribute('aria-selected', String(active));
      });

      if (headlineEl) headlineEl.textContent = data.headline;
      if (valLeads) valLeads.textContent = data.leadsText;
      if (barLeads) barLeads.style.width = data.leadsWidth;
      if (valSpeed) valSpeed.textContent = data.speedText;
      if (barSpeed) barSpeed.style.width = data.speedWidth;
      if (summaryEl) summaryEl.textContent = data.summary;
    });
  });
}

/**
 * 7. FLOATING WHATSAPP CHAT WIDGET
 */
function initWhatsAppWidget() {
  const fab = document.getElementById('wa-fab');
  const popover = document.getElementById('wa-popover');
  const closeBtn = document.getElementById('wa-close-btn');
  const form = document.getElementById('wa-widget-form');
  const nameInput = document.getElementById('wa-visitor-name');
  const serviceSelect = document.getElementById('wa-service-select');
  const nameError = document.getElementById('wa-name-error');
  const readyBox = document.getElementById('wa-ready-box');
  const readyPreview = document.getElementById('wa-ready-preview');
  const directAnchor = document.getElementById('wa-direct-anchor');
  const editAgainBtn = document.getElementById('wa-edit-again-btn');
  const serviceTriggers = document.querySelectorAll('[data-open-whatsapp]');

  if (!fab || !popover || !form || !nameInput || !serviceSelect) return;

  function openPopover(preselectedService) {
    if (preselectedService) {
      const matchingOption = Array.from(serviceSelect.options).find(
        (opt) => opt.value === preselectedService
      );
      if (matchingOption) {
        serviceSelect.value = preselectedService;
      } else {
        const customOpt = document.createElement('option');
        customOpt.value = preselectedService;
        customOpt.textContent = preselectedService;
        serviceSelect.appendChild(customOpt);
        serviceSelect.value = preselectedService;
      }
    }

    form.hidden = false;
    if (readyBox) readyBox.hidden = true;
    popover.hidden = false;
    fab.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(() => nameInput.focus());
  }

  function closePopover() {
    popover.hidden = true;
    fab.setAttribute('aria-expanded', 'false');
  }

  fab.addEventListener('click', () => {
    const isOpen = !popover.hidden;
    if (isOpen) {
      closePopover();
    } else {
      openPopover();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closePopover);
  }

  serviceTriggers.forEach((btn) => {
    btn.addEventListener('click', () => {
      const serviceName = btn.getAttribute('data-service') || 'General Enquiry';
      openPopover(serviceName);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !popover.hidden) {
      closePopover();
      fab.focus();
    }
  });

  if (editAgainBtn) {
    editAgainBtn.addEventListener('click', () => {
      if (readyBox) readyBox.hidden = true;
      form.hidden = false;
      nameInput.focus();
    });
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const visitorName = nameInput.value.trim();
    const selectedService = serviceSelect.value.trim() || 'General Enquiry';

    if (!visitorName) {
      nameInput.setAttribute('aria-invalid', 'true');
      if (nameError) nameError.textContent = 'Please enter your name.';
      nameInput.focus();
      return;
    }

    nameInput.removeAttribute('aria-invalid');
    if (nameError) nameError.textContent = '';

    const formattedMessage = `Hi! My name is ${visitorName} and I'm interested in ${selectedService}.`;
    const waUrl = buildWhatsAppUrl(formattedMessage);

    if (readyPreview) readyPreview.textContent = formattedMessage;
    if (directAnchor) directAnchor.href = waUrl;

    form.hidden = true;
    if (readyBox) readyBox.hidden = false;

    if (directAnchor) {
      directAnchor.click();
    }
  });
}

/**
 * 8. INTERACTIVE VANILLA JS FAQ ACCORDION + TOPIC FILTER
 */
function initFaqAccordion() {
  const triggers = document.querySelectorAll('.faq-trigger');
  const filterBtns = document.querySelectorAll('[data-faq-filter]');
  const faqItems = document.querySelectorAll('.faq-item[data-faq-topic]');

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const panelId = trigger.getAttribute('aria-controls');
      const panel = panelId ? document.getElementById(panelId) : null;

      triggers.forEach((otherTrigger) => {
        if (otherTrigger !== trigger) {
          otherTrigger.setAttribute('aria-expanded', 'false');
          const otherId = otherTrigger.getAttribute('aria-controls');
          const otherPanel = otherId ? document.getElementById(otherId) : null;
          if (otherPanel) otherPanel.classList.remove('is-open');
        }
      });

      trigger.setAttribute('aria-expanded', String(!isExpanded));
      if (panel) {
        panel.classList.toggle('is-open', !isExpanded);
      }
    });
  });

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const topic = btn.getAttribute('data-faq-filter') || 'all';
      filterBtns.forEach((other) => {
        const active = other === btn;
        other.classList.toggle('is-active', active);
        other.setAttribute('aria-selected', String(active));
      });

      let openedFirstVisible = false;
      faqItems.forEach((item) => {
        const match = topic === 'all' || item.getAttribute('data-faq-topic') === topic;
        item.hidden = !match;
        const trigger = item.querySelector('.faq-trigger');
        const panel = item.querySelector('.faq-panel');
        if (match && !openedFirstVisible && trigger && panel) {
          trigger.setAttribute('aria-expanded', 'true');
          panel.classList.add('is-open');
          openedFirstVisible = true;
        } else if (trigger && panel) {
          trigger.setAttribute('aria-expanded', 'false');
          panel.classList.remove('is-open');
        }
      });
    });
  });
}

/**
 * 9. CONTACT FORM VALIDATION & SUBMISSION
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const successPanel = document.getElementById('contact-success-panel');
  const resetBtn = document.getElementById('contact-reset-btn');
  const successNameEl = document.getElementById('contact-success-name');
  const successServiceEl = document.getElementById('contact-success-service');
  const successWaLink = document.getElementById('contact-success-wa-link');

  if (!form) return;

  const fields = {
    name: {
      input: document.getElementById('contact-name'),
      error: document.getElementById('contact-name-error'),
      validate: (val) => (val.trim().length >= 2 ? '' : 'Please enter your full name.'),
    },
    email: {
      input: document.getElementById('contact-email'),
      error: document.getElementById('contact-email-error'),
      validate: (val) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())
          ? ''
          : 'Please enter a valid work email address.',
    },
    service: {
      input: document.getElementById('contact-service'),
      error: document.getElementById('contact-service-error'),
      validate: (val) => (val.trim() ? '' : 'Please select a service.'),
    },
    message: {
      input: document.getElementById('contact-message'),
      error: document.getElementById('contact-message-error'),
      validate: (val) =>
        val.trim().length >= 10
          ? ''
          : 'Please share a brief note (at least 10 characters).',
    },
  };

  function validateField(fieldKey) {
    const field = fields[fieldKey];
    if (!field || !field.input) return true;
    const message = field.validate(field.input.value);
    if (message) {
      field.input.setAttribute('aria-invalid', 'true');
      if (field.error) field.error.textContent = message;
      return false;
    }
    field.input.removeAttribute('aria-invalid');
    if (field.error) field.error.textContent = '';
    return true;
  }

  Object.keys(fields).forEach((key) => {
    const input = fields[key].input;
    if (input) {
      input.addEventListener('blur', () => validateField(key));
      input.addEventListener('input', () => {
        if (input.getAttribute('aria-invalid') === 'true') {
          validateField(key);
        }
      });
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const keys = Object.keys(fields);
    let firstInvalid = null;

    keys.forEach((key) => {
      const ok = validateField(key);
      if (!ok && !firstInvalid && fields[key].input) {
        firstInvalid = fields[key].input;
      }
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    const nameVal = fields.name.input.value.trim();
    const emailVal = fields.email.input.value.trim();
    const serviceVal = fields.service.input.value.trim();
    const messageVal = fields.message.input.value.trim();

    if (successNameEl) successNameEl.textContent = nameVal;
    if (successServiceEl) successServiceEl.textContent = serviceVal;

    if (successWaLink) {
      const waText = `Hi! My name is ${nameVal} (${emailVal}) and I'm interested in ${serviceVal}. Project note: ${messageVal}`;
      successWaLink.href = buildWhatsAppUrl(waText);
    }

    form.hidden = true;
    if (successPanel) successPanel.hidden = false;
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      Object.keys(fields).forEach((key) => {
        if (fields[key].input) fields[key].input.removeAttribute('aria-invalid');
        if (fields[key].error) fields[key].error.textContent = '';
      });
      if (successPanel) successPanel.hidden = true;
      form.hidden = false;
    });
  }
}

/**
 * 10. LIGHTWEIGHT INTERSECTION OBSERVER FOR BENTO CARD ENTRANCE
 */
function initBentoRevealObserver() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const allCards = document.querySelectorAll('.bento-card');

  if (prefersReduced || !('IntersectionObserver' in window)) {
    allCards.forEach((card) => card.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      let batchIndex = 0;
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const card = entry.target;
        const delay = Math.min(batchIndex * 45, 180);
        card.style.setProperty('--reveal-delay', `${delay}ms`);
        requestAnimationFrame(() => {
          card.classList.add('is-visible');
        });
        batchIndex += 1;
        obs.unobserve(card);
      });
    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -24px 0px',
    }
  );

  function observeScope(scopeEl = document) {
    const cards = scopeEl.querySelectorAll('.bento-card');
    cards.forEach((card) => {
      card.classList.add('bento-reveal');
      const parentPage = card.closest('.page-view');
      if (parentPage && parentPage.hidden) return;
      if (!card.classList.contains('is-visible')) {
        observer.unobserve(card);
        observer.observe(card);
      }
    });
  }

  window.__observeBentoCards = observeScope;
  observeScope(document);
}

/**
 * 11. SUBTLE LOW-OPACITY HERO AMBIENT PARTICLES
 */
function initHeroParticles() {
  const canvas = document.getElementById('hero-particles-canvas');
  const homeSection = document.getElementById('page-home');
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const palette = [
    'rgba(100, 116, 139, 0.22)', // soft slate
    'rgba(22, 101, 52, 0.16)',   // muted botanical mint ink
    'rgba(126, 34, 206, 0.13)',  // soft lavender ink
    'rgba(180, 83, 9, 0.13)',    // warm sand ink
  ];

  let width = 0;
  let height = 0;
  let particles = [];
  let rafId = null;

  function createParticles(count) {
    const list = [];
    for (let i = 0; i < count; i += 1) {
      const speed = 0.12 + Math.random() * 0.16;
      const angle = Math.random() * Math.PI * 2;
      list.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: 1.5 + Math.random() * 1.8,
        color: palette[i % palette.length],
      });
    }
    return list;
  }

  function resize() {
    const parent = canvas.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const targetCount = width < 640 ? 16 : 28;
    if (particles.length !== targetCount) {
      particles = createParticles(targetCount);
    }
  }

  function drawFrame() {
    ctx.clearRect(0, 0, width, height);

    // Subtle proximity links
    const maxDist = 115;
    for (let i = 0; i < particles.length; i += 1) {
      const p1 = particles[i];
      for (let j = i + 1; j < particles.length; j += 1) {
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.hypot(dx, dy);
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.085;
          ctx.strokeStyle = `rgba(100, 116, 139, ${alpha.toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    // Soft floating particles
    particles.forEach((p) => {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function step() {
    const isHidden = document.hidden || (homeSection && homeSection.hidden);
    if (!isHidden) {
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -8) p.x = width + 8;
        if (p.x > width + 8) p.x = -8;
        if (p.y < -8) p.y = height + 8;
        if (p.y > height + 8) p.y = -8;
      });
      drawFrame();
    }
    rafId = requestAnimationFrame(step);
  }

  resize();
  drawFrame();

  if (prefersReduced) return;

  if ('ResizeObserver' in window && canvas.parentElement) {
    const ro = new ResizeObserver(() => {
      resize();
      drawFrame();
    });
    ro.observe(canvas.parentElement);
  } else {
    window.addEventListener('resize', resize, { passive: true });
  }

  if (rafId === null) {
    rafId = requestAnimationFrame(step);
  }
}

/**
 * 12. BOOTSTRAP APPLICATION ON DOM READY
 */
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  initScrollProgress();
  initHeroParticles();
  initBentoRevealObserver();
  const applyEstimatorPreset = initEstimatorDashboard();
  initHeroBenchmark(applyEstimatorPreset);
  initNavigation();
  initSprintExplorer();
  initServicesFilter();
  initCaseStudyComparison();
  initWhatsAppWidget();
  initFaqAccordion();
  initContactForm();
});

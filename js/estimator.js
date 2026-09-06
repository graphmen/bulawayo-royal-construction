/**
 * BULAWAYO ROYAL CONSTRUCTION
 * Interactive Project Scope & Estimator Widget
 * Connects directly to WhatsApp: +263 77 299 0134
 */

document.addEventListener('DOMContentLoaded', () => {
  const estimatorForm = document.getElementById('project-estimator-form');
  if (!estimatorForm) return;

  // State
  const state = {
    projectType: 'residential-house',
    projectTypeName: 'Residential Main House (3-4 Bed)',
    location: 'Mahatshula',
    finishes: 'standard-luxury',
    addons: {
      plans: true,
      foundation: true,
      brickwork: true,
      roofing: true,
      plumbing: true,
      electrical: true
    }
  };

  // DOM Elements
  const typeButtons = document.querySelectorAll('.calc-type-btn');
  const locationSelect = document.getElementById('calc-location');
  const finishButtons = document.querySelectorAll('.calc-finish-btn');
  const addonCheckboxes = document.querySelectorAll('.calc-addon-check');

  const outProject = document.getElementById('est-out-project');
  const outLocation = document.getElementById('est-out-location');
  const outTrades = document.getElementById('est-out-trades');
  const outTimeline = document.getElementById('est-out-timeline');
  const outMilestones = document.getElementById('est-out-milestones');
  const whatsappBtn = document.getElementById('est-whatsapp-btn');

  // Timelines and Trade Names
  const projectConfig = {
    'residential-house': {
      name: 'Residential Main House (3-4 Bed)',
      timeline: '12 – 16 Weeks',
      milestones: '5 Verified Milestones (Plan → Slab → Brickwork → Roof → Finishes)'
    },
    'cottage': {
      name: 'Modern Cottage / Flatlet (1-2 Bed)',
      timeline: '6 – 8 Weeks',
      milestones: '4 Verified Milestones (Foundation → Superstructure → Roof → Handover)'
    },
    'roofing': {
      name: 'Roofing Supply & Installation',
      timeline: '2 – 3 Weeks',
      milestones: '2 Verified Milestones (Truss Assembly → Tiling/IBR & Waterproofing)'
    },
    'renovation': {
      name: 'Full Home Renovation / Extension',
      timeline: '4 – 8 Weeks',
      milestones: '3 Verified Milestones (Demolition/Prep → Structural Alteration → Finishes)'
    },
    'commercial': {
      name: 'Commercial / Institutional Build',
      timeline: '16 – 24 Weeks',
      milestones: 'Turnkey Phased Milestones with Full Council Compliance'
    },
    'drafting': {
      name: 'Architectural Plans & Council Permit',
      timeline: '10 – 14 Days',
      milestones: '3D Concept Design → Detailed Drawings → Council Submission'
    }
  };

  const tradeLabels = {
    plans: 'Plans & Permits',
    foundation: 'Foundation & Slab',
    brickwork: 'Brickwork & Plaster',
    roofing: 'Roofing & Guttering',
    plumbing: 'Plumbing & Drainage',
    electrical: 'Electrical & Solar'
  };

  // Event Listeners for Type buttons
  typeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      typeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.projectType = btn.dataset.type;
      state.projectTypeName = projectConfig[state.projectType]?.name || btn.textContent.trim();
      updateEstimator();
    });
  });

  // Location select
  if (locationSelect) {
    locationSelect.addEventListener('change', (e) => {
      state.location = e.target.value;
      updateEstimator();
    });
  }

  // Finish type buttons
  finishButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      finishButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.finishes = btn.dataset.finish;
      updateEstimator();
    });
  });

  // Checkboxes
  addonCheckboxes.forEach(cb => {
    cb.addEventListener('change', (e) => {
      const key = e.target.name;
      state.addons[key] = e.target.checked;
      updateEstimator();
    });
  });

  // Update Output Function
  function updateEstimator() {
    const config = projectConfig[state.projectType] || projectConfig['residential-house'];

    // Active trades
    const activeTrades = Object.keys(state.addons)
      .filter(key => state.addons[key])
      .map(key => tradeLabels[key]);

    if (outProject) outProject.textContent = state.projectTypeName;
    if (outLocation) outLocation.textContent = state.location + ', Bulawayo';
    if (outTrades) outTrades.textContent = activeTrades.length > 0 ? `${activeTrades.length} Trades Selected` : 'Consultation Only';
    if (outTimeline) outTimeline.textContent = config.timeline;
    if (outMilestones) outMilestones.textContent = config.milestones;

    // Generate WhatsApp Link
    const textMsg = `Hello Bulawayo Royal Construction! 🏛️\n\nI would like to request an official quotation & site assessment.\n\n*PROJECT DETAILS:*\n• *Type:* ${state.projectTypeName}\n• *Location:* ${state.location}, Bulawayo\n• *Estimated Duration:* ${config.timeline}\n• *Selected Scope:* ${activeTrades.join(', ')}\n\n_Motto: Do it right the first time and have peace of mind._\n\nPlease let me know the next steps for a detailed Bill of Quantities (BOQ). Thank you!`;

    const encodedMsg = encodeURIComponent(textMsg);
    const whatsappUrl = `https://wa.me/263772990134?text=${encodedMsg}`;

    if (whatsappBtn) {
      whatsappBtn.href = whatsappUrl;
      whatsappBtn.target = '_blank';
    }
  }

  // Initial Run
  updateEstimator();
});

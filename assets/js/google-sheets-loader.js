// Google Sheets CSV Loader
// Fetches data from Google Sheets published as CSV and renders as HTML tables

function parseCSV(text) {
  const lines = text.split('\n');
  const result = [];

  for (let line of lines) {
    if (line.trim() === '') continue;

    const row = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const nextChar = line[i + 1];

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        row.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    row.push(current.trim());
    result.push(row);
  }

  return result;
}

function createTableFromCSV(data, containerId, filterable = false, ignoreColumns = []) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error('Container not found:', containerId);
    return;
  }

  if (data.length === 0) {
    container.innerHTML = '<p>No data available</p>';
    return;
  }

  // Determine which columns to show
  const columnsToShow = [];
  const columnMapping = []; // Maps displayed column index to original column index
  for (let i = 0; i < data[0].length; i++) {
    const columnName = data[0][i].toLowerCase().trim();
    const shouldIgnore = ignoreColumns.some(ignore => columnName.includes(ignore.toLowerCase()));
    if (!shouldIgnore) {
      columnsToShow.push(i);
      columnMapping.push(i);
    }
  }

  let html = '';

  // Add search/filter inputs if filterable
  if (filterable) {
    html += '<div class="table-controls">';
    html += '<input type="text" id="' + containerId + '-search" class="table-search" placeholder="Search all columns...">';
    html += '</div>';
  }

  html += '<table class="google-sheets-table" id="' + containerId + '-table">';

  // Header row
  html += '<thead><tr>';
  for (let i = 0; i < columnsToShow.length; i++) {
    const colIndex = columnsToShow[i];
    html += `<th>${data[0][colIndex]}`;
    if (filterable) {
      html += `<br><input type="text" class="column-filter" data-column="${i}" placeholder="Filter...">`;
    }
    html += '</th>';
  }
  html += '</tr></thead>';

  // Data rows
  html += '<tbody>';
  for (let i = 1; i < data.length; i++) {
    html += '<tr>';
    for (let colIndex of columnsToShow) {
      html += `<td>${data[i][colIndex] || ''}</td>`;
    }
    html += '</tr>';
  }
  html += '</tbody></table>';

  container.innerHTML = html;

  // Add filter functionality if filterable
  if (filterable) {
    setupTableFilters(containerId);
  }
}

function setupTableFilters(containerId) {
  const searchInput = document.getElementById(containerId + '-search');
  const table = document.getElementById(containerId + '-table');
  const columnFilters = table.querySelectorAll('.column-filter');

  // Global search
  if (searchInput) {
    searchInput.addEventListener('keyup', function() {
      filterTable();
    });
  }

  // Column-specific filters
  columnFilters.forEach(function(filter) {
    filter.addEventListener('keyup', function() {
      filterTable();
    });
  });

  function filterTable() {
    const globalSearch = searchInput ? searchInput.value.toLowerCase() : '';
    const columnSearches = {};

    columnFilters.forEach(function(filter) {
      const column = filter.getAttribute('data-column');
      columnSearches[column] = filter.value.toLowerCase();
    });

    const rows = table.querySelectorAll('tbody tr');

    rows.forEach(function(row) {
      let showRow = true;
      const cells = row.querySelectorAll('td');

      // Check global search
      if (globalSearch) {
        let found = false;
        cells.forEach(function(cell) {
          if (cell.textContent.toLowerCase().includes(globalSearch)) {
            found = true;
          }
        });
        if (!found) showRow = false;
      }

      // Check column-specific filters
      if (showRow) {
        for (let column in columnSearches) {
          const searchTerm = columnSearches[column];
          if (searchTerm && cells[column]) {
            if (!cells[column].textContent.toLowerCase().includes(searchTerm)) {
              showRow = false;
              break;
            }
          }
        }
      }

      row.style.display = showRow ? '' : 'none';
    });
  }
}

function loadGoogleSheet(csvUrl, containerId, filterable = false, ignoreColumns = []) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error('Container not found:', containerId);
    return;
  }

  container.innerHTML = '<p>Loading data...</p>';

  fetch(csvUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.text();
    })
    .then(text => {
      const data = parseCSV(text);
      createTableFromCSV(data, containerId, filterable, ignoreColumns);
    })
    .catch(error => {
      console.error('Error loading Google Sheet:', error);
      container.innerHTML = '<p class="error">Failed to load data. Please try again later.</p>';
    });
}

function loadInventoryCollection(inventoryUrl, valuationUrl, containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error('Container not found:', containerId);
    return;
  }

  container.innerHTML = '<p>Loading collection data...</p>';

  // Fetch both inventory and valuation data
  Promise.all([
    fetch(inventoryUrl).then(r => r.text()),
    fetch(valuationUrl).then(r => r.text())
  ])
    .then(([inventoryText, valuationText]) => {
      const inventoryData = parseCSV(inventoryText);
      const valuationData = parseCSV(valuationText);
      createCollectionSections(inventoryData, valuationData, containerId);
    })
    .catch(error => {
      console.error('Error loading collection data:', error);
      container.innerHTML = '<p class="error">Failed to load collection data. Please try again later.</p>';
    });
}

function parseCurrency(value) {
  if (!value) return 0;
  // Remove currency symbols, commas, and whitespace, then parse
  const cleaned = value.toString().replace(/[$,\s]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

function getSetImage(setName) {
  // Get base path from current URL
  const basePath = window.location.pathname.split('/')[1];
  const baseUrl = basePath ? `/${basePath}` : '';

  const imageMap = {
    'Avatar': `${baseUrl}/assets/images/themes/avatar.jpg`,
    'Final Fantasy': `${baseUrl}/assets/images/themes/final-fantasy.jpg`,
    'Spiderman': `${baseUrl}/assets/images/themes/spiderman.jpg`,
    'Tarkir': `${baseUrl}/assets/images/themes/tarkir.jpg`,
    'Duskmourn': `${baseUrl}/assets/images/themes/duskmourn.jpg`,
    'DuskMourn': `${baseUrl}/assets/images/themes/duskmourn.jpg`,
    'Outlaws of TJ': `${baseUrl}/assets/images/themes/outlaws-of-tj.jpg`,
    'Bloomburrow': `${baseUrl}/assets/images/themes/bloomburrow.jpg`,
    'Edge of Eternities': `${baseUrl}/assets/images/themes/edge-of-eternities.jpg`,
    'Sonic': `${baseUrl}/assets/images/themes/sonic.jpg`
  };

  return imageMap[setName] || 'https://via.placeholder.com/400x250/667eea/ffffff?text=' + encodeURIComponent(setName);
}

function getSetUrl(setName) {
  // Get base path from current URL
  const basePath = window.location.pathname.split('/')[1];
  const baseUrl = basePath ? `/${basePath}` : '';

  // Map set names to their post URLs
  const urlMap = {
    'Avatar': `${baseUrl}/collection/avatar/`,
    'Final Fantasy': `${baseUrl}/collection/final-fantasy/`,
    'Spiderman': `${baseUrl}/collection/spiderman/`,
    'Tarkir': `${baseUrl}/collection/tarkir/`,
    'Duskmourn': `${baseUrl}/collection/duskmourn/`,
    'DuskMourn': `${baseUrl}/collection/duskmourn/`,
    'Outlaws of TJ': `${baseUrl}/collection/outlaws-of-tj/`,
    'Bloomburrow': `${baseUrl}/collection/bloomburrow/`,
    'Edge of Eternities': `${baseUrl}/collection/edge-of-eternities/`,
    'Sonic': `${baseUrl}/collection/sonic/`
  };

  return urlMap[setName] || `${baseUrl}/collection/set/?set=${encodeURIComponent(setName)}`;
}

function createCollectionSections(inventoryData, valuationData, containerId) {
  const container = document.getElementById(containerId);
  if (!container || inventoryData.length === 0) {
    container.innerHTML = '<p>No collection data available</p>';
    return;
  }

  // Parse inventory headers
  const invHeaders = inventoryData[0];
  const invSetIndex = invHeaders.findIndex(h => h.toLowerCase().includes('set'));
  const totalInvIndex = invHeaders.findIndex(h => h.toLowerCase().includes('total investment'));

  // Parse valuation headers
  const valHeaders = valuationData[0];
  const valSetIndex = valHeaders.findIndex(h => h.toLowerCase().includes('set'));
  const valValueIndex = valHeaders.findIndex(h => h.toLowerCase().includes('set value'));
  const valDateIndex = valHeaders.findIndex(h => h.toLowerCase().includes('date last checked'));

  // Calculate cost basis by set from inventory
  const costBasisBySet = {};
  const setNameMapping = {}; // Maps normalized name to display name
  for (let i = 1; i < inventoryData.length; i++) {
    const setName = inventoryData[i][invSetIndex] || 'Other';
    const normalizedName = setName.toLowerCase().trim();

    if (!costBasisBySet[normalizedName]) {
      costBasisBySet[normalizedName] = 0;
      setNameMapping[normalizedName] = setName; // Store original name for display
    }
    costBasisBySet[normalizedName] += parseCurrency(inventoryData[i][totalInvIndex]);
  }

  // Get valuation data by set (normalize names for matching)
  const valuationBySet = {};
  for (let i = 1; i < valuationData.length; i++) {
    const setName = valuationData[i][valSetIndex];
    if (setName) {
      const normalizedName = setName.toLowerCase().trim();
      valuationBySet[normalizedName] = {
        value: valuationData[i][valValueIndex],
        date: valuationData[i][valDateIndex]
      };
    }
  }

  // Merge data and create cards
  let html = '<div class="collection-grid">';

  for (const normalizedName in costBasisBySet) {
    const setName = setNameMapping[normalizedName]; // Use original display name
    const costBasis = costBasisBySet[normalizedName];
    const valuation = valuationBySet[normalizedName];
    const currentValue = valuation ? parseCurrency(valuation.value) : 0;
    const lastChecked = valuation ? valuation.date : 'N/A';
    const imageUrl = getSetImage(setName);
    const setUrl = getSetUrl(setName);

    html += `
      <div class="set-card">
        <div class="set-card-image" style="background-image: url('${imageUrl}');"></div>
        <div class="set-card-content">
          <h3 class="set-card-title">${setName}</h3>
          <div class="set-card-stats">
            <div class="stat-item">
              <span class="stat-label">Cost Basis</span>
              <span class="stat-value">$${costBasis.toFixed(2)}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Current Value</span>
              <span class="stat-value">$${currentValue.toFixed(2)}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Last Checked</span>
              <span class="stat-value stat-date">${lastChecked}</span>
            </div>
          </div>
          <a href="${setUrl}" class="set-card-link">View Details →</a>
        </div>
      </div>
    `;
  }

  html += '</div>';
  container.innerHTML = html;
}

function createSetDetail(data, containerId, setName) {
  const container = document.getElementById(containerId);
  if (!container || data.length === 0) {
    container.innerHTML = '<p>No inventory data available</p>';
    return;
  }

  // Parse headers
  const headers = data[0];
  const setIndex = headers.findIndex(h => h.toLowerCase().includes('set'));
  const skuIndex = headers.findIndex(h => h.toLowerCase().includes('sku'));
  const descIndex = headers.findIndex(h => h.toLowerCase().includes('description'));
  const qtyIndex = headers.findIndex(h => h.toLowerCase().includes('total quantity'));
  const avgPriceIndex = headers.findIndex(h => h.toLowerCase().includes('average price'));
  const totalInvIndex = headers.findIndex(h => h.toLowerCase().includes('total investment'));

  // Filter items for this set
  const setItems = [];
  for (let i = 1; i < data.length; i++) {
    if (data[i][setIndex] === setName) {
      setItems.push(data[i]);
    }
  }

  if (setItems.length === 0) {
    container.innerHTML = '<p>No items found for this set.</p>';
    return;
  }

  const totalQty = setItems.reduce((sum, item) => sum + parseCurrency(item[qtyIndex]), 0);
  const totalInv = setItems.reduce((sum, item) => sum + parseCurrency(item[totalInvIndex]), 0);

  let html = `
    <div class="set-header">
      <h1>${setName}</h1>
      <div class="set-summary">
        <span class="set-stat"><strong>Total Items:</strong> ${setItems.length}</span>
        <span class="set-stat"><strong>Total Quantity:</strong> ${totalQty}</span>
        <span class="set-stat"><strong>Total Cost Basis:</strong> $${totalInv.toFixed(2)}</span>
      </div>
    </div>
    <table class="google-sheets-table inventory-table">
      <thead>
        <tr>
          <th>SKU</th>
          <th>Description</th>
          <th>Quantity</th>
          <th>Avg Price</th>
          <th>Total Cost Basis</th>
        </tr>
      </thead>
      <tbody>
  `;

  for (const item of setItems) {
    const avgPrice = parseCurrency(item[avgPriceIndex]);
    const totalInvestment = parseCurrency(item[totalInvIndex]);

    html += `
      <tr>
        <td>${item[skuIndex] || ''}</td>
        <td>${item[descIndex] || ''}</td>
        <td>${item[qtyIndex] || ''}</td>
        <td>$${avgPrice.toFixed(2)}</td>
        <td>$${totalInvestment.toFixed(2)}</td>
      </tr>
    `;
  }

  html += `
      </tbody>
    </table>
  `;

  container.innerHTML = html;
}

function loadSetDetail(csvUrl, containerId, setName) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error('Container not found:', containerId);
    return;
  }

  container.innerHTML = '<p>Loading set details...</p>';

  fetch(csvUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.text();
    })
    .then(text => {
      const data = parseCSV(text);
      createSetDetail(data, containerId, setName);
    })
    .catch(error => {
      console.error('Error loading set details:', error);
      container.innerHTML = '<p class="error">Failed to load set details. Please try again later.</p>';
    });
}

// Auto-load tables when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Cash Flow Analysis
  const cashFlowContainer = document.getElementById('cash-flow-table');
  if (cashFlowContainer) {
    const cashFlowUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSDzdI6gHwHwAi8mFDSoPfvlN3-q5mCKtZMPqqPFbvAa6xTaaH_BNSQFC2LfGdrVgWphxUECB-WiTlf/pub?gid=0&single=true&output=csv';
    loadGoogleSheet(cashFlowUrl, 'cash-flow-table');
  }

  // IRR
  const irrContainer = document.getElementById('irr-table');
  if (irrContainer) {
    const irrUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSDzdI6gHwHwAi8mFDSoPfvlN3-q5mCKtZMPqqPFbvAa6xTaaH_BNSQFC2LfGdrVgWphxUECB-WiTlf/pub?gid=963482682&single=true&output=csv';
    loadGoogleSheet(irrUrl, 'irr-table');
  }

  // Purchases
  const purchasesContainer = document.getElementById('purchases-table');
  if (purchasesContainer) {
    const purchasesUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTvAt4xT_bG0Ub84pwrMr8BAcDVath2GLkM7lOqp898fGT2OIFEBnpOVVJjbKMeISsHxvJzyFZ8v1Ua/pub?output=csv';
    const ignoreColumns = ['Description', 'Broken down unit', 'Price per broken down unit', 'Purchase ID'];
    loadGoogleSheet(purchasesUrl, 'purchases-table', true, ignoreColumns);
  }

  // Sales
  const salesContainer = document.getElementById('sales-table');
  if (salesContainer) {
    const salesUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTH0mfbj-uMMBP8uiuVGzOHj68KxySaDvsibcv4ZMrA9RPU01maYJYAl7A0V7pMPzhN7Q5ouAwsqEyJ/pub?output=csv';
    loadGoogleSheet(salesUrl, 'sales-table', true);
  }

  // Collection Inventory
  const collectionContainer = document.getElementById('collection-inventory');
  if (collectionContainer) {
    const inventoryUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS2yD_VKI9TKoUA2KrqMmobea7kcvxTkb4pnxrIJHKvziE6A4KF9A9uVg7j8z0H3sA3SkfnyOJMRgy0/pub?output=csv';
    const valuationUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRGUZLTJfUPb7CPEdbH-KmNQYcuH7B5-Dlt866SHJnn_Vry6aNjqd_lR_ZL84i911Hnuk25PXNUo0_v/pub?output=csv';
    loadInventoryCollection(inventoryUrl, valuationUrl, 'collection-inventory');
  }

  // Set Detail Page
  const setDetailContainer = document.getElementById('set-detail');
  if (setDetailContainer) {
    const urlParams = new URLSearchParams(window.location.search);
    const setName = urlParams.get('set');
    if (setName) {
      const inventoryUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS2yD_VKI9TKoUA2KrqMmobea7kcvxTkb4pnxrIJHKvziE6A4KF9A9uVg7j8z0H3sA3SkfnyOJMRgy0/pub?output=csv';
      loadSetDetail(inventoryUrl, 'set-detail', setName);
    } else {
      setDetailContainer.innerHTML = '<p class="error">No set specified. Please select a set from the <a href="/collection/">collection page</a>.</p>';
    }
  }
});

---
title: "Final Fantasy"
layout: single
permalink: /collection/final-fantasy/
author_profile: false
classes: wide
categories: collection
---

<script src="{{ '/assets/js/google-sheets-loader.js' | relative_url }}"></script>
<style>
  .google-sheets-table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 14px;
    box-shadow: 0 2px 3px rgba(0,0,0,0.1);
  }
  .google-sheets-table thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
  }
  .google-sheets-table th,
  .google-sheets-table td {
    padding: 12px 15px;
    border: 1px solid #ddd;
  }
  .google-sheets-table tbody tr {
    border-bottom: 1px solid #dddddd;
  }
  .google-sheets-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }
  .google-sheets-table tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
  }
  .google-sheets-table tbody tr:hover {
    background-color: #f1f1f1;
  }
  .sheets-link {
    display: inline-block;
    margin: 10px 0 20px 0;
    padding: 8px 16px;
    background-color: #0066cc;
    color: white;
    text-decoration: none;
    border-radius: 4px;
  }
  .sheets-link:hover {
    background-color: #0052a3;
    color: white;
  }
  .back-link {
    display: inline-block;
    margin: 10px 20px 20px 0;
    padding: 8px 16px;
    background-color: #666;
    color: white;
    text-decoration: none;
    border-radius: 4px;
  }
  .back-link:hover {
    background-color: #444;
    color: white;
  }
  .set-header {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 30px;
  }
  .set-summary {
    display: flex;
    gap: 30px;
    margin-top: 15px;
    flex-wrap: wrap;
  }
  .set-stat {
    font-size: 18px;
  }
  .inventory-table {
    background-color: white;
  }
  .collection-overview {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 30px;
    border-radius: 12px;
    margin: 20px 0;
    color: white;
  }
  .overview-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    border-bottom: 2px solid rgba(255,255,255,0.3);
    padding-bottom: 10px;
  }
  .overview-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }
  .overview-stat {
    text-align: center;
    padding: 15px;
    background-color: rgba(255,255,255,0.1);
    border-radius: 8px;
  }
  .overview-label {
    font-size: 14px;
    opacity: 0.9;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .overview-value {
    font-size: 28px;
    font-weight: bold;
  }
  .gain-positive {
    color: #4ade80;
  }
  .gain-negative {
    color: #f87171;
  }
  .set-hero-image {
    width: 100%;
    max-height: 400px;
    object-fit: cover;
    border-radius: 12px;
    margin: 20px 0;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
</style>

<a href="{{ '/collection/' | relative_url }}" class="back-link">← Back to All Collections</a>

<div style="margin-bottom: 20px;">
  <a href="https://app.getcollectr.com/showcase/profile/be47c36e-c7ad-4dc2-8192-29739ac66463?collection=7cbdcbec-b0a1-43e0-bced-5d0760a4a5c2" target="_blank" class="sheets-link" style="background-color: #8b5cf6; margin-right: 10px;">View Final Fantasy on Collectr</a>
  <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vS2yD_VKI9TKoUA2KrqMmobea7kcvxTkb4pnxrIJHKvziE6A4KF9A9uVg7j8z0H3sA3SkfnyOJMRgy0/pubhtml" target="_blank" class="sheets-link">View Full Inventory in Google Sheets</a>
</div>

<img src="{{ '/assets/images/themes/final-fantasy.jpg' | relative_url }}" alt="Final Fantasy Collection" class="set-hero-image">

<div id="collection-overview-final-fantasy">
  <p>Loading collection overview...</p>
</div>

<div id="set-detail-final-fantasy">
  <p>Loading inventory details...</p>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const inventoryUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS2yD_VKI9TKoUA2KrqMmobea7kcvxTkb4pnxrIJHKvziE6A4KF9A9uVg7j8z0H3sA3SkfnyOJMRgy0/pub?output=csv';
    const valuationUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRGUZLTJfUPb7CPEdbH-KmNQYcuH7B5-Dlt866SHJnn_Vry6aNjqd_lR_ZL84i911Hnuk25PXNUo0_v/pub?output=csv';

    // Load overview stats
    const overviewContainer = document.getElementById('collection-overview-final-fantasy');
    if (overviewContainer) {
      Promise.all([
        fetch(inventoryUrl).then(r => r.text()),
        fetch(valuationUrl).then(r => r.text())
      ]).then(([invText, valText]) => {
        const invData = parseCSV(invText);
        const valData = parseCSV(valText);

        // Calculate cost basis
        const invHeaders = invData[0];
        const invSetIndex = invHeaders.findIndex(h => h.toLowerCase().includes('set'));
        const totalInvIndex = invHeaders.findIndex(h => h.toLowerCase().includes('total investment'));

        let costBasis = 0;
        for (let i = 1; i < invData.length; i++) {
          if (invData[i][invSetIndex] === 'Final Fantasy') {
            costBasis += parseCurrency(invData[i][totalInvIndex]);
          }
        }

        // Get current value
        const valHeaders = valData[0];
        const valSetIndex = valHeaders.findIndex(h => h.toLowerCase().includes('set'));
        const valValueIndex = valHeaders.findIndex(h => h.toLowerCase().includes('set value'));

        let currentValue = 0;
        for (let i = 1; i < valData.length; i++) {
          if (valData[i][valSetIndex] === 'Final Fantasy') {
            currentValue = parseCurrency(valData[i][valValueIndex]);
            break;
          }
        }

        // Calculate gain
        const gain = currentValue - costBasis;
        const gainPercent = costBasis > 0 ? (gain / costBasis * 100) : 0;
        const gainClass = gain >= 0 ? 'gain-positive' : 'gain-negative';
        const gainSign = gain >= 0 ? '+' : '';

        overviewContainer.innerHTML = `
          <div class="collection-overview">
            <div class="overview-title">Final Fantasy Collection Overview</div>
            <div class="overview-stats">
              <div class="overview-stat">
                <div class="overview-label">Total Cost Basis</div>
                <div class="overview-value">$${costBasis.toFixed(2)}</div>
              </div>
              <div class="overview-stat">
                <div class="overview-label">Current Value</div>
                <div class="overview-value">$${currentValue.toFixed(2)}</div>
              </div>
              <div class="overview-stat">
                <div class="overview-label">Total Gain</div>
                <div class="overview-value ${gainClass}">${gainSign}$${Math.abs(gain).toFixed(2)}</div>
              </div>
              <div class="overview-stat">
                <div class="overview-label">Percentage Gain</div>
                <div class="overview-value ${gainClass}">${gainSign}${gainPercent.toFixed(2)}%</div>
              </div>
            </div>
          </div>
        `;
      }).catch(error => {
        console.error('Error loading overview:', error);
        overviewContainer.innerHTML = '<p class="error">Failed to load overview data.</p>';
      });
    }

    // Load inventory detail table
    const detailContainer = document.getElementById('set-detail-final-fantasy');
    if (detailContainer) {
      loadSetDetail(inventoryUrl, 'set-detail-final-fantasy', 'Final Fantasy');
    }
  });
</script>

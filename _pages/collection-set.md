---
title: "Set Details"
layout: single
permalink: /collection/set/
author_profile: false
classes: wide
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
</style>

<a href="{{ '/collection/' | relative_url }}" class="back-link">← Back to All Collections</a>
<a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vS2yD_VKI9TKoUA2KrqMmobea7kcvxTkb4pnxrIJHKvziE6A4KF9A9uVg7j8z0H3sA3SkfnyOJMRgy0/pubhtml" target="_blank" class="sheets-link">View Full Inventory in Google Sheets</a>

<div id="set-detail">
  <p>Loading set details...</p>
</div>

<script>
  // Get set name from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const setName = urlParams.get('set');

  if (setName) {
    document.title = setName + ' - Set Details';
  }
</script>

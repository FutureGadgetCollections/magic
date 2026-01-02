---
title: "Collection Inventory"
layout: single
permalink: /collection/
author_profile: false
classes: wide
---

<script src="{{ '/assets/js/google-sheets-loader.js' | relative_url }}"></script>
<style>
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
  .collection-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 30px;
    margin-top: 30px;
  }
  .set-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .set-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0,0,0,0.2);
  }
  .set-card-image {
    width: 100%;
    height: 200px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
  }
  .set-card-content {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 25px;
    color: white;
  }
  .set-card-title {
    font-size: 24px;
    font-weight: bold;
    margin: 0 0 20px 0;
    color: white;
    border-bottom: 2px solid rgba(255,255,255,0.3);
    padding-bottom: 10px;
  }
  .set-card-stats {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    gap: 15px;
  }
  .stat-item {
    text-align: center;
    flex: 1;
  }
  .stat-label {
    display: block;
    font-size: 12px;
    opacity: 0.9;
    margin-bottom: 5px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .stat-value {
    display: block;
    font-size: 20px;
    font-weight: bold;
  }
  .stat-date {
    font-size: 14px;
    font-weight: normal;
  }
  .set-card-link {
    display: inline-block;
    padding: 10px 20px;
    background-color: rgba(255,255,255,0.2);
    color: white;
    text-decoration: none;
    border-radius: 6px;
    border: 2px solid rgba(255,255,255,0.3);
    transition: background-color 0.3s ease;
    font-weight: 600;
  }
  .set-card-link:hover {
    background-color: rgba(255,255,255,0.3);
    color: white;
  }
</style>

Welcome to the collection inventory! View all sets and their current inventory status.

<div style="margin-bottom: 20px;">
  <a href="https://app.getcollectr.com/showcase/profile/be47c36e-c7ad-4dc2-8192-29739ac66463" target="_blank" class="sheets-link" style="background-color: #8b5cf6; margin-right: 10px;">View on Collectr</a>
  <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vS2yD_VKI9TKoUA2KrqMmobea7kcvxTkb4pnxrIJHKvziE6A4KF9A9uVg7j8z0H3sA3SkfnyOJMRgy0/pubhtml" target="_blank" class="sheets-link">View Full Inventory in Google Sheets</a>
</div>

<div id="collection-inventory">
  <p>Loading inventory data...</p>
</div>

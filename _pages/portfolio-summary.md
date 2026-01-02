---
permalink: /portfolio-summary/
title: "Portfolio Summary"
layout: archive
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
    margin: 10px 0;
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
  .error {
    color: #d8000c;
    background-color: #ffd2d2;
    padding: 10px;
    border-radius: 4px;
  }
</style>

This section showcases portfolio summary entries and analysis.

## Cash Flow Analysis

<a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vSDzdI6gHwHwAi8mFDSoPfvlN3-q5mCKtZMPqqPFbvAa6xTaaH_BNSQFC2LfGdrVgWphxUECB-WiTlf/pubhtml?gid=0&single=true" target="_blank" class="sheets-link">View in Google Sheets</a>

<div id="cash-flow-table">
  <p>Loading cash flow data...</p>
</div>

## IRR

<a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vSDzdI6gHwHwAi8mFDSoPfvlN3-q5mCKtZMPqqPFbvAa6xTaaH_BNSQFC2LfGdrVgWphxUECB-WiTlf/pubhtml?gid=963482682&single=true" target="_blank" class="sheets-link">View in Google Sheets</a>

<div id="irr-table">
  <p>Loading IRR data...</p>
</div>

## Portfolio Entries

{% assign portfolio_posts = site.categories.portfolio-summary %}
{% if portfolio_posts.size > 0 %}
  {% for post in portfolio_posts reversed %}
    {% include archive-single.html %}
  {% endfor %}
{% else %}
  *No portfolio summary entries yet.*
{% endif %}

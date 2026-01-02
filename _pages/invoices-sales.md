---
title: "Sales"
layout: archive
permalink: /invoices/sales/
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
  .table-controls {
    margin: 20px 0 10px 0;
  }
  .table-search {
    width: 100%;
    max-width: 400px;
    padding: 10px;
    font-size: 14px;
    border: 2px solid #009879;
    border-radius: 4px;
    margin-bottom: 10px;
  }
  .table-search:focus {
    outline: none;
    border-color: #007a63;
  }
  .column-filter {
    width: 100%;
    padding: 5px;
    font-size: 12px;
    border: 1px solid #ddd;
    border-radius: 3px;
    margin-top: 5px;
    background-color: #f9f9f9;
  }
  .column-filter:focus {
    outline: none;
    border-color: #009879;
    background-color: white;
  }
</style>

All sale transactions for the collection.

<a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vTH0mfbj-uMMBP8uiuVGzOHj68KxySaDvsibcv4ZMrA9RPU01maYJYAl7A0V7pMPzhN7Q5ouAwsqEyJ/pubhtml" target="_blank" class="sheets-link">View in Google Sheets</a>

<div id="sales-table">
  <p>Loading sales data...</p>
</div>

---
title: "Final Fantasy"
layout: archive
permalink: /collection/final-fantasy/
taxonomy: final-fantasy
author_profile: false
---

All posts about Final Fantasy magic cards and sets.

{% assign final_fantasy_posts = site.categories.final-fantasy %}
{% for post in final_fantasy_posts %}
  {% include archive-single.html %}
{% endfor %}

{% if final_fantasy_posts.size == 0 %}
*No Final Fantasy posts yet.*
{% endif %}

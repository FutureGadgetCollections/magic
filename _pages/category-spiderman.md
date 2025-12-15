---
title: "Spider-Man"
layout: archive
permalink: /collection/spiderman/
taxonomy: spiderman
author_profile: false
---

All posts about Spider-Man magic cards and sets.

{% assign spiderman_posts = site.categories.spiderman %}
{% for post in spiderman_posts %}
  {% include archive-single.html %}
{% endfor %}

{% if spiderman_posts.size == 0 %}
*No Spider-Man posts yet.*
{% endif %}

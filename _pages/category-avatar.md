---
title: "Avatar: The Last Airbender"
layout: archive
permalink: /collection/avatar/
taxonomy: avatar
author_profile: false
---

All posts about Avatar: The Last Airbender magic cards and sets.

{% assign avatar_posts = site.categories.avatar %}
{% for post in avatar_posts %}
  {% include archive-single.html %}
{% endfor %}

{% if avatar_posts.size == 0 %}
*No Avatar posts yet.*
{% endif %}

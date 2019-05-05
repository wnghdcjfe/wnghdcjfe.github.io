---
layout: page
title: Tags
permalink: /tags/
sitemap:
  priority: 0.7
---

## 태그

{% for tag in site.tags %}
* [{{tag.title}} / {{ tag.name }}]({{ site.baseurl }}/tags/{{ tag.name }})
{% endfor %}

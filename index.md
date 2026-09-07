---
permalink: /
description: Zachary Scott-Murphy — working notes on computer vision, machine learning, and the mathematics underneath them.
---

<section class="intro" markdown="1">

<p class="eyebrow">Berkeley, California</p>

# Working notes on what *thoughts* I think I understand.

I'm a CS master's student at Georgia Tech (OMSCS) with an undergraduate background in applied physics from UC Santa Cruz. My interests sit at the intersection of computer vision, machine learning, and geometric deep learning — I'm especially drawn to problems where mathematical structure (symmetry, geometry, physics) constrains and informs learned representations. In my past life I used to do 3D modelling. I also love reading classics, philosophy, and non-fiction, and my biggest activity outside of academics is climbing!

During grad school I have worked on real-time pose estimation, diffusion models, and multi-agent LLM systems. As an undergraduate I did condensed matter research in the Velasco Lab at UCSC, and I'm an [IBM Qiskit Advocate](https://www.qiskit.org/advocates).

I'm currently looking for part-time CV/ML research and engineering roles, and applying to PhD programs for Fall 2028 admission. Get in touch if you'd like to collaborate or just talk shop.

</section>

<section class="writing" id="writing">
  <div class="writing-head">
    <h2>Writing</h2>
    {%- assign all_tags = site.tags | sort -%}
    {%- if all_tags.size > 0 %}
      <div class="filters" data-filters>
        <span class="eyebrow filters-label">Filter</span>
        <button type="button" class="chip is-active" data-tag="*">all</button>
        {%- for tag in all_tags %}
          <button type="button" class="chip" data-tag="{{ tag[0] | slugify }}">{{ tag[0] }}</button>
        {%- endfor %}
      </div>
    {%- endif %}
  </div>

  <ol class="axis" data-post-list>
    {%- for post in site.posts %}
      {%- assign slugs = "" -%}
      {%- for t in post.tags %}{% assign ts = t | slugify %}{% assign slugs = slugs | append: ts | append: " " %}{% endfor -%}
      <li class="entry" data-tags="{{ slugs | strip }}">
        <time class="entry-date" datetime="{{ post.date | date_to_xmlschema }}">
          <span class="entry-day">{{ post.date | date: '%d %b' }}</span>
          <span class="entry-year">{{ post.date | date: '%Y' }}</span>
        </time>
        <div class="entry-body">
          <h3 class="entry-title"><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
          {%- if post.description %}<p class="entry-desc">{{ post.description }}</p>{% endif %}
          {%- if post.tags.size > 0 %}
            <p class="entry-tags">{% for t in post.tags %}<span class="tag-label">{{ t }}</span>{% endfor %}</p>
          {%- endif %}
        </div>
      </li>
    {%- endfor %}
  </ol>

  <p class="empty-state" data-empty hidden>No posts with that label yet.</p>
</section>

<script src="{{ '/assets/js/filter.js' | relative_url }}" defer></script>

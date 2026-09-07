# zacsmms.github.io

A minimal Jekyll site: a short bio and a body of writing. Built with plain Jekyll —
two plugins (`jekyll-feed`, `jekyll-sitemap`), three layouts, one stylesheet.

## Write a post

Add a file to `_posts/` named `YYYY-MM-DD-lowercase-slug.md`:

```markdown
---
title: Least Squares from 4 Angles
date: 2026-05-15
tags: [linear-algebra, fundamentals]
description: One line shown on the index and under the title.
---

Your prose. Display math is `$$ ... $$`. Inline math needs a doubled
backslash in markdown — `\\( x^2 \\)` — because kramdown consumes the first one.
```

That's the whole contract. `layout: post` is applied automatically, and any tag you
use appears as a filter on the home page by itself — nothing else to configure. Write
tags lowercase-and-hyphenated; `Linear Algebra` and `linear-algebra` would show up as
two chips that filter identically.

The URL comes from the filename, so `2026-05-15-least-squares.md` publishes at
`/writing/least-squares/`. Keep filenames lowercase and hyphenated.

For an image with a caption:

```html
<figure>
  <img src="/assets/img/your-figure.png" alt="Short description." loading="lazy" />
  <figcaption>Caption text. Inside raw HTML like this, use a single backslash: \( math \).</figcaption>
</figure>
```

## Preview locally

```bash
bundle exec jekyll serve   # http://localhost:4000
```

Ctrl-C to stop. It rebuilds automatically as you edit.

One-time setup, if `bundle` isn't found — macOS ships Ruby 2.6, which is too old:

```bash
brew install ruby
echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc
exec zsh
bundle install
```

## Publish

Push to `main`. GitHub Actions builds the site and publishes `_site` to the
`gh-pages` branch, which is what GitHub Pages serves.

## Layout of the repo

| Path                 | What it is                                          |
| -------------------- | --------------------------------------------------- |
| `index.md`           | The home page: bio prose, then the writing index     |
| `_posts/`            | Your writing                                         |
| `_layouts/`          | `default` (shell) and `post`                         |
| `_includes/head.html`| Meta tags, fonts, MathJax                            |
| `assets/css/main.scss`| The whole stylesheet                               |
| `assets/js/filter.js`| Tag filtering on the home page                       |
| `_config.yml`        | Site title, description, URL, plugins                |

Theme lineage: this replaced [al-folio](https://github.com/alshedivat/al-folio)
(MIT), whose licence is retained in `LICENSE`.

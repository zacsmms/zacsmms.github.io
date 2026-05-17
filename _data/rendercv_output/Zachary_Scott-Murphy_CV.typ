// Import the rendercv function and all the refactored components
#import "@preview/rendercv:0.3.0": *

// Apply the rendercv template with custom configuration
#show: rendercv.with(
  name: "Zachary Scott-Murphy",
  title: "Zachary Scott-Murphy - CV",
  footer: context { [#emph[Zachary Scott-Murphy -- #str(here().page())\/#str(counter(page).final().first())]] },
  top-note: [ #emph[Last updated in May 2026] ],
  locale-catalog-language: "en",
  text-direction: ltr,
  page-size: "us-letter",
  page-top-margin: 0.7in,
  page-bottom-margin: 0.7in,
  page-left-margin: 0.7in,
  page-right-margin: 0.7in,
  page-show-footer: true,
  page-show-top-note: true,
  colors-body: rgb(0, 0, 0),
  colors-name: rgb(0, 79, 144),
  colors-headline: rgb(0, 79, 144),
  colors-connections: rgb(0, 79, 144),
  colors-section-titles: rgb(0, 79, 144),
  colors-links: rgb(0, 79, 144),
  colors-footer: rgb(128, 128, 128),
  colors-top-note: rgb(128, 128, 128),
  typography-line-spacing: 0.6em,
  typography-alignment: "justified",
  typography-date-and-location-column-alignment: right,
  typography-font-family-body: "Source Sans 3",
  typography-font-family-name: "Source Sans 3",
  typography-font-family-headline: "Source Sans 3",
  typography-font-family-connections: "Source Sans 3",
  typography-font-family-section-titles: "Source Sans 3",
  typography-font-size-body: 10pt,
  typography-font-size-name: 30pt,
  typography-font-size-headline: 10pt,
  typography-font-size-connections: 10pt,
  typography-font-size-section-titles: 1.4em,
  typography-small-caps-name: false,
  typography-small-caps-headline: false,
  typography-small-caps-connections: false,
  typography-small-caps-section-titles: false,
  typography-bold-name: true,
  typography-bold-headline: false,
  typography-bold-connections: false,
  typography-bold-section-titles: true,
  links-underline: false,
  links-show-external-link-icon: false,
  header-alignment: center,
  header-photo-width: 3.5cm,
  header-space-below-name: 0.7cm,
  header-space-below-headline: 0.7cm,
  header-space-below-connections: 0.7cm,
  header-connections-hyperlink: true,
  header-connections-show-icons: true,
  header-connections-display-urls-instead-of-usernames: false,
  header-connections-separator: "",
  header-connections-space-between-connections: 0.5cm,
  section-titles-type: "with_partial_line",
  section-titles-line-thickness: 0.5pt,
  section-titles-space-above: 0.5cm,
  section-titles-space-below: 0.3cm,
  sections-allow-page-break: true,
  sections-space-between-text-based-entries: 0.3em,
  sections-space-between-regular-entries: 1.2em,
  entries-date-and-location-width: 4.15cm,
  entries-side-space: 0.2cm,
  entries-space-between-columns: 0.1cm,
  entries-allow-page-break: false,
  entries-short-second-row: true,
  entries-degree-width: 1cm,
  entries-summary-space-left: 0cm,
  entries-summary-space-above: 0cm,
  entries-highlights-bullet:  "•" ,
  entries-highlights-nested-bullet:  "•" ,
  entries-highlights-space-left: 0.15cm,
  entries-highlights-space-above: 0cm,
  entries-highlights-space-between-items: 0cm,
  entries-highlights-space-between-bullet-and-text: 0.5em,
  date: datetime(
    year: 2026,
    month: 5,
    day: 17,
  ),
)


= Zachary Scott-Murphy

  #headline([Computer Visioin Researcher | Athlete])

#connections(
  [#link("mailto:zachary@scott-murphy.com", icon: false, if-underline: false, if-color: false)[#connection-with-icon("envelope")[zachary\@scott-murphy.com]]],
  [#connection-with-icon("location-dot")[Berkeley, CA]],
  [#link("https://github.com/zacsmms", icon: false, if-underline: false, if-color: false)[#connection-with-icon("github")[zacsmms]]],
  [#link("https://linkedin.com/in/zachary-scott-murphy", icon: false, if-underline: false, if-color: false)[#connection-with-icon("linkedin")[zachary-scott-murphy]]],
)


== Education

#education-entry(
  [
    #strong[Georgia Institute of Technology], Computer Science

    - Simulated strategy game with Agentic Emergent Misalignment LLM.

    - Runtime Ceiling of Classical Stereo Correspondence.

  ],
  [
    Atlanta, Georgia

    2025 – 2027

  ],
  degree-column: [
    
  ],
)

#education-entry(
  [
    #strong[University of California, Santa Cruz], Applied Physics

    - Etching technique and Gr\/hBN Heterostructure by MMA method.

    - Applications of Aligned Bilayer Gr\/hBN Devices.

  ],
  [
    Santa Cruz, California

    2021 – 2024

  ],
  degree-column: [
    
  ],
)

== Experience

#regular-entry(
  [
    #strong[MPCP], Founding Engineer

    #summary[Created the foundation for a live athletic performance system using solely vision. Analysed athletic metric data from world-embodied vision model for the UC Berkeley swimming team.]

    - UC Berkeley Analytics Conference.

    - ACC Swimming Championships 2026.

  ],
  [
    UC Berkeley, CA

    2025 – 2026

    

    1 year

  ],
)

#regular-entry(
  [
    #strong[QuantumGrad], Lead Organiser and Research Communicator

    - Led IBM Qiskit Fall Fest 2024.

    - Presented several events with researchers in quantum computing from several universities.

    - Wrote articles on quantum computing research and education.

    - IBM Quantum Advocate

  ],
  [
    California (Online)

    2024 – 2025

    

    1 year

  ],
)

== Awards

#regular-entry(
  [
    #strong[College Scholar's Program]

    #summary[This program gives a select group of students in each year the opportunity to explore research opportunities.]

    University of California, Santa Cruz

    #link("https://news.ucsc.edu/2021/10/college-scholars-program/")[news.ucsc.edu\/2021\/10\/college-scholars-program]

  ],
  [
    Apr 2022

  ],
)

#regular-entry(
  [
    #strong[Dean's Honors]

    #summary[Awarded for top 15\% of their academic division.]

    University of California, Santa Cruz

  ],
  [
    May 2022

  ],
)

== Publications

#regular-entry(
  [
    #strong[Zur Elektrodynamik bewegter Körper]

    #summary[It concerned an interpretation of the Michelson–Morley experiment and the properties of light and time. Special relativity incorporates the principle that the speed of light is the same for all inertial observers regardless of the state of motion of the source.]

    Albert Einstein

    #link("https://en.wikisource.org/wiki/Translation:On_the_Electrodynamics_of_Moving_Bodies")[en.wikisource.org\/wiki\/Translation:On\_the\_Electrodynamics\_of\_Moving\_Bodies]

  ],
  [
  ],
)

== Languages

#regular-entry(
  [
    #strong[English]

    #summary[Native speaker]

  ],
  [
  ],
)

#regular-entry(
  [
    #strong[Japanese]

    #summary[Proficient]

  ],
  [
  ],
)

#regular-entry(
  [
    #strong[French]

    #summary[Proficient]

  ],
  [
  ],
)

== Interests

#regular-entry(
  [
    #strong[Computer Science]

  ],
  [
  ],
)

#regular-entry(
  [
    #strong[Physics]

  ],
  [
  ],
)

== Certificates

#regular-entry(
  [
    #strong[MIT iQuHack 2025]

  ],
  [
    Feb 2025

  ],
)

#regular-entry(
  [
    #strong[2024 Qiskit Fall Fest Mentor]

  ],
  [
    Dec 2024

  ],
)

#regular-entry(
  [
    #strong[Qiskit Global Summer School 2024 - Quantum Excellence]

  ],
  [
    Aug 2024

  ],
)

#regular-entry(
  [
    #strong[Basics of Quantum Information]

  ],
  [
    Aug 2024

  ],
)

#regular-entry(
  [
    #strong[Quantum Challenge 2024]

  ],
  [
    June 2024

  ],
)

#regular-entry(
  [
    #strong[Variational Algorithm Design]

  ],
  [
    June 2024

  ],
)

#regular-entry(
  [
    #strong[Wastonx.ai Technical Essentials]

  ],
  [
    Aug 2024

  ],
)

== Projects

#regular-entry(
  [
    #strong[MPS\/Metal port of Gaussian Splatting (GSplat) from the KAIR Group UC berkeley]

    #summary[Converted CUDA libraries to Metal for all essential libraries. Runtime is comparable to CUDA on an M2 Mac Air 8 gb around 2-3x the runtime of a T4 Tesla GPU.]

    - Gassuain Splatting

    - CUDA

    - Metal

  ],
  [
    Apr 2026 – May 2026

  ],
)

#regular-entry(
  [
    #strong[Town of Salem Multi-Agent Emergent Misalignment]

    #summary[Group project in which we created a simulated agent environment mimicking the Town of Salem game, and inserted a variety of different alignments of LLMs, specifically focused on the idea of emergent misalignment models to analyse their competitive strategies and see if they favour chaotic disruptive behaviour as compared to slight-of-hand malicious behaviour to pursue winning.]

    - LLM Alignment

    - Emergent Misalignment

    - Multi-Agent Environment

  ],
  [
    June 2025 – July 2025

  ],
)

#regular-entry(
  [
    #strong[Generative cross-section synthesis for interactive 3D destruction]

    #summary[Generative AI model that took cross-sectional information and surface texture\/properties via trilineation to produce fracture patterns for different 3D models and generate the visual colouring and texturing information.]

    - Generative Modelling

    - 3D Modelling

    - Ray Tracing

  ],
  [
  ],
)

#regular-entry(
  [
    #strong[Dark matter literature review]

    #summary[Reviewed all current (as of 2024) materials on dark matter simulation technology to provide a literature review on current strategums and future directions for further research.]

    - Simulated Physics Computation

    - Dark Matter

    - Particle Physics

  ],
  [
  ],
)

== References

#regular-entry(
  [
    #strong[Professor Jairo Velasco]

  ],
  [
  ],
)

---
title: What I know
permalink: /knowledge/
description: Where I studied and what I built, and a map of the topics underneath it — each one with what it connects to and why.
---

<section class="intro" markdown="1">

<p class="eyebrow">Berkeley, California</p>

# What I know, and where I've had to *use* it.

Above: where I studied and what I built. Below: the topics underneath that work, grouped by
family, each one listing what it touches and why. The connections are drawn by relation
rather than by lineage — a link means two topics share machinery or a question, not that one
led me to the other. Three of them are things I am working through now, and one is a
direction rather than a claim. The type weight is a depth grade I did not write; the note
above the list says where it came from.

</section>

<section class="cv">

<div class="cv-section" markdown="1">

## Now

Computer science master's student at Georgia Tech, with an undergraduate background in
applied physics. Currently researching cyber-physical security of marine and ocean-sensing
systems in the CPSec Lab at Georgia Tech. Looking for part-time computer vision and machine
learning research or engineering work, and applying to PhD programmes for Fall 2028
admission.

</div>

<div class="cv-section">
  <h2>Education</h2>

  <div class="cv-item">
    <h3>Georgia Institute of Technology</h3>
    <p class="cv-meta">M.S. Computer Science · expected December 2026</p>
    <p>Computer Vision, Machine Learning, Deep Learning, Quantum Computing, Graduate
    Algorithms, and Reinforcement Learning (in progress).</p>
  </div>

  <div class="cv-item">
    <h3>University of California, Santa Cruz</h3>
    <p class="cv-meta">B.S. Applied Physics with Honors · June 2024</p>
    <p>College Scholars Program; Dean's Honors, Fall 2023.</p>
  </div>
</div>

<div class="cv-section">
  <h2>Where the work happened</h2>

  <div class="cv-item">
    <h3>CPSec Lab, Georgia Tech</h3>
    <p class="cv-meta">Graduate researcher · August 2026–present</p>
    <p>Cyber-physical security of marine and ocean-sensing infrastructure, advised by Prof.
    Saman Zonouz, with day-to-day supervision from Anna Raymaker (PhD student).</p>
    <ul>
      <li>Built five zgrab2 scan modules — NMEA 0183, NMEA 2000 across five wire encodings,
      Signal K, SunSpec over Modbus, and vendor web interfaces — for a census of
      internet-exposed marine and operational-technology systems across some 6,000 hosts. They
      were developed and scored against a simulated SunSpec device network with manifest
      ground truth before any real host was contacted.</li>
      <li>Found a 21.5% classification gap in a commercial device-search index: 760 hosts
      carry NMEA sentences in banners the index never labelled as NMEA. A receive-only decode
      of 283 live feeds recovered 11,584 unique vessel identities across 138 flag states,
      transmitting nothing.</li>
      <li>Closed the question of whether NMEA 2000 reaches the internet directly, as a bounded
      negative: passive banner analysis, down-conversion cadence and diversity tests, and an
      authorised, allowlist-gated active probe over 200 feeds added no new confirmations.</li>
      <li>Built an inversion that recovers coastal surface current from the kinematics of
      passing vessels, validated against HF-radar fields over seven region-windows in two
      seasons. The pre-registered replication gate failed, and the result is the better one: a
      characterised error floor near 0.2 m/s, with correlation monotone in signal-to-noise —
      the threshold below which a corrupted field cannot be caught by physics.</li>
    </ul>
    <p class="cv-topics">Topics: <a href="#t-cpsec">cyber-physical systems security</a>,
    <a href="#t-assimilation">data assimilation and inverse problems</a>,
    <a href="#t-dsp">signal processing and SDR</a>,
    <a href="#t-fluid-dynamics">fluid dynamics</a>,
    <a href="#t-systems">systems and cloud</a>.</p>
  </div>

  <div class="cv-item">
    <h3>MPCP</h3>
    <p class="cv-meta">Lead founding engineer · 2025–2026</p>
    <ul>
      <li>Built a six-stage perception-to-reasoning pipeline for real-time sports coaching —
      YOLOv8 detection, RTMPose keypoints, multi-person tracking, ST-GCN action embeddings,
      vLLM reasoning — running at twice real time on CPU.</li>
      <li>Replaced the hand-written sport-specific heuristics with an evidence-first
      architecture: ST-GCN embeddings pretrained on NTU RGB+D (60 action classes, 56k
      sequences) are passed to the reasoning stage as structured evidence packets, with
      persistent temporal state and confidence decay, so each decision can be traced back to
      observable body mechanics.</li>
      <li>Validated across two ACC competition days with five simultaneous athletes, holding
      swimmer identity through occlusion and lane changes via FastReID over six-hour sessions
      without human intervention.</li>
      <li>Provisioned the AWS infrastructure from zero (VPC, IAM Identity Center, EC2, RDS,
      ALB/ACM, Docker Compose) across dev, prod and field, and led a team of five.</li>
    </ul>
    <p class="cv-topics">Topics: <a href="#t-pose-tracking">pose estimation and tracking</a>,
    <a href="#t-cv">computer vision</a>, <a href="#t-gnn">graph neural networks</a>,
    <a href="#t-llm">LLMs and multi-agent systems</a>, <a href="#t-systems">systems and
    cloud</a>.</p>
  </div>

  <div class="cv-item">
    <h3>FractureFill — generative fracture surface synthesis</h3>
    <p class="cv-meta">March 2026</p>
    <ul>
      <li>Conditional diffusion for fracture geometry and appearance (albedo, normals,
      displacement): a FiLM-conditioned U-Net with DDPM, trained on a procedural pipeline of
      3,000 samples, reaching seam L1 of 0.001 and 21.3 dB PSNR at under 100 ms inference.</li>
    </ul>
    <p class="cv-topics">Topics: <a href="#t-generative">generative models and diffusion</a>,
    <a href="#t-dl">deep learning</a>, <a href="#t-probability">probability</a>.</p>
  </div>

  <div class="cv-item">
    <h3>Real-time multi-object tracking and pose estimation</h3>
    <p class="cv-meta">Fall 2025</p>
    <ul>
      <li>Adapted <em>Tracking Everything Everywhere All at Once</em> (CVPR 2024) from dense
      point tracking to multi-human re-identification, reaching 30+ FPS on consumer GPUs with
      trajectory smoothing and sparse feature matching.</li>
      <li>Extended it to 3D keypoint fusion and temporal action segmentation, then used it as
      the pose stage feeding the MPCP pipeline.</li>
    </ul>
    <p class="cv-topics">Topics: <a href="#t-pose-tracking">pose estimation and tracking</a>,
    <a href="#t-cv">computer vision</a>, <a href="#t-recon3d">3D reconstruction</a>.</p>
  </div>

  <div class="cv-item">
    <h3>ToSSim — emergent misalignment in multi-agent social deduction</h3>
    <p class="cv-meta">Summer 2025</p>
    <ul>
      <li>Fine-tuned nine transformer models up to 32B parameters with LoRA and QLoRA to study
      how LLM agents misalign in adversarial, multi-turn settings.</li>
      <li>Built the supervised fine-tuning pipeline over annotated action traces, with
      RLHF-style adversarial probing, and schema-validated XML outputs so agents could parse
      one another reliably; evaluated over 500 episodes.</li>
    </ul>
    <p class="cv-topics">Topics: <a href="#t-llm">LLMs and multi-agent systems</a>,
    <a href="#t-rl">reinforcement learning</a>, <a href="#t-dl">deep learning</a>,
    <a href="#t-phil-ai">philosophy of AI</a>.</p>
  </div>

  <div class="cv-item">
    <h3>QuantumGrad</h3>
    <p class="cv-meta">Lead organiser and <a href="https://www.qiskit.org/advocates">IBM Qiskit
    Advocate</a> · August 2024–2025</p>
    <ul>
      <li>Directed Qiskit Fall Fest 2024 for 200+ participants across three challenge tracks,
      and wrote the Classiq challenge notebook distributed to the community.</li>
      <li>Ran four workshops a semester, contributed to the Qiskit open-source ecosystem, and
      mentored peers at MIT iQuHack, IBM watsonx.ai, and Qiskit Global Summer School.</li>
    </ul>
    <p class="cv-topics">Topics: <a href="#t-quantum-computing">quantum computing</a>,
    <a href="#t-writing">technical writing and teaching</a>.</p>
  </div>

  <div class="cv-item">
    <h3>Velasco Lab, UC Santa Cruz</h3>
    <p class="cv-meta">Research intern · May 2023–June 2024</p>
    <ul>
      <li>Measured charge transport in semiconductor quantum materials by C-AFM and STM, and
      built measurement workflows that cut the variation between sessions, so fabrication
      parameters could be iterated on faster.</li>
      <li>Presented the analyses to cross-disciplinary teams; the findings fed fabrication
      parameter choices for later experimental runs.</li>
    </ul>
    <p class="cv-topics">Topics: <a href="#t-condensed-matter">condensed matter</a>,
    <a href="#t-quantum-physics">quantum physics</a>, <a href="#t-applied-physics">applied
    physics</a>.</p>
  </div>
</div>

<div class="cv-section">
  <h2>Writing</h2>

  <div class="cv-item">
    <h3>On Becoming a Self in the Age of AI: Cognitive Sovereignty and the Drift of Human
    Judgment</h3>
    <p class="cv-meta">Under review at <em>AI &amp; SOCIETY</em>, 2026</p>
    <p>Shorter pieces, mostly on the mathematics underneath this work, are
    <a href="{{ '/#writing' | relative_url }}">on the front page</a>.</p>
  </div>
</div>

<div class="cv-section topics">
  <h2>The topics underneath</h2>

  <p class="topic-key">Type weight marks depth —
    <span class="is-d4">deepest</span>,
    <span class="is-d3">solid</span>,
    <span class="is-d2">working</span>,
    <span class="is-d1">newest</span>.
    Graded by an AI model reading my transcript, repositories, CV and writing —
    not by me.</p>

  {%- for cluster in site.data.knowledge.clusters %}
  <div class="topics-group">
    <h3>{{ cluster.label }}</h3>
    {%- for node in site.data.knowledge.nodes %}
      {%- if node.cluster == cluster.id %}
    <div class="topic-entry" id="t-{{ node.id }}">
      <h4 class="topic-name is-d{{ node.depth }}">{{ node.full }}{% if node.state == "learning" %} <span class="topic-state">learning it now</span>{% elsif node.state == "target" %} <span class="topic-state">where I'm heading</span>{% endif %}</h4>
      <ul class="topic-links">
        {%- for edge in site.data.knowledge.edges %}
          {%- if edge.from == node.id %}
            {%- for other in site.data.knowledge.nodes %}{% if other.id == edge.to %}
        <li><a href="#t-{{ other.id }}">{{ other.full }}</a> — {{ edge.reason }}</li>
            {%- endif %}{% endfor %}
          {%- elsif edge.to == node.id %}
            {%- for other in site.data.knowledge.nodes %}{% if other.id == edge.from %}
        <li><a href="#t-{{ other.id }}">{{ other.full }}</a> — {{ edge.reason }}</li>
            {%- endif %}{% endfor %}
          {%- endif %}
        {%- endfor %}
      </ul>
    </div>
      {%- endif %}
    {%- endfor %}
  </div>
  {%- endfor %}
</div>

</section>

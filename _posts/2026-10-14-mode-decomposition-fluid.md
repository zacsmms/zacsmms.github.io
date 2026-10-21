---
title: Study of Fluid POD Modes & Reconstruction
date: 2026-10-14
tags: [fluid-reconstruction, linear-algebra]
description: What the decomposition of fluids reveal about the reconstruction process, and how small cases reveal problems with methods in more complex scenarios.
---
<!--Basic introduction write after body text is written-->

## What we're exploring
At the centre of fluid reconstruction, is decomposition of a matrix into feature components as describable smaller values and vectors.
Classic examples of flow include a traveling Gaussian Vortex, which is a Gaussian blob shifting from left to right on a closed-loop.
Another is an unsteady decaying flow or a Taylor-Green Vortex.

We'll look at these two vortex types and analyse their Proper Orthogonal Decomposition (POD) modes for information about flow structure, and how assumptions of the method arise in results.

### Taylor-Green Vortices
Taylor-Green vortices make up a subset of vortex types defined by an unsteady flow decaying in time.
It has an exact closed-form solution from incompressible Navier-Stokes.

Incompressibility gives the two vectors u, v to describe the flow,
$$
u = \partial_y \psi, \qquad v = -\partial_x \psi,
$$
$$
\psi(x, y, t) = -\cos x \, \cos y \, e^{-2 \nu t},
$$
where \\(\psi\\) is the streamfunction and \\(\nu\\) is the kinematic viscosity.
The vorticity, a measure of local spinning motion, is defined as,
$$
\omega = -2 \cos x \, \cos y \, e^{-2 \nu t}.
$$
Directional spiral flow can be recovered from the x and y components of the flow field in time.

Taking the Laplacian of the flow returns an inverse double,
$$
\nabla^2 \psi = -2 \psi \quad \Longrightarrow \quad \boxed{\omega = 2 \psi},
$$
\\(\psi\\) is then an eigenfunction of the Laplacian with eigenvalue \\(-|\mathbf{k}|^2 = -2\\) because it is built from a single wavevector \\(\mathbf{k} = (1, 1)\\).

Past this, we need to model the dissipation, which comes from the non-linear term self-annihilating. The 2D vorticity equation is,
$$
\frac{\partial \omega}{\partial t} + J(\psi, \omega) = \nu \nabla^2 \omega, \qquad J(\psi, \omega) \equiv \partial_x \psi \, \partial_y \omega - \partial_y \psi \, \partial_x \omega,
$$
where \\(J\\) is the advection term,
$$
J(\psi, \omega) = \mathbf{u} \cdot \nabla \omega = 2 \, J(\psi, \psi) = 0
$$
because \\(\omega = 2 \psi\\), therefore a Jacobian of a function with itself.
Which is where the nonlinear term self-annihilates, and where the closed-form solution exists.

Any flow with \\(\omega = f(\psi)\\) is a steady solution to Euler's equations.
Vorticity is constant along streamlines, so advection has nothing to transport.
The viscosity is the component that drains the shape.

To model the slow decay, we use a heat equation,
$$
\frac{\partial\omega}{\partial t} = \nu \nabla^2 \omega = -2 \nu \omega \quad \Longrightarrow \quad \omega(t) = \omega_0 \, e^{-2 \nu t},
$$
decay is then a model of the viscosity and wavenumber.
The flow decays at a rate proportional to the wavenumber.
So a Laplacian eigenmode decaying exponentially.

We explore Taylor-Green because the nonlinearity vanishing leaves a linear equation, and that linear constant-coefficient equation on a periodic box has exactly separable solutions, one fixed spatial eigenfunction and one scalar in time.
This is identical to the POD's ansatz.
Taylor-Green is not just a flow of rank-1, it is rank-1 because it has an exact solution.
So the exact solution and POD-friendly are the same condition.

### Traveling (Gaussian) Vortex
In contrast to Taylor-Green, a traveling vortex doesn't have an exact solution, it is a kinematic field that is imposed and it breaks the ansatz.
Motion for the traveling vortex is a literal translation of a 2D Gaussian through space.
Fluid does not necessarily act this way, so choosing it checks whether it is possible and reconstructable.

This blob however is a steady Euler solution, a self-induced velocity that's purely azimuthal, and \\(\omega\\) is constant on those circles.
Which means it is spinning in place forever, which we're putting in a uniform stream.
Advection is then,
$$
U \cdot \nabla \omega, \quad \text{giving} \quad \omega(x - ct),
$$
a rigid translation.
Motion is describable then as a vortex drifting in a background.
But this too means viscosity is assumed zero, and a single positive blob carries non-zero net circulation, which no periodic 2D velocity field can produce.

By making this purely kinematic, it guarantees that every mode POD charges us is attributable to translation and nothing else.
What will be visible from this generalises: convecting shear layers, wakes, rotating machinery, and others.
The shape can vary, and the translation is what it costs.

### Proper Orthogonal Decomposition
POD is not an eigendecomposition, it defines the single deterministic field \\(\phi\\) that the flow most resembles on average.
It maximises the mean-square projection,
$$
\lambda = \frac{\big\langle |(\mathbf{u}, \phi)|^2 \big\rangle}{(\phi, \phi)}
$$
where \\((\cdot, \cdot)\\) is the spatial inner product and \\(\langle\cdot\rangle\\) averages over the ensemble.
After writing the numerator out and taking the variation subject to \\((\phi, \phi) = 1\\), the stationarity gives,
$$
\int R(x, x') \, \phi(x') \, dx' = \lambda \, \phi(x).
$$
This derives the eigenproblem, and \\(R\\) (the two point correlation) is the only object POD sees.

POD is the unique expansion that is orthonormal in space and uncorrelated in time, which is how we'll confirm the Fourier modes are POD modes rather than a basis that works.
POD is also optimal for the best rank-r approximation in Frobenius norm.
Which implies that the eigenvalues aren't a summary statistic, they are the exact error curve, before you truncate.

Degeneracy means non-uniqueness, when eigenmodes are equal any rotation in eigenspace is a valid POD basis, therefore mode pairs are determined up to a phase.
Symmetry overrides the data, if the ensemble is invariant under a group, then \\(R\\) commutes with that group and the eigenfunctions are irreducible representations; Fourier for translation, spherical harmonics for rotation, and Hermite for the quantum harmonic case.
POD discovers nothing known with symmetry, which will be shown in the travelling-vortex case.

<!---->
## Flows are exact analytic solutions
Both flows are pinned to closed forms, and the referee gates them against those formulas directly rather than against a tolerance that would absorb modelling error.
Taylor-Green is compared entry by entry against \\(\cos x \sin y\, e^{-2\nu t}\\) and \\(-\sin x \cos y\, e^{-2\nu t}\\) on the pinned grid, and the deviation comes back as exactly \\(0.0\\) against a gate of \\(10^{-12}\\).
The traveling vortex is gated on its contract instead: shape \\((4096, 128)\\), every value non-negative, a peak of exactly \\(1\\) at \\(t = 0\\), and the relative spread of column sums held under \\(10^{-9}\\).
That last one is mass conservation under translation, and it lands at \\(6.3 \times 10^{-11}\\), which is the grid aliasing floor rather than an error in the field.

Choosing exact flows is what makes the rest of the study readable.
There is no modelling error anywhere in the data, so every discrepancy that appears later is attributable to the decomposition and nothing else.
Taylor-Green satisfies the POD ansatz exactly and the traveling vortex violates it, and the contrast is clean because the data on both sides is beyond reproach.

The decomposition itself is held to the same standard.
The method of snapshots is checked against an independent SVD on a seeded low-rank-plus-noise matrix, confirming \\(\lambda_j = \sigma_j^2 / m\\) to \\(1.1 \times 10^{-15}\\), and all-modes reconstruction plus mode orthonormality are gated at \\(10^{-10}\\) and come in at \\(1.8 \times 10^{-15}\\).
Everything downstream in the curriculum (gappy POD, sensor placement, SST) calls this same convention, so the plumbing being right is half of what the assignment is for.


<!---->
## Assumptions in POD
Every POD-based reduction writes the flow as

$$
u(x, t) \approx \sum_{j=1}^{r} a_j(t)\, \phi_j(x),
$$

and three assumptions are buried in that one line.
None of them are assumptions about the flow; the flows are exact and assume nothing.
They are assumptions in the representation.

### Fixed Spatial Modes
The ansatz is separation of variables with spatially frozen modes.
The shapes never move or deform, and all of the time dependence is squeezed into the scalar amplitudes \\(a_j(t)\\).
Taylor-Green *is* that ansatz, exactly, with \\(r = 1\\).
The traveling vortex cannot be written that way with any finite \\(r\\), because its spatial support changes with time and a fixed \\(\phi_j(x)\\) has no way of expressing "elsewhere now".
Modes are fixed in space, so we pay for trailing modes that fake the motion out of stationary shapes.

### Linear Superposition
The state is assumed to lie near a flat subspace, not a curved manifold.
Superposition with a constant \\(\phi\\) means a linear subspace, because the span of the \\(\phi\\)'s is flat by construction.
POD returns the flat subspace minimising squared distance to the data, and \\(\sum_{j > r} \lambda_j\\) is literally how far the data sticks out of that best flat approximation, the equivalent of a linear fit.

The snapshots of the traveling vortex trace a closed one-dimensional loop in state space, and no low-dimensional plane hugs a loop.
Taylor-Green traces a one-dimensional object too, but a straight line segment, which a one-dimensional subspace contains exactly.
Both flows have one degree of freedom; only one of them is flat.
POD measures the linear dimension and the physics carries the intrinsic dimension, and the gap between the two is the curvature.

### Variance = Importance
The variance of the eigenvalues is assumed to equal the importance of the structure, but POD only ever sees a two-point correlation and nothing else.
Everything invisible to second-order statistics is invisible to POD: higher moments, intermittency, and above all dynamics.
A mode can be energetically negligible and dynamically decisive, and POD will rank it below noise, correctly by its own criterion and uselessly by ours.
This assumption didn't bite in this assignment, because both flows are single coherent structures, but it is the one that bites hardest on real data.

### Centering Taylor-Green
Taylor-Green is rank one whether or not the mean is subtracted.
The snapshot matrix is an outer product \\(\phi(x,y)\, a(t)^T\\), and centering only rescales \\(a(t)\\), so it changes the magnitude of \\(\lambda_1\\) without touching the rank.
Uncentered, the leading mode carries \\(\lambda_1 / E = 1 - 5.6 \times 10^{-16}\\) of the energy, and centered it still carries essentially all of what is left.

What changes is the size of that share's denominator.
At \\(\nu = 0.1\\) and \\(T = 2\\), \\(\lambda_1\\) drops from \\(793.676\\) to \\(10.763\\), a factor of about 75, because the temporal mean of \\(e^{-2\nu t}\\) is not zero and most of the energy sits in the mean field rather than the fluctuation.
The energy is conserved, not lost, and the budget closes exactly:

$$
\underbrace{\|X\|_F^2 / m}_{\text{total}} = \underbrace{\|X_c\|_F^2 / m}_{\text{fluctuation}} + \underbrace{\|\bar{x}\|^2}_{\text{mean}}.
$$

So the story that changes is not "one mode" becoming "many modes", it is what the dominant mode means.
Uncentered it carries essentially all the energy in the data; centered it carries all the energy in the 1.3% that actually varies.
Energy fractions are meaningless without the absolute scale printed beside them.

<figure>
  <img src="/assets/img/pod_taylor_green_centering.png" alt="Taylor-Green eigenvalue spectra with and without mean subtraction; both collapse to a single nonzero mode, the centred one sitting roughly two decades lower." loading="lazy" />
  <figcaption>Taylor-Green with and without mean subtraction. Both are rank one; centring moves the energy into the mean field rather than into extra modes.</figcaption>
</figure>


<!---->
## Behaviour of Flow

### Width Structure
Sweeping the blob width and plotting the eigenvalue spectrum on a log axis gives a fanning set of downward curves, one per width.
Steeper curves are the wider blobs, which are spectrally narrow, and flatter curves are the narrower blobs, which are spectrally wide.
Wide in space means narrow in wavenumber, which is exactly what the Fourier transform of a Gaussian demands.

The decay is governed by

$$
\lambda_k \propto e^{-k^2 w^2},
$$

so plotting \\(\log \lambda_k\\) against \\(k^2\\) straightens every curve into a line of slope \\(-w^2\\), and the blob width can be read straight off the fit.
Inside its range of validity that law is not approximate.
Measuring \\(\lambda_{k=5} / \lambda_{k=2}\\) against the predicted \\(e^{-21 w^2}\\) agrees to four significant figures at \\(w = 0.1\\), \\(0.3\\) and \\(0.5\\).

Both ends of the sweep fall outside that range, for different reasons.
Blobs narrower than a grid cell are not resolved: at \\(w = 0.1\\) the blob is thinner than the spacing of \\(0.098\\), so the field is a single-cell spike and the tail of its spectrum is aliasing rather than physics.
At the other end the periodic wrap stops being harmless.
The wrap returns a periodic distance rather than a sum of periodic images, so once the blob is wide enough to reach the far side of the box it overlaps itself and leaves a kink at the antipode.
At \\(w = 1.9\\) the field is still a quarter of its peak there, and the broadband content of that kink swamps everything: the measured ratio is \\(2.9 \times 10^{-2}\\) where the Gaussian law predicts \\(1.2 \times 10^{-33}\\).
On a \\(64^2\\) grid the law holds cleanly for roughly \\(0.3 \le w \le 0.8\\), and the flat tails of the wide curves are measuring the discretisation rather than the blob.

<figure>
  <img src="/assets/img/pod_width_sweep.png" alt="Eigenvalue spectra of the travelling vortex for blob widths 0.1 to 1.9 on a log vertical axis, coloured dark to light with increasing width; the light curves drop fast then flatten, the dark ones decay slowly across the whole range." loading="lazy" />
  <figcaption>Width sweep of the travelling vortex spectrum, dark to light with increasing width. Over the first few wavenumbers the wider blobs fall away faster, as the Gaussian law requires. The flat tails of the lighter curves are not that law continuing: above about w = 1 the blob overlaps itself through the periodic wrap, and the kink that leaves dominates the tail.</figcaption>
</figure>

### Mode Pairs
The spectrum of a translating field descends in near-equal pairs, which shows up as a staircase with two points per step.
The referee gates the leading pair at \\(\lambda_2 / \lambda_1 \ge 0.999\\) and measures \\(1 - 8 \times 10^{-16}\\), so the degeneracy is exact to machine precision rather than approximate.
Each step is one Fourier wavenumber's two-dimensional subspace, and the pairing holds for every wavenumber, not only the leading one.

Equal eigenvalues say the two modes carry the wave together.
The quarter-period lag says their coefficients are the cosine and sine of the same phase: the circular cross-correlation of the normalised \\(a_1\\) and \\(a_2\\) peaks at \\(1.0000\\) at a lag of exactly \\(n_t / 4\\).
Because the pair is degenerate, any orthonormal rotation within its plane is an equally valid POD basis, so the particular cosine/sine split is arbitrary and only the lag is a stable thing to test.

### Vortices of Varied Speeds
With one blob, the speed changes nothing.
\\(T = 2\pi / c\\) scales with the speed, so every run samples the same positions around the box and only the time labels on the columns differ, which POD never reads.
The spectra for \\(c = 0.5\\) and \\(c = 10\\) agree to \\(4 \times 10^{-16}\\).
The coefficients agree only up to a rotation inside the degenerate pair, so \\(a_1\\) comes out phase-shifted rather than overlaid, and the invariant is the phase-portrait circle, whose radius holds constant to \\(1.4 \times 10^{-10}\\).

<figure>
  <img src="/assets/img/pod_speed_spectrum.png" alt="Eigenvalue spectra for a single travelling vortex at speeds 0.5 and 10.0, lying exactly on top of each other." loading="lazy" />
  <figcaption>One blob at two speeds. The spectra are indistinguishable, because changing the speed only relabels the columns.</figcaption>
</figure>

<figure>
  <img src="/assets/img/pod_speed_coefficients.png" alt="Three panels: the first mode coefficient against snapshot index, the same against physical time, and the phase portrait of the first two coefficients tracing a circle." loading="lazy" />
  <figcaption>The coefficients against snapshot index, against physical time, and as a phase portrait. The circle is the invariant; the individual curve is only defined up to a rotation within the degenerate pair.</figcaption>
</figure>

With two blobs at different speeds in the same field, the wavenumbers interfere.
Writing the field in Fourier shows that wavenumber \\(m\\) couples to wavenumber \\(m'\\) only when \\(m' = km\\) or \\(m = km'\\), so a blob travelling \\(k\\) times faster ties each wavenumber to its \\(k\\)-th multiple.
The covariance stops being diagonal in Fourier, the modes stop being pure Fourier, and POD returns hybrids instead.

The total is fixed regardless: the fluctuation energy of the two-blob field is exactly twice the single-blob field for every ratio tested, to twelve digits.
What changes is the distribution.
At \\(k = 7\\) and above the per-mode ratio is exactly \\(2.0\\) everywhere, because the resonant partner of each energetic mode sits out in the tail with nothing to trade.
At \\(k = 2\\) the ratios run \\(2.34\\), \\(1.32\\), \\(2.00\\), \\(1.30\\): the modes satisfying the resonance condition gain and lose while the others stay untouched, and that redistribution is what the eigenvalue crossing looks like.

<figure>
  <img src="/assets/img/pod_two_vortex_spectra.png" alt="Eigenvalue spectra for two blobs at speed ratios 2 through 11 plotted against the single-blob spectrum, all curves nearly overlapping on a sixteen-decade log axis." loading="lazy" />
  <figcaption>Two blobs at a range of speed ratios, against the single blob. The redistribution is real but invisible here: a sixteen-decade axis cannot show a 17% difference, which is why the numbers above come from the ratios rather than the plot.</figcaption>
</figure>


<!---->
## Fourier Reconstruction
<!--Translation is multiplication by a phase in Fourier-space-->

### Relation to POD
Over one full transit, the ensemble of snapshots is the blob at every position in the box, and that ensemble is translation-invariant.
The correlation operator therefore commutes with translation, and the eigenfunctions of an operator commuting with translation are the Fourier modes.
So for this flow the POD mode is exactly the Fourier mode, forced by the symmetry before the data gets a vote.

This is a general statement rather than a quirk of the problem: POD in a homogeneous direction on a periodic domain reduces to Fourier.
POD is optimal, but being optimal doesn't mean being good for the situation, and running it where a symmetry already exists is an expensive way to rediscover the FFT.
It also explains why the discretisation is pinned the way it is: sampling exactly one transit with the endpoint excluded is what makes the sampled ensemble exactly translation-invariant, and including the endpoint would double-count a position and leave the degeneracy only approximate.

#### Expansion of Periodic Movement
<!--Expand blob in x (periodic), -->
Traveling a closed-loop 2D box means that the blob has a Fourier series.
So coefficients are all that need computing.

Separating the space components as,
$$
g(x, y) = e^{-x^2 / 2w^2} \cdot e^{-(y - \pi)^2 / 2w^2},
$$
only the \\(x\\) factor gets transformed, therefore,
$$
\hat g_k = \frac{1}{2 \pi} \int e^{-x^2 / 2w^2} \, e^{-ikx} \, dx.
$$
Completing the square,
$$
-\frac{x^2}{2w^2} - ikx = -\frac{1}{2w^2} \left(x^2 + 2ikw^2 x \right) = -\frac{(x + ikw^2)^2}{2w^2} - \frac{k^2 w^2}{2},
$$
and the shifted Gaussian integrates to \\(w \sqrt{2 \pi}\\),
$$
\hat g_k = \frac{w}{\sqrt{2 \pi}} \, e^{-k^2 w^2 / 2} \;\equiv\; A_k.
$$
Therefore a Gaussian in \\(x\\) transforms to a Gaussian in \\(k\\), with the width inverted.
Being wide in space means that the wavenumber is narrow.
This is evident in the width-sweep results.
Full field becomes,
$$
g(x, y) = \sum_k A_k \, G(y) \, e^{ikx}, \qquad G(y) = e^{-(y - \pi)^2 / 2w^2},
$$
where \\(G(y)\\) carries no \\(k\\) index.
So every wavenumber has the same \\(y\\) profile, and only the amplitude distinguishes them.

#### Advecting the Gaussian

Advecting a Gaussian through space is defined by the shift theorem which states that a spatial or time-domain shift is a multiplication by a linear phase factor in the frequency domain.
Which links the Fourier basis!
If \\(f\\) has coefficients \\(\hat f_k\\), then for \\(f(x-a)\\), let \\(u = x - a\\),
$$
\frac{1}{2 \pi} \int f(x-a) e^{-ikx}dx = \frac{1}{2\pi} \int f(u) e^{-ik (u + a)} du = e^{-ika} \, \hat f_k.
$$
Translating multiplies each coefficient by a unit-modulus phase.
Letting \\(a = ct\\),
$$
\omega(x, y, t) = \sum_k \underbrace{A_k G(y)}_{\text{fixed}} \cdot \underbrace{e^{-ikct}}_{\text{rotating}} \cdot e^{ikx},
$$
the modulus is frozen and only the argument moves, which splits the result in two: the eigenvalue depends on the amplitude, which the phase cannot touch, and the coefficient is the phase.
In that wavenumber's own plane, the state point circles the origin at radius \\(|A_k|\\) with angular rate \\(kc\\).
Winding numbers enter here: pair \\(k\\) winds \\(k\\) times per transit.

#### Where Pairs Appear
<!--Return to real components-->

<!--\\(\sum_j a_j(t) \phi_j(x, y)\\) is the POD's ansatz-->
Pairs appear as a consequence of physically plausible movement.
The field is real, so forces \\(\hat g_{-k} = \overline{\hat g_k}\\), and sum over \\(k \in \mathbb{Z}\\) collapses into positive-negative pairs.
In this example, \\(g\\) is real and even, so \\(A_k\\) is real and,
$$
A_k e^{ik(x-ct)} + A_{-k}e^{-ik(x-ct)} = 2A_k\cos\!\big(k(x - ct)\big),
$$
which expanding the cosine results in,
$$
2A_k\Big[\underbrace{\cos kct}_{a_{2k-1}}\underbrace{\cos kx \, G(y)}_{\phi_{2k-1}} + \underbrace{\sin kct}_{a_{2k}}\underbrace{\sin kx \, G(y)}_{\phi_{2k}}\Big],
$$
two spatial functions and one wavenumber.
That's forced because if you take the first term alone with the product identity,
$$
\cos kx \cos kct = \tfrac12\cos\big(k(x-ct)\big) + \tfrac12\cos\big(k(x+ct)\big),
$$
a single standing wave is two waves, one going each direction, pulsing in place and going nowhere.
The second term supplies the same pair with the opposite sign, so adding them cancels the backward wave exactly and leaves pure forward motion.
So the pair isn't POD picking up on a symmetry in the data, it's that no single spatially-fixed mode can translate anything.
Motion in a fixed basis needs at least two modes in quadrature, per wavenumber.
This is why the rank-2 truncation gets motion perfect, two is the exact budget for a travelling wave.


### POD Modes

#### Spatially Orthonormal
Spatial orthonormality is the first of two defining properties of POD.
On the interval, \\([0, 2\pi]\\),
$$
\int_0^{2\pi}\!\cos kx\cos k'x \, dx = \pi\delta_{kk'},\quad \int_0^{2\pi}\!\sin kx \sin k'x \, dx = \pi\delta_{kk'},\quad \int_0^{2\pi}\!\cos kx\sin k'x \, dx = 0.
$$
The last holds for all \\(k, k'\\) including \\(k = k'\\), which makes two members of a pair orthogonal to each other.

Every mode carries the factor \\(G(y)\\), so the \\(y\\) integral contributes one common constant \\(\int G^2 dy\\) that divides out in normalisation.
Orthogonality is settled entirely in \\(x\\), and the shared \\(y\\)-profile means every mode normalises by the same number, so the ordering is governed by amplitude alone.

#### Temporally Uncorrelated Coefficients
Temporally uncorrelated coefficients are the second defining property of POD.
It has the requirement that \\(\langle a_i a_j \rangle = 0\\) for \\(i \neq j\\), where the brackets average over snapshot columns and not a continuum.
This makes it discrete.
With \\(\theta_j = 2\pi j / m\\),
$$
\sum_{j=0}^{m-1} e^{i(k - k')\theta_j} = \frac{e^{i2\pi(k-k')} - 1}{e^{i2\pi(k-k')/m} - 1} = 0 \quad\text{unless } k \equiv k' \!\!\pmod m.
$$
The numerator vanishes because \\(k - k'\\) is an integer.
This is the orthogonality of the \\(m\\)-th roots of unity, and it is exact in exact arithmetic rather than an approximation that improves with more samples.

But look at the condition that made it work: exactly \\(m\\) equally spaced points covering exactly one full period, with the endpoint excluded.
Which is `np.linspace(0, T, nt, endpoint=False)` over `T = 2 * np.pi / speed`.
Include the endpoint and one position is sampled twice, so the roots of unity are no longer complete, the geometric sum doesn't telescope, cross-correlations leak, and the modes rotate away from Fourier.

#### Why These Two Make Them the POD Modes
Suppose you have any expansion \\(u = \sum_j a_j \phi_j\\) with \\(\\{\phi_j\\}\\) orthonormal and \\(\langle a_i a_j \rangle = \lambda_i \delta_{ij} \\).
Form the correlation operator,
$$
R = \langle u \otimes u\rangle = \sum_{i,j}\langle a_i a_j\rangle \, \phi_i \otimes \phi_j = \sum_j \lambda_j \, \phi_j \otimes \phi_j,
$$
the cross terms die because of the second property, and what's left is a spectral decomposition of \\(R\\).
The spectral decomposition of a symmetric operator is unique up to rotation inside degenerate eigenspaces.
So \\(\phi_j\\) are the eigenfunctions of \\(R\\), which is what POD modes are.
From this, you can directly read off the eigenvalues: \\(\lambda_j = \langle a_j^2\rangle\\).
Because \\(\lambda_{2k-1} = \lambda_{2k}\\), the eigenspace is 2D and the cos/sin split in it is arbitrary.


### Reconstructed Traveling Vortex from POD Modes
The reconstruction is the mean field plus the retained modes weighted by their coefficients,

$$
\hat{X} = \Phi_r A_r + \bar{x} \mathbb{1}^T,
$$

and the mean term is not a small correction here.
Averaged over a full transit the blob smears into a horizontal stripe at \\(y = \pi\\), which is a substantial piece of the field, so dropping it leaves a reconstruction oscillating around zero.

#### Sharper Features Living in Higher Modes
Each pair is one wavenumber, and \\(k\\) grows as you go down the spectrum, so the sharper features live in the higher modes.
Rank two nails the motion and gets the shape badly wrong.
Adding pairs narrows the peak and cancels the overshoot, which is the job the rest of the spectrum is doing.

#### Rank Feature Dominance
At \\(w = 0.5\\) the leading pair holds \\(61\%\\) of the fluctuation energy, and that \\(61\%\\) buys the motion and almost none of the shape.
The reconstruction runs from \\(-0.15\\) to \\(0.55\\) against the truth's \\(0\\) to \\(1\\): too wide, too smooth, and undershooting the peak by nearly half.
A flow with one degree of freedom is being charged dozens of modes, and the first two of them are spent entirely on getting the blob into the right place.

<figure>
  <img src="/assets/img/pod_rank2_reconstruction.png" alt="Side by side vorticity fields at a quarter transit: the true compact Gaussian blob, and the rank-two reconstruction as a wide smeared lump with a blue negative trough behind it." loading="lazy" />
  <figcaption>Truth against the rank-two reconstruction at a quarter transit. The position is exact; the shape is roughly twice too wide, peaks at about half the height, and trails a negative lobe.</figcaption>
</figure>

<figure>
  <img src="/assets/img/pod_rank2_reconstruction.gif" alt="Animation of the travelling blob beside its rank-two reconstruction over one full transit." loading="lazy" />
  <figcaption>The same pair over a full transit. The reconstruction tracks the motion perfectly and never resembles the blob.</figcaption>
</figure>


### Travelling Vortex Features

#### Negative Reconstruction
Rank two keeps only \\(k = 1\\), so the reconstruction is the mean stripe plus a single cosine in \\(x\\) with a travelling phase.
A cosine has a negative half, and that negative half is the trough sitting half a box behind the reconstructed blob.
It is not a glitch or a numerical failure but the exact optimal rank-two answer, and it is negative because we are truncating the Fourier series of a strictly positive function.

#### Mode Pairs
The pairs are why the motion survives truncation at all.
A single mode is a standing wave and cannot translate; it takes two, in quadrature, to produce a travelling one.
Truncating to one pair therefore keeps the translation perfectly intact while discarding everything that described the shape.

#### Descriptor Pairs
The phase-portrait circle is the state-space loop projected onto the plane spanned by \\(\phi_1\\) and \\(\phi_2\\).
So the animation and the phase portrait are the same object seen two ways, and what the rank-two reconstruction draws in physical space is exactly what that circle traces in mode coordinates.
That is also why the motion comes out perfect: the projection onto the pair's plane is a perfect circle, and everything the loop does outside that plane is the shape information that rank two throws away.

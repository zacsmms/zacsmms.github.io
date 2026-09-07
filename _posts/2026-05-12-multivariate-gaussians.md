---
title: Multivariate Gaussian PDFs
date: 2026-05-12
tags: [probability, fundamentals]
description: Deriving multivariate Gaussian PDFs from the 1D case, with marginals and conditionals.
---

Gaussian probability density functions (PDFs) provide a new domain to understand 3-dimensional information using Gaussian Splatting (Kerbl et al., 2023). This technique, influenced by Neural Radiance Fields (Mildenhall et al., 2020), opened up deep learning techniques without the high compute barrier of the neural network representation.

Here I derive the basic properties of multivariate gaussians from fundamentals.

## 1D Gaussian PDF

The 1D Gaussian PDF is of the form,

$$
p(x) = \frac{1}{\sqrt{2 \pi \sigma^2}} \exp\left( -\frac{(x - \mu)^2}{2 \sigma^2} \right),
$$

where \\(\sigma\\) is the standard deviation (\\(\sigma^2\\) the variance), controlling the spread of the gaussian simultaneously with the peak height, and \\(\mu\\) is the mean. This equation is alternatively a normal distribution and describes a standard probability distribution found across a variety of statistical scenarios.

## 2D Gaussian PDF for Independent Variables

A logical next step is how to define the Gaussian PDF in 2D; if we can define a Gaussian PDF in 2D then we can define an N-dimensional Gaussian PDF. We start off from the case of independent variables, which is just a resulting product of Gaussian PDFs,

$$
p(x_1, x_2) = p(x_1) \cdot p(x_2) = \frac{1}{2 \pi \sigma_1 \sigma_2} \exp\left( -\frac{(x_1 - \mu_1)^2}{2 \sigma_1^2} - \frac{(x_2 - \mu_2)^2}{2 \sigma_2^2} \right),
$$

with two independent variances and means. The resulting Gaussian PDF is allegorically a series of concentric ellipses with increasing distance between them. Then, let \\(x = [x_1, x_2]\\) and \\(\mu = [\mu_1, \mu_2]\\) and we rewrite the equation,

$$
p(x_1, x_2) = \frac{1}{2 \pi |A|^{1/2}} \exp\left( -\frac{(x - \mu)^T A^{-1} (x - \mu)}{2} \right),
$$

where

$$
A = \begin{pmatrix} \sigma_1^2 & 0 \\ 0 & \sigma_2^2 \end{pmatrix}
$$

is the covariance matrix in this independent case (note \\(\lvert A \rvert^{1/2} = \sigma_1 \sigma_2\\), so the prefactor agrees with the product form above). Its diagonal entries scale the two axes independently, so the level sets of \\(p\\) are axis-aligned ellipses — circles when \\(\sigma_1 = \sigma_2\\).

<figure>
  <img src="/assets/img/multivariate_gaussian_independent.png" alt="2D Gaussian sample with zero correlation; 1σ, 2σ, 3σ level sets are axis-aligned ellipses." loading="lazy" />
  <figcaption>2D Gaussian sample with zero correlation; 1σ, 2σ, 3σ level sets are axis-aligned ellipses.</figcaption>
</figure>

## 2D Gaussian PDF for Dependent Variables

Here we consider the exponent; its form is

$$
-\frac{(x - \mu)^T A^{-1} (x - \mu)}{2}.
$$

The missing piece of \\(A\\) is the covariance between the variables. We extend the matrix to include those off-diagonal dependence components. The covariance between \\(x_1, x_2\\) is

$$
\text{cov}[x_1, x_2] = \mathbb{E}[(x_1 - \mu_1)(x_2 - \mu_2)],
$$

the expectation of the product between the centred variable components. The covariance matrix can therefore be defined as,

$$
\Sigma = \begin{pmatrix} \text{var}(x_1) & \text{cov}(x_1, x_2) \\ \text{cov}(x_2, x_1) & \text{var}(x_2) \end{pmatrix},
$$

where the off-diagonal entries \\(\text{cov}(x_1, x_2) = \text{cov}(x_2, x_1)\\) are equal because covariance is symmetric by definition. The resulting PDF is,

$$
p(x_1, x_2) = \frac{1}{2 \pi |\Sigma|^{1/2}} \exp\left( -\frac{(x - \mu)^T \Sigma^{-1} (x - \mu)}{2} \right).
$$

Geometrically, the off-diagonal terms rotate the level sets away from the coordinate axes — the ellipses tilt in the direction of correlation.

<figure>
  <img src="/assets/img/multivariate_gaussian_dependent.png" alt="Same sample re-shaped with correlation rho = 0.5; the level-set ellipses now tilt along the principal axes of Sigma." loading="lazy" />
  <figcaption>Same sample re-shaped with correlation \(\rho = 0.5\); the level-set ellipses now tilt along the principal axes of \(\Sigma\).</figcaption>
</figure>

## ND Gaussian PDF for Dependent Variables

The generalisation to \\(N\\) variables follows the same pattern. \\(\Sigma \in \mathbb{R}^{2 \times 2} \rightarrow \mathbb{R}^{N \times N}\\) keeps variances along the diagonal and fills the off-diagonals with covariances; the vectors \\(x, \mu \in \mathbb{R}^2 \rightarrow \mathbb{R}^N\\) simply grow in length. In the independent case the prefactor is a product of 1D normalisers,

$$
\prod_{i=1}^N \frac{1}{\sqrt{2 \pi \sigma_i^2}} = \frac{1}{(2 \pi)^{N/2} \prod_i \sigma_i},
$$

which generalises to \\(1 / ((2 \pi)^{N/2} \lvert \Sigma \rvert^{1/2})\\) in the dependent case (note \\(\lvert \Sigma \rvert = \prod_i \sigma_i^2\\) when \\(\Sigma\\) is diagonal, recovering the product form). The resulting equation is

$$
p(x_1, x_2, \ldots, x_N) = \frac{1}{(2 \pi)^{N/2} |\Sigma|^{1/2}} \exp\left( -\frac{(x - \mu)^T \Sigma^{-1} (x - \mu)}{2} \right).
$$

## Marginals of Joint Gaussian Distributions

We now move on with deriving conditional probabilities.

### 2D Independent Variables

This is the simplest case, solved logically or mathematically. The equation for the gaussian is a density function, so we can integrate over one variable,

$$
p(x_1) = \int_{-\infty}^{\infty} p(x_1, x_2) \,dx_2 = \int_{-\infty}^{\infty} p(x_1) p(x_2) \,dx_2 = p(x_1) \int_{-\infty}^{\infty} p(x_2) \,dx_2,
$$

where the factorisation is allowed because the PDFs are independent. The result is just \\(p(x_1)\\) because the area under a gaussian PDF is 1 (the total probability). Alternatively, you can notice that the marginal, if not conditioned on any other variable, results in an independent PDF.

### 2D Dependent Variables

For the dependent case, we consider the equation from before,

$$
p(x_1, x_2) = \frac{1}{2 \pi |\Sigma|^{1/2}} \exp\left( -\frac{(x - \mu)^T \Sigma^{-1} (x - \mu)}{2} \right).
$$

The conditional probability can be found from

$$
p(x_2 | x_1) = \frac{p(x_1, x_2)}{p(x_1)},
$$

where the denominator is the familiar 1D Gaussian PDF. Let \\(\rho = \text{cov}(x_1, x_2) / (\sigma_1 \sigma_2)\\) be the correlation, so that \\(\lvert \Sigma \rvert = \sigma_1^2 \sigma_2^2 (1 - \rho^2)\\) and the joint quadratic form expands as

$$
(x - \mu)^T \Sigma^{-1} (x - \mu) = \frac{1}{1 - \rho^2}\left[\frac{(x_1 - \mu_1)^2}{\sigma_1^2} - \frac{2 \rho (x_1 - \mu_1)(x_2 - \mu_2)}{\sigma_1 \sigma_2} + \frac{(x_2 - \mu_2)^2}{\sigma_2^2}\right].
$$

Completing the square in \\(x_2\\) separates it into a piece depending on \\(x_2\\) and one that does not,

$$
(x - \mu)^T \Sigma^{-1} (x - \mu) = \frac{[(x_2 - \mu_2) - \rho (\sigma_2 / \sigma_1)(x_1 - \mu_1)]^2}{\sigma_2^2 (1 - \rho^2)} + \frac{(x_1 - \mu_1)^2}{\sigma_1^2}.
$$

The second term, together with the matching factor in the joint's normalisation, is exactly \\(p(x_1)\\), which cancels in the ratio. What remains is itself a 1D Gaussian in \\(x_2\\),

$$
p(x_2 | x_1) = \frac{1}{\sqrt{2 \pi \sigma_2^2 (1 - \rho^2)}} \exp\left( -\frac{(x_2 - \mu_{2|1})^2}{2 \sigma_{2|1}^2} \right),
$$

with conditional mean and variance

$$
\mu_{2|1} = \mu_2 + \rho \frac{\sigma_2}{\sigma_1}(x_1 - \mu_1), \qquad \sigma_{2|1}^2 = \sigma_2^2 (1 - \rho^2).
$$

So observing \\(x_1\\) shifts the mean of \\(x_2\\) along the regression line and shrinks its variance by a factor of \\((1 - \rho^2)\\). In the general \\(N\\)-D case the same algebra (block-matrix inversion) gives

$$
p(x_b | x_a) = \mathcal{N}\bigl(\mu_b + \Sigma_{ba} \Sigma_{aa}^{-1}(x_a - \mu_a),\; \Sigma_{bb} - \Sigma_{ba} \Sigma_{aa}^{-1} \Sigma_{ab}\bigr).
$$

<figure>
  <img src="/assets/img/multivariate_gaussian_conditional.png" alt="Conditioning on y = 3 slices the joint cloud (top); the resulting 1D conditional density p(x mid y) has mean shifted along the regression line and variance shrunk by (1 - rho^2) (bottom)." loading="lazy" />
  <figcaption>Conditioning on \(y = 3\) slices the joint cloud (top); the resulting 1D conditional density \(p(x \mid y)\) has mean shifted along the regression line and variance shrunk by \((1 - \rho^2)\) (bottom).</figcaption>
</figure>

## Conclusion

This concludes the overview on multivariate Gaussian PDFs, there's many applications of Gaussian's so understanding their basics is very important. If you are reading this and on your path to begin your academic career, I highly recommend deriving this yourself and coding up visualisations to help you understand the way the components interact.

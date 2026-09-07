---
title: Least Squares from 4 Angles
date: 2026-05-15
tags: [linear-algebra, fundamentals]
description: Covering Least Squares solutions from the goal of describing the Moore-Penrose Pseudoinverse.
---

This topic was not one I expected to misunderstand so much. For a topic in Machine Learning, Least Squares is one of the fundamentals by far. However, it has more nuance and interoperable techniques that I've touched upon prior.

For this post, I'll approach Least Squares from 1 angle, to do that we need to explore the Moore-Penrose Pseudoinverse.

The motivation for the Pseudoinverse is best understood geometrically before tackling the mathematics. Consider first a matrix A:

$$
A = \begin{pmatrix} 1 & 3 \\ 2 & 0 \\ 3 & 0 \end{pmatrix}.
$$

This is a rectangular matrix that has column vectors \\(v_1 \text{ and } v_2\\) which define the column space (space defined by any linear combination of them). Defining the linear combination of them in this way we can understand the column space as a plane containing the region describable with them. The resulting graph looks as such!

<figure>
  <img src="/assets/img/column_space.png" alt="Column space of two vectors creating a plane described in grey." loading="lazy" />
  <figcaption>Column space of two vectors creating a plane described in grey.</figcaption>
</figure>

This is a unitary portion of the overall column space for simplicity, but it spans in all directions achievable by their linear combination. Feel free to play around with this yourself. Remember that this describes the column space because it is the vectors defined by the columns of matrix A.

Now, any point defined in the column space is easily projected with the pseudoinverse of matrix A back to where it would have lied on the 3D graph axes known so well! As seen in the image prior, I've defined a point in that space right at the centre of the column space of a half combination of both column vectors. The pseudoinverse of A is non-trivial but it is,

$$
A^{+} = \begin{pmatrix} 5.61218077\text{e-}17 & 1.53846154\text{e-}01 & 2.30769231\text{e-}01 \\ 3.33333333\text{e-}01 & -5.12820513\text{e-}02 & -7.69230769\text{e-}02 \end{pmatrix},
$$

Not exactly the prettiest, but it does result in a known location for the half point in A's column space, directly at point (0.5, 0.5) luckily (or mayhaps not luck)!

The point of contention here is that an inverse for this case was only easy because the point was described in a square portion of the matrix that we needed to consider. Non-square inverse matrices are not exactly a real concept, so we fill in the gap by introducing the Moore-Penrose Pseudoinverse, which happens to be exactly what was used to produce the non-square inverse matrix seen prior.

To continue on the geometric understanding of the motivation, we were lucky enough to have a point described in the column space which consists of exactly 0 elements defined outside of a square portion of that matrix. If we had a point slightly above the surface, without the pseudoinverse it would be impossible to generate a description of it in the column-space of A. And that is effectively all but 2-dimensions accounted for by A, so there's a lot of space missing and lots of possible points that we miss! To visualise this, here is a 2D example of two points, one lying on the surface, another lying outside the surface.

<figure>
  <img src="/assets/img/basis_column.png" alt="Basis space and column space representation of two points, one lying in the column space and one lying outside of it." loading="lazy" />
  <figcaption>Basis space and column space representation of two points, one lying in the column space and one lying outside of it.</figcaption>
</figure>

Here, there are two lines defining a 1-dimensional space where 2-dimensions can be described. The green point lies in the plane and is easily defined by the square components of the matrix. The red point lies outside the plane and relies on a column space description that extends to the second dimension, so an additional matrix component needs to define the value. The red point respectively gets projected into column space roughly above the centre between the green point and the end of the blue vector.

Now for the mathematical intuition, consider a rectangular matrix A and its SVD,

$$
A = U \Sigma V^T,
$$

as we showed in the previous post, the matrices U and V are square individually, but not in combination. The property that we want the pseudoinverse to hold is this,

$$
A^+ = V \Sigma^+ U^T,
$$

now is where we consider a goal to help us approach a definition, a sort of definition by characterisation. The goal is to find the pseudoinverse of course, but why we're here in the first place is to understand Least Squares! That is minimising x for,

$$
||Ax - b||,
$$

where A is our matrix that is not of equal size, b is some point in basis space, and x is the value we're looking to minimise. We start by defining two terms,

$$
c = U^T b,
$$

$$
z = V^T x.
$$

V forms an orthonormal set so it follows that,

$$
x = Vz \rightarrow ||x|| = ||z||,
$$

therefore,

$$
Ax = U\Sigma z,
$$

and

$$
||Ax - b|| = ||\Sigma z - c||.
$$

Which reduces the problem to a diagonal problem, because \\(\Sigma\\) is diagonal. A search over a diagonal only cares about the rank r, resulting in,

$$
||\Sigma z - c||^2 = \sum_{i=1}^r (\sigma_i z_i - c_i)^2 + \sum_{i=r+1}^M c_i^2.
$$

Now because we're minimising a Least Squares problem, this results in the term by term component,

$$
\sigma_i z_i - c_i = 0 \rightarrow z_i = \frac{c_i}{\sigma_i}.
$$

Despite this solution for z being optimal, we have too many options of the fraction definition. To pick the best one, we need to pick the point of the column space closest to the origin, which looks like,

$$
||z||^2 = \sum_{i\leq r} z_i^2 + \sum_{i > r} z_i^2.
$$

Which drives each component to 0, for every \\(i > r\\). What this means is that we define every component up to the base of the column space, after which nothing! In other words, this describes \\(\Sigma \in \mathbb{R}^{n \times m}\\), so x becomes,

$$
x = V \Sigma^+ U^T b.
$$

Which holds for every b so the operator that produces the best x is,

$$
A^+ = V \Sigma^+ U^T.
$$

What an interesting result! Randy Pausch would be proud of showing you both head fakes and actually going both directions at the same time. What we've done here has been coming in with the goal of understanding the Least Squares, but needing to define the Moore-Penrose pseudoinverse and using both as stepping stones for each other to solve each; despite the pseudoinverse being naturally harder to derive from first principles.

# Conclusion

This is probably the best approach you can take to understand both topics at once. I highly recommend readers derive from first principles, the Least Squares scenario via algebra, geometry, SVD, and probability. If you need hints, the topics of my two prior posts should give you enough headway. Also if you want some spare reading, that little mention I put in of Prof. Pausch is a great place to look, he felt like a modern-day Feynman! But maybe that is just a hint that most professors in our field have lots to say, just only a few have or had a platform to share it. Regardless, check out The Last Lecture!

And here's a boring Least Squares graph, because there can only be space for one cool topic like the pseudoinverse!
<figure>
  <img src="/assets/img/least_squares.png" alt="Boring Least Squares problem..." loading="lazy" />
  <figcaption>Boring Least Squares problem...</figcaption>
</figure>

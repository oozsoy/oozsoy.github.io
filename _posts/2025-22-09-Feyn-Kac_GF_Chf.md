---
title: Feynman-Kac theorem, Green's and Characteristic Functions
date: 2025-09-21 15:00:00 -500
categories: [Finance]
tags: [derivative pricing, options]     # TAG names should always be lowercase
description: I have a closer look at the derivative pricing under the lens of Feynman-Kac theorem to (re)-discover some useful mathematical structures well known for the PDE practitioners and Statisticians  
math: true
---

In a previous post, I have discussed the [Feynman-Kac theorem]({{ site.baseurl }}{% post_url 2025-09-18-Feynman-Kac %}) that ties the PDE of a derivative contract and its solution as an expectation under a special probability measure (risk-neutral $\mathbb{Q}$-measure). In light of the theorem, we can simply value a derivative contract on an underlying $S$ by the discounted expectation of its pay-off. In particular, at any time prior to its maturity $t < T$ (assuming we are dealing with a European type contract with a fixed maturity time at $T$ and constant interest rate $r$), its value can be computed via

$$
\begin{equation}
\label{rnp}
V(t,S_t) = \mathrm{e}^{-r (T-t)}\, \mathbb{E}_{\mathbb{Q}}\left[H(T,S_T) \big | \mathcal{F}(t)\right],
\end{equation}
$$

where $H$ is the pay-off. It is worth noting that, in eq. \eqref{rnp} we have implicitly assumed that all the information available up to time $t$ is represented by the stock price $S_t$ but for complicated contracts (e.g path dependent) this state space might need to be extended to deterministically price the contract. Furthermore, for such complicated contracts the pay-off may not be just a function of the stock price at the maturity. Keeping this in mind, for the sake of clarity, the scope of our discussion will be based on the simple picture implied by eq. \eqref{rnp}. 

#### Green's function as discounted conditional probability density of stock price
-----

Written in the integral form, eq. \eqref{rnp} reveals additional mathematical structures that we are familiar from the PDE terminology:

$$
\begin{align}
\nonumber V(t,S_t) &= \int \, \mathrm{e}^{-r (T-t)}\, f_S\left(T, S_T\,;t, S_t\right)\,H(T,S_T)\, \mathrm{d}S_T,\\
\label{rnp_gf}&= \int G_S(T,S_T\,;t,S_t) \,H(T,S_T)\, \mathrm{d}S_T 
\end{align}
$$

where $f_S$ denotes the *transition probability* of the underlying from the state $S_t$ at time $t$ to $S_T$ at the maturity $T$ and $G_S$ can be identified as the Green's function of the PDE of $V(t,S_t)$: 

$$
\begin{equation}\label{gfd}
G_S(T,S_T\,;t,S_t) \equiv  \mathrm{e}^{-r (T-t)}\, f_S\left(T, S_T\,;t, S_t\right),
\end{equation}
$$

which is also commonly referred as the *fundamental solution* because by virtue of \eqref{rnp_gf}, it satisfies the underlying PDE that $V$ satisfies. In this context, the Green's function "propagates" the terminal condition (the pay-off) to generate a solution at early times $t < T$ that complies with PDE. As an example, consider that we are in the realm of classic Black-Scholes world where the underlying process is a GBM with constant volatility, in this case we have 

$$
\left(\partial_t + r s\, \partial_s + \frac{\sigma^2 s^2}{2}\partial_{ss} - r\right)V(t,s) = \int \left(\partial_t + r s\, \partial_s + \frac{\sigma^2 s^2}{2}\partial_{ss} - r\right) G_s(T,y\,;t,s)\, H(T,y)\, \mathrm{d}y.
$$

Since $V$ is a solution to the PDE with terminal condition $V(T,y) = H(T,y)$ and since this must hold for every admissible pay-off $H$, the only way the integral can vanish for all such pay-offs is that the Green's function satisfies:

$$
\left(\partial_t + r s\, \partial_s + \frac{\sigma^2 s^2}{2}\partial_{ss} - r\right) G_s(T,y\,;t,s) = 0, \quad\quad \lim_{t \to T} G_s(T,y\,;t,s) = \delta(y-s). 
$$

Taking account the discounting factor in \eqref{gfd}, we can then obtain the PDE that the transition probability density satisfies,

$$
\begin{equation}
\nonumber
\left(\frac{\partial}{\partial t} + r S_t \frac{\partial}{\partial S_t} + \frac{\sigma^2 S_t^2}{2}\frac{\partial^2}{\partial S_t^2}\right) f_S\left(T, S_T\,;t, S_t\right) = 0, \quad\quad \lim_{t \to T} f_S\left(T, S_T\,;t, S_t\right) = \delta (S_T - S_t),
\end{equation}
$$

which is commonly known as the backward [Kolmogorov](https://en.wikipedia.org/wiki/Kolmogorov_backward_equations_(diffusion)) equation. Here, the terminal condition appears more like a consistency check: as we approach to the maturity of the contract, future becomes the present and the probability density collapses to a point "mass", $S_t \to S_T$, acknowledging with confidence the fact that the underlying process is at $S_T$ at that moment. On the other hand, from the perspective of the Kolmogorov PDE, which essentially describes a backward evolution, we expect the density to spread out for $t < T$. In order to see this, we first switch to log "spatial" coordinates $z \equiv \ln S_t$ to re-write the PDE

$$
\begin{align}
\nonumber \frac{\partial f_S}{\partial t} + &r \frac{\partial f_S}{\partial z} + \frac{\sigma^2}{2} \left(\frac{\partial^2 f_S}{\partial z^2} - \frac{\partial f_S}{\partial z}\right) = 0,\\
 f_S(T, S_T\,;T, S_T) &= \delta(\mathrm{e}^z - S_T) \equiv \frac{1}{S_T}\delta (z - \ln S_T)
\end{align}
$$

where in the first line, we have utilized the chain rule in the term that is second order in derivatives: 

$$
\begin{align}
\nonumber \frac{\partial^2 f}{\partial S^2} &= \frac{\partial z}{\partial S} \frac{\partial f}{\partial z} \left(\frac{1}{S} \frac{\partial f}{\partial z}\right),\\
\nonumber &= \frac{1}{S^2} \frac{\partial^2 f}{\partial z^2} + \frac{1}{S} \frac{\partial f}{\partial z} \frac{\partial}{\partial z}\left(\frac{1}{S}\right),\\
\label{fSL}&= \frac{1}{S^2} \left(\frac{\partial^2 f}{\partial z^2} -  \frac{\partial f}{\partial z}\right).
\end{align}
$$

We then switch to "time-to-maturity" variable $\tau = T - t$ for convenience and shift the new spatial coordinate via $y = z + (r - \sigma^2/2)\tau$ to kill the term linear order in the spatial derivative. This procedure lead us to the well known heat equation 

$$
\frac{\partial f_S}{\partial \tau} = \frac{\sigma^2}{2} \frac{\partial^2 f_S}{\partial y^2} \quad\quad \lim_{\tau \to 0}\,f_S(\tau, y) = \frac{1}{S_T} \delta (y - \ln S_T).
$$

The solution that satisfies the modified boundary condition above has the Gaussian form

$$
f_S(\tau,y) = \frac{1}{S_T\sqrt{2\pi \sigma^2\tau}} \mathrm{e}^{- \left(\ln S_T-y\right)^2 / (2\sigma^2\tau)}.
$$

In terms of the original variables, this give rise to standard result for the terminal distribution of the stock price in the Black-Scholes world (see. e.g [here]({{ site.baseurl }}{% post_url 2024-07-02-RN_Options %})), which has the log-normal form

$$
\begin{align}
\nonumber f_S(T,S_T\,;t, S_t) &= \frac{1}{S_T\sqrt{2\pi \sigma^2 (T-t)}} \exp \left[-\frac{(\ln S_T - \ln S_t - (r-\sigma^2/2)(T-t))^2}{2 \sigma^2 (T-t)}\right],\\\nonumber\\
\label{fSfin}\ln S_T | S_t &\sim \mathcal{N}(\ln S_t + (r - \sigma^2 /2)(T-t), \sigma^2 (T-t)).
\end{align}
$$

Notice that we can equivalently interpret the transition probability density as a conditional one in the sense that it describes the conditional pdf of the terminal stock price given the process is currently at $S_t$. This makes clear why the log-normal distribution spreads out as time to maturity increases: the variance of $\ln S_T$ grows linearly with $\tau = T-t$, reflecting the fact that uncertainty accumulates the longer we project into the future.

While this preliminary example is useful for building intuition about the link between the value of a derivative contract and the probability density of its underlying, the realities of financial markets often require us to consider more complex dynamics for valuation. These include stochastic volatility models (e.g. Heston), jump processes (e.g. Merton jump-diffusion, Kou double exponential), and multi-factor interest rate models (e.g. Hull–White). In such cases, the conditional density $f_S(T,S_T\,; T, S_t)$ is typically *not* available in closed form because additional state variables (such as stochastic variance or jump components) and higher-dimensional dynamics make the distribution analytically intractable. In these settings, a powerful alternative is to work with the **characteristic function** of the process, which is often available in closed form even when the density itself is not. This is what I would like to introduce briefly as a way extracting the density of the underlying process and hence to price derivative contracts via Feynman-Kac theorem. 

#### Characteristic function for pricing
-----

In situations where the conditional density of the underlying is not available in closed form, a powerful tool is the characteristic function of the process. Recall that for a random variable $X$, the characteristic function is defined as 

$$
\varphi_X(u) \equiv \mathbb{E}[\mathrm{e}^{i u X}] = \int \mathrm{e}^{i u x}\, f_X(x) \, \mathrm{d}x,
$$

which is simply the **Fourier transform** of its probability density. Once known, the density can be recovered by inverse Fourier transform:

$$
f_X(x) = 
\frac{1}{2\pi} \int \mathrm{e}^{-i u x}\, \varphi(u)\, \mathrm{d}u.
$$

This duality can be handy for derivative pricing, if we could find a way to independently compute $\varphi(u)$ because we can use Fourier inversion techniques (such as [Carr–Madan Fast Fourier Transform (FFT)](https://www.ma.imperial.ac.uk/~ajacquie/IC_Num_Methods/IC_Num_Methods_Docs/Literature/CarrMadan.pdf) or the [COS method](https://ir.cwi.nl/pub/17043/17043B.pdf) that I would like to dive into in a separate post) to evaluate derivative prices without ever needing an explicit density.

**From PDE to ODE**: How can we obtain $\varphi$ in practice? To illustrate the main idea briefly, we will focus on a simple GBM based derivative dynamics. Note that of course, determining the characteristic function here is redundant as we can solve the SDE exactly to get the transition probability density analytically. Concretely, let us consider the log-process of the stock price $X_t = \ln S_t$ 

$$
\mathrm{d}X_t = \left(r - \frac{\sigma^2}{2}\right)\mathrm{d}t + \sigma\, \mathrm{d}W_{Q}. 
$$

We then define *discounted characteristic function* via Feynman-Kac theorem by a clever choice of the pay-off 

$$
\varphi_X(u\,; t,T) = \mathrm{e}^{-r (T-t)} \mathbb{E}_{\mathbb{Q}}\left[\varphi_X(u\,; T,T)\big | \mathcal{F}(t)\right], \quad\quad \varphi_X(u\,; T,T) \equiv H(T,X_T) = \mathrm{e}^{i u X_T}.
$$

Writing it in the integral form might inform us about the PDE that the characteristic function satisfies,

$$
\varphi_X(u\,; t,T) = \mathrm{e}^{-r (T-t)} \int \mathrm{e}^{i u X_T}\, f_X(T,X_T\,;\,t,X_t)\, \mathrm{d}X_T.
$$

Recall that we have derived earlier the PDE satisfied by the probability density in the log coordinates \eqref{fSL}. This prompt us to conclude that the characteristic function satisfies the Black-Scholes PDE in the log coordinates:

$$
\begin{equation}\label{pdechF}
\left[\frac{\partial}{\partial t} + \left(r - \frac{\sigma^2}{2}\right) \frac{\partial}{\partial X_t} + \frac{\sigma^2}{2}\frac{\partial^2}{\partial X_t^2} - r\right] \varphi_X\left(u\,;\,t, T\right) = 0, \quad\quad \varphi_X(u\,; T,T) = \mathrm{e}^{i u X_T}.
\end{equation}
$$

Now comes the part where the exponential form simplifies things, turning the PDE above to an ODE in time. To see this we consider the ansatz 

$$
\varphi_X\left(u\,;\,t, T\right) = \mathrm{e}^{i u X_t + a(u\,;\,t,T) - r(T-t)},\quad\quad a(u\,;\,T,T) = 0,
$$

in \eqref{pdechF}, which give rise to a simple ODE for $a(u;t,T)$: 

$$
\partial_t a(u\,;\,t,T) = -iu \left(r - \frac{\sigma^2}{2}\right) + \frac{u^2\sigma^2}{2},
$$

which is much simpler to solve as compared to a PDE. Considering the terminal condition for $a$ we noted earlier, the solution for the characteristic function read as 

$$
\varphi_X\left(u\,;\,\tau\right) = \exp \left[i u X_t + iu \tau \left(r - \frac{\sigma^2}{2}\right) - \frac{u^2\sigma^2}{2}\tau - r \tau \right].
$$

This is exactly the characteristic function of a normal random variable, confirming that the log process is normally distributed as in \eqref{fSfin}. 

While for a GBM this ODE trick is redundant — since the SDE can be solved explicitly — the very same method becomes essential in models where explicit densities are not available, such as jump-diffusion or stochastic volatility models. In these cases, obtaining closed-form characteristic functions is especially valuable, because they allow us to apply efficient Fourier-based pricing methods within the Feynman–Kac framework. I intend to return to these topics in more detail soon. 


#### **References** 
-----------

**1. "Mathematical Modeling and Computation in Finance", World Scientific, Cornelis W. Oosterlee and Lech A. Grzelak.**


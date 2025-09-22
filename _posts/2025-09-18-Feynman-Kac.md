---
title: Feynman-Kac Theorem
date: 2025-09-18 15:00:00 -500
categories: [Finance]
tags: [derivative pricing, options]     # TAG names should always be lowercase
description: I talk about a fundamental theorem that formalize the connection between risk-neutral and PDE methods for the valuation of financial derivatives. 
math: true
---

In a series of previous posts, I have introduced the [risk-neutral valuation]({{ site.baseurl }}{% post_url 2024-07-02-RN_Options %}) and [the partial differential equation (PDE)]({{ site.baseurl }}{% post_url 2024-05-13-Black_Scholes %}) method for pricing financial derivatives focusing on European vanilla options. We have seen that the two approach converged into a simple theoretical price. In this post, I would like to formalize this equivalency via a theorem that essentially bridges the solution of a PDE to the expected value of a function(al) of a stochastic process. 

The theorem is originally developed jointly by Richard Feynman and Mark Kac in the context of physics applications. Below, I will discuss it in the context of derivative pricing focusing on Black-Scholes PDE. 

**Feynman-Kac Theorem:** Given a money market account (or zero coupon bond price) that evolves deterministically under $\mathrm{d}B(t) = - r B(t)\mathrm{d}t$ with a constant interest rate $r$, we consider the value $V = V(t,S)$ of a derivative contract that is a sufficiently differentiable function of time $t$ and the stock price $S = S(t)$, satisfying generalized Black-Scholes PDE:

$$
\frac{\partial V}{\partial t} + \tilde{\mu}(t,S)\frac{\partial V}{\partial S} + \frac{\tilde{\sigma}^2(t,S)}{2}\frac{\partial^2 V}{\partial S^2}-r V = 0,
$$

defined for $S \in [0,\infty)$ and $t \in [t_0,T]$ subject to boundary condition 

$$
V(T,S(T)) = H(T,S(T)). 
$$

The theorem states that the solution to the above PDE, for any time satisfying $t < T$ is given by the conditional expectation under the risk neutral measure $\mathbb{Q}$:

$$
\begin{equation}\label{bs}
V(t,S) = B(t)\, \mathbb{E}_{\mathbb{Q}}\left[\frac{H(T,S(T))}{B(T)} \bigg| \mathcal{F}(t)\right] = \mathrm{e}^{-r (T-t)}\, \mathbb{E}_{\mathbb{Q}}\bigg[{H(T,S(T))} \bigg| \mathcal{F}(t)\bigg]
\end{equation}
$$

where $B(t) = \mathrm{e}^{-r (T-t)}$ and $\mathcal{F}(t)$ is the filtration indicating the information available about the underlying diffusive process $S$ at time $t$:

$$
\begin{equation}\label{dp}
\mathrm{d}S(t) = \tilde{\mu}(t,S(t))\mathrm{d}t + \tilde{\sigma}(t,S(t))\mathrm{d}W^{\mathbb{Q}}(t).
\end{equation}
$$

**Proof:** Below I present an overview of the proof. For this purpose, we consider the following incremental process 

$$
\begin{equation}\label{dV}
\mathrm{d}\left(\frac{V(t,S)}{B(t)}\right) = - r B(t)^{-1} V(t,S) \mathrm{d}t + B(t)^{-1}\, \mathrm{d}V(t,S).
\end{equation} 
$$

Applying Ito's lemma to the second term, we collect term of order $\mathcal{O}(\mathrm{d}t)$ ($\mathrm{d}W^2 \to \mathrm{d}t$), and noting the process for the stock price \eqref{dp}, we obtain 

$$
\mathrm{d}\left(\frac{V(t,S)}{B(t)}\right) = B(t)^{-1}\left[\frac{\partial V}{\partial t} + \tilde{\mu}(t,S)\frac{\partial V}{\partial S} + \frac{\tilde{\sigma}^2(t,S)}{2}\frac{\partial^2 V}{\partial S^2}-r V\right] \mathrm{d}t +\frac{\tilde{\sigma}(t,S)}{B(t)} \frac{\partial V}{\partial S}\, \mathrm{d}W^{\mathbb{Q}}(t).
$$

Notice that by virtue of the generalized Black-Scholes PDE in \eqref{bs}, the first term vanishes, leaving us with the second term. Keeping this in mind, we integrate both hand side over $\int_t^T\dots$ and take the conditional expectation over the risk neutral measure:

$$
\begin{equation}\label{prin}
\mathbb{E}_{\mathbb{Q}}\left[V(T,S(T)) | \mathcal{F}(t)\right] - \mathrm{e}^{r(T-t)} V(t,S(t)) = \mathbb{E}_{\mathbb{Q}}\left[\int_t^T \, \mathrm{e}^{r(T-t')} \tilde{\sigma}(t',S(t')) \, \frac{\partial V}{\partial S} \, \mathrm{d}W^{\mathbb{Q}}(t')\, \bigg|\,\mathcal{F}(t)\right],
\end{equation}
$$
where in the second term on the left-hand side, we removed the expectation as the relevant information is available at time $t$. 

As long as the integral is well-behaved, the integral over the incremental Wiener process in \eqref{prin} should be normal distributed with zero mean. This fact of course makes sense, as the expression on the left-hand side of represents the gain one would have from holding the contract until the maturity minus investing an amount equal to the contract's value at an earlier time ($t < T$) to a money market account. In the realm of risk-neutral world, we thus should have zero gain from this strategy as otherwise there would be arbitrage opportunities.

Setting the right-hand side of \eqref{prin} to zero, we arrange the terms on the left-hand side to conclude the sketch of the proof: 

$$
V(t,S(t)) = \mathrm{e}^{-r (T-t)}\, \mathbb{E}_{\mathbb{Q}}\bigg[{V(T,S(T))} \bigg| \mathcal{F}(t)\bigg] \equiv \mathrm{e}^{-r (T-t)}\, \mathbb{E}_{\mathbb{Q}}\bigg[{H(T,S(T))} \bigg| \mathcal{F}(t)\bigg].
$$

The theorem therefore formalizes the notion that solving a deterministic PDE to value a derivative contract is equivalent to the calculation of an expectation of a discounted pay-oﬀ function under the risk neutral measure $\mathbb{Q}$.

**Remark:** A subtle but very important point is that we can describe the dynamics of a derivative contract by a deterministic PDE that depends only on the current time $t$ and the current state $S(t)$. This is possible because the underlying price process is **Markov**. The Markov property ensures that conditioning on the entire past information $\mathcal{F}(t)$ (the full history of the process **up to time** $t$) is equivalent to conditioning on the present value alone. In other words, the option value can be written as a function $V(t,S(t))$.

If the underlying were not Markov, the price at time $t$ would in general depend on the entire path $\{S(s): s < t\}$, not just the current state. In that case, the expectation could not collapse to a finite-dimensional PDE, and we would need to carry along the whole history (or add extra state variables to recover Markov property).

#### **Scope of the theorem and its generalizations**
-----

As the discussion above might suggest the Feynman–Kac theorem can be extended beyond the simplest *Black–Scholes* setting (we described above), as long as the state space describing the dynamics of the underlying is Markovian. In other words, whether the complexity comes from a richer model (like stochastic volatility) or from the contract (e.g a path-dependent payoff like an arithmetic Asian) — provided we can represent the system in terms of a Markov process (possibly in higher dimensions), the theorem still applies.

- **Heston Model**: In the classical Black–Scholes model, volatility is assumed to be a constant, $\tilde{\sigma}(t,S) = \sigma S_t$. A first generalization is to let volatility vary deterministically with time, $\tilde{\sigma}(t,S) = \sigma(t) S_t$. This still produces a one-dimensional Markov process for the stock, and the option pricing PDE remains in one spatial dimension and Feynman-Kac theorem applies as we discussed above. 

However, prices in the option markets display structures like volatility smiles or skews, that can not be explained by either constant volatility or a purely deterministic volatility profiles. One way to capture these effects is to consider volatility itself to be random and evolve as a stochastic process. The Heston model achieves this by introducing a variance process $v_t$ that is mean-reverting and stochastic, coupled with the stock price. In the risk-neutral measure, the dynamics can be described by the following couple stochastic processes of the asset price $S_t$ and variance $v_t$

$$
\begin{align}
\nonumber \mathrm{d}S_t &= r\, S_t\, \mathrm{d}t + \sqrt{v_t}\,S_t\, \mathrm{d}W^{(1)}_t,\\
\nonumber \mathrm{d}v_t &= \kappa (\theta - v_t)\mathrm{d}t + \xi \sqrt{v_t} \mathrm{d}W^{(2)}_t,\\
\mathrm{d}W^{(1)}_t \mathrm{d}W^{(2)}_t &= \rho \mathrm{d}t,\label{heston}
\end{align}
$$

where $\kappa$ is the rate of mean reversion, $\theta$ is the long run variance level, $\xi$ is the volatility of variance and $\rho$ is the correlation between asset returns and variance. 
The resulting underlying dynamics in \eqref{heston} is a two-dimensional Markov process $(S_t, v_t)$. The Feynman–Kac theorem still applies, but the derivative price must now solve a two-dimensional PDE, or equivalently, be represented as a risk-neutral expectation conditional on both the current stock price and current variance: 

$$
\begin{equation}\label{heston_rn}
V(t,S_t,v_t) = B(t)\,\mathbb{E}_{\mathbb{Q}}\left[H(T,S_T) \big | \mathcal{F}_t \equiv \{S_t, v_t\}\right]. 
\end{equation}
$$

To prove the equivalence with the PDE method, notice that by virtue of the above equation, $V(t,S_t,v_t)/B(t)$ is a martingale, so that the incremental process $\mathrm{d}(V(t,S_t,v_t)/B(t))$ has zero mean. To show this, we first expand $\mathrm{d}V$,

$$
\begin{align}
\nonumber\mathrm{d} V(t,S_t,v_t) &= \frac{\partial V}{\partial t} \mathrm{d}t + \frac{\partial V}{\partial S_t} \mathrm{d}S_t + \frac{\partial V}{\partial v_t} \mathrm{d}v_t + \frac{1}{2} \left[\frac{\partial^2 V}{\partial S_t^2} \mathrm{d}S_t^2 + \frac{\partial^2 V}{\partial v_t^2} \mathrm{d}v_t^2 + 2 \frac{\partial^2 V}{\partial S_t\partial v_t} \mathrm{d}S_t \mathrm{d}v_t \right]
\end{align}
$$

Using Ito's lemma, we then write the second order spatial derivatives above as expressions linear order in $\mathrm{d}t$: $\mathrm{d}S_t^2 \to v_t S_t^2 \mathrm{d}t$, $\mathrm{d}v_t^2 \to  \xi^2 v_t \mathrm{d}t$, $\mathrm{d}S_t \mathrm{d}v_t \to \xi \rho S_t v_t \mathrm{d}t$. Considering these in \eqref{dV}, the incremental process of the martingale is given by 

$$
\begin{align}
\nonumber \mathrm{d}\left(\frac{V}{B}\right) &= \frac{\mathrm{d}t}{B(t)} \left[{\partial_t V} + r S\,\partial_{S} V + \kappa (\theta - v)\, \partial_{v} V + \frac{v S^2}{2}\, {\partial^2_{SS} V} + \frac{\xi^2 v}{2}\, {\partial^2_{vv} V} +\xi \rho S v\, {\partial^2_{Sv} V} - r V \right]\\\nonumber
&
\\\nonumber
&\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad\quad+ \sqrt{v} S\, {\partial_{S} V}\, \mathrm{d}W^{(1)} + \xi \sqrt{v}\, \partial_{v} V\,\mathrm{d}W^{(2)}.
\end{align}
$$

By construction, we do not expect a reward for the portfolio above in the risk neutral world and so the incremental process have a zero expected value under the $\mathbb{Q}$ measure. The last two terms automatically satisfy this, while the drift term is vanishing as long as value of the derivative satisfies the **Heston PDE**: 

$$
\begin{equation}\label{heston_pde}
{\partial_t V} + r S\,\partial_{S} V + \kappa (\theta - v)\, \partial_{v} V + \frac{v S^2}{2}\, {\partial^2_{SS} V} + \frac{\xi^2 v}{2}\, {\partial^2_{vv} V} +\xi \rho S v\, {\partial^2_{Sv} V} - r V = 0.
\end{equation}
$$

This accounts for the equivalency between the discounted expectation and the PDE method, establishing the validity of Feynman-Kac theorem in this setup. 

Independent of the way we model the underlying, we can illustrate scope of the theorem considering contracts that exhibits path dependent pay-offs.

- **Contracts with path-dependent pay-offs:** Consider a call option contract which has a pay-off that depends on the time average of the stock price until the maturity $T$ such that option will be certainly exercised if this average is above the strike $K$, otherwise have zero value: 

$$
V(T) = H(T) = \textrm{max}\left(\frac{1}{T}\int_{0}^T S_t\,\mathrm{d}t - K, 0\right)
$$ 

The dependence on the previous states of the stock price complicates the application of the discounted expectation. In this case, knowledge of the current stock price $S_t$ alone is not sufficient to determine the contract value via $V(t,S_t)$ before maturity. For example, just prior to expiry, the payoff depends not only on the terminal stock price $S_T$ but also on the running average

$$
A_T = \frac{1}{T}\int_{0}^T S_u \,\mathrm{d}u.
$$

Thus, when working backwards in time, we must keep track of both quantities in order to obtain the contract value at earlier dates. This naturally suggests introducing the extended state

$$
X_t = (S_t, A_t), \quad\quad A_t \equiv \frac{1}{t}\int_{0}^t\,S_u \mathrm{d}u
$$

where $A_t$ is the running average at time $t$. The process $(S_t, A_t)$ is Markov, and the value of the contract can be written as a deterministic function

$$
V(t,S_t,A_t),
$$

which then satisfies a corresponding PDE. This technique—augmenting the state space to restore Markovianity—is a standard approach in valuing path-dependent contracts and highlights how the scope of the Feynman–Kac theorem extends beyond vanilla options: 

$$
V(t,S_t,A_t) = B(t)\, \mathbb{E}_{\mathbb{Q}} \left[\textrm{max}\left(\frac{1}{T}\int_{0}^T S_t\,\mathrm{d}t - K, 0\right) \bigg | \mathcal{F}_t \equiv \{S_t,A_t\}\right].
$$

On the other hand, the 2-D PDE satisfied by $V(t,S_t,A_t)$ can be found as we have done before, considering the extended system

$$
\begin{align}
\nonumber \mathrm{d}S_t &= \tilde{\mu}(t,S_t)\mathrm{d}t + \tilde{\sigma}(t,S_t)\mathrm{d}W^{\mathbb{Q}}_t,\\
\mathrm{d}A_t &= \frac{S_t - A_t}{t}\, \mathrm{d}t.
\end{align}
$$

#### **Conclusions**
-----

As we saw considering two examples across the specturm, the Feynman–Kac theorem is not limited to vanilla calls and puts, or even to simple Black–Scholes dynamics. It applies to essentially any derivative contract, provided the underlying system can be represented as a Markov process — possibly by enlarging the state space to include extra variables such as volatility, interest rates, or running averages. In practice this means the theorem covers the entire spectrum of options: vanillas, barriers, Asians, lookbacks, American contracts (with free-boundary conditions), multi-asset baskets, stochastic-volatility models like Heston, and even credit or jump models (where the PDE becomes an integro-differential equation). What changes is not the validity of the theorem, but the dimension and complexity of the PDE (or expectation) you must solve. It turns out that for low-dimensional problems a PDE is efficient, while in higher dimensions Monte Carlo is typically preferred — but in all cases, the link established by Feynman–Kac remains the backbone of pricing.

#### **References** 
-----------

**1. "Efficient Methods for Valuing Interest Rate Derivatives", Springer Finance, Antoon Pelsser.**

**2. "Mathematical Modeling and Computation in Finance", World Scientific, Cornelis W. Oosterlee and Lech A. Grzelak.**
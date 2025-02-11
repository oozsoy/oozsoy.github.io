---
title: Duality between option prices and probability distributions
date: 2024-08-15 15:00:00 -500
categories: [Finance]
tags: [risk neutral pricing, options, probability duality]     # TAG names should always be lowercase
description: I discuss the two sides of a powerful map that has important practical implications in derivative trading in the financial markets. Relying on the Fundamental theorem of Asset Pricing in finance, this map provides an access to the probability distribution of the underlying asset from observed option prices and vice versa.
math: true
---

In an earlier [post]({{ site.baseurl }}{% post_url 2024-07-02-RN_Options %}), I discussed the idea of risk neutrality and how it can provide a practical mathematical framework for deriving the fair price of European vanilla options. In fact, this pricing method is so fundamental that it is usually referred as a theorem called the Fundamental theory of asset pricing (FTAP): 

- **FTAP:** For a derivative contract with a pay-off determined in terms of a function $D(T,T) = g(S)$ of the underlying at the maturity $T$, the price of the derivative at any time prior to the maturity $t < T$ is given by the discounted expectation of its pay-off under the risk-neutral probability measure. 

This statement simply generalizes risk-neutral valuation concept to all European type derivative contracts given that their value at the maturity is a general function of the underlying price. Described mathematically, we might understand why this could be the case: 

$$
\begin{align}\label{ftpa}
\frac{D(t,T)}{Z(t,T)} = \mathbb{E}_{\mathbb{Q}} \left[\frac{D(T,T)}{Z(T,T)} \bigg |\, S_t\right],
\end{align}
$$

where $Z(t,T) = \mathrm{e}^{-r (T-t)}$ is the value of a zero coupon bond with a unit value at expiry $Z(T,T) = 1$ and $\mathbb{Q}$ represents the risk-neutral probability measure. Now, we know the equation above holds for European vanilla options and the statement that it should hold for all derivative contracts can be justified by the replication idea. In particular, since the pay-off of a European call (or put) is a piece-wise linear function of $S$, we can think of a portfolio of plain vanilla calls that can replicate (as well as possible) the pay-off of any function the underlying price $D(T,T) = g(S)$. Since the expectation in \eqref{ftpa} is a linear operation, then we are done as we have portfolio that is of equal value of another asset at all possible world states of the world, so their (properly discounted) values must agree at prior times by no-arbitrage principle. In a sense, these arguments imply that European vanilla (calls) or puts are the basic building blocks of derivative markets or in other words, European call prices can be considered as a basis that span all European type derivative prices. I will make these arguments mathematically more price later in this post. But first, we consider some simple replication examples and their implications. 

#### **From option prices to the probability distribution of the underlying**
----

Now suppose that we want to price a digital call option struck at $K$. This is an option that is similar to vanilla options in that it has pay-off if the stock price is above the strike at the maturity $S_T > K$, otherwise expires with zero value. It is different in the sense that the pay-off is constant equal to 1, instead of scaling linearly with the stock price $S_T$ above the strike. Put it simply, its pay-off is a Heaviside step function 

$$
\begin{equation}\label{digip}
D(t = T,T,K) = H(S_T - K)
= \begin{cases} 1 \quad\quad S_T > K,\\
0 \quad\quad S_T < K.
\end{cases} 
\end{equation}
$$

We can mimic the value of the digital option by considering a "call spread" which is a portfolio that consist of $\lambda$ long call option struck at $K$ and $\lambda$ short call option struck at $K + 1/\lambda$. Of course, we assume that all the options here on the same underlying. As $\lambda \to \infty$ (or $1/\lambda \to 0$), this portfolio will replicate the digital call pay-off arbitrarily well. Therefore, for any time prior to maturity, it should give the price of the digital in the limit $1/\lambda \to 0$:

$$
\begin{align}
\nonumber D(t,T,K) &= \lim_{\lambda \to \infty} \lambda \left(C(t,T,K) - C(t,T,K + 1/\lambda)\right),\\
\nonumber &\simeq \lim_{\lambda \to \infty} \lambda \left(C(t,T,K) - C(t,T,K) - \frac{1}{\lambda}\frac{\partial C}{\partial K}(t,T,K) + \mathcal{O}(1/\lambda^2)\right),\\
&\simeq - \frac{\partial C}{\partial K}(t,T,K).\label{adigi}
\end{align}
$$

By FTAP \eqref{ftpa} we know that this price is equivalent to the discounted expectation under risk-neutral probability 

$$
\begin{align}
\nonumber D(t,T,K) &= Z(t,T)\, \mathbb{E}_{\mathbb{Q}}[\mathbb{1}_{S_T > K} |\, S_t],\\
\nonumber &= Z(t,T)\, \mathbb{Q}(S_T > K | S_t),\\
&= Z(t,T)\,(1 -  \mathbb{Q}(S_T < K | S_t))\label{ftpadigi}
\end{align}
$$

where $\mathbb{1}$ is the indicator function that is equal to one if $S_T > K$ and otherwise 0 and

$$
\mathbb{Q}(S_T < K | S_t)
$$ 
 
is the cumulative risk-neutral probability given $S_t$. Equating \eqref{ftpadigi} with \eqref{adigi} we therefore obtain: 

$$
\begin{equation}\label{Q}
\mathbb{Q}(S_T < K | S_t) = \int_{0}^{K} f_{\mathbb{Q}| S_t}(S_T)\, \mathrm{d}S_T = 1 + \frac{1}{Z(t,T)} \frac{\partial C}{\partial K},
\end{equation}
$$

where $f$ denotes the probability density function of the spot. This relation simply links the cumulative conditional risk-neutral probability to first partial derivative of the call option price w.r.t strike $K$. Using the fundamental theorem of calculus, we can take an additional partial derivative of the both sides of eq. \eqref{Q} to obtain 

$$
\begin{equation}\label{ctf}
f_{\mathbb{Q} | S_t}(K) = \frac{1}{Z(t,T)} \frac{\partial^2 C}{\partial K^2}. 
\end{equation}
$$

This equation above provide a rather elegant relation between the observed call prices and the probability density function of the random variable that its value derived from. In other words, option prices define a probability measure! With this we have established one side of the *duality*, given the set of call prices for every strike $K$, we can uniquely determine the pdf of the underlying: 

$$
\begin{equation}\label{pd}
\{\,C(t,T,K);\quad \forall\, K\,\}\quad \Longrightarrow \quad f_{\mathbb{Q} | S_t}(S_T).
\end{equation}
$$

How can we take advantage of this relation in practice? There is in fact another neat way of accessing the pdf that emphasizes the practical importance of the relation \eqref{pd} we just derived. To illustrate this idea, we now consider the difference between two "call spreads" which is a portfolio composed of $\lambda$ calls with strike $K+1/\lambda$, minus $2\lambda$ calls with strike $K$, plus $\lambda$ calls with strike $K + 1/\lambda$. This portfolio is commonly referred as a "call butterfly" which has in fact high liquidity in the option markets: 

$$
\begin{equation}\label{bfly}
B_{1/\lambda}(t,T,K) = \lambda \left( C(t,T,K-1/\lambda) - 2 C(t,T,K) + C(t,T,K + 1/\lambda) \right).
\end{equation}
$$

To visually map its pay-off structure, at $t = T$, value of the call butterfly resembles with a tent that exhibits a linear growth $S_T - (K - 1/\lambda)$ in $[K-1/\lambda, K)$ followed by a linear decay $(K + 1/\lambda) - S_T$ for $[K, K+1/\lambda)$ with zero values for $S_T < K-1\lambda$ and $S_T > K + 1/\lambda$. The total width of the base of this "tent" spans a total range of $\delta S_T = 2/\lambda$. Notice that for small $1/\lambda$, the value of the butterfly (inside the parenthesis in \eqref{bfly}) approximately proportional to the second derivative of the call option within the central differencing approximation (see [Appendix A](#appendix-a)). In particular in the large $\lambda$ limit, we have 

$$
\begin{equation}\label{bfc}
\lambda B_{1/\lambda}(t,T,K) \simeq \frac{\partial^2 C}{\partial K^2} \quad \Longrightarrow \quad B_{1/\lambda}(t,T,K) \simeq \frac{1}{\lambda} f_{\mathbb{Q} | S_t}(K).
\end{equation}
$$

This expression ties the price of an actually traded asset to the underlying probability density of the underling times the unit "width" of the call butterfly, $1/\lambda$. In other words, we can look at the observed price of the call butterfly which gives us the probability that the underlying random variable ending up in a range with width $\Delta K = 1/\lambda$ around $K$. This provides us with an ability to judge whether we agree with that probability or not. 

The nice thing about the relations \eqref{ctf} and \eqref{bfc} is purely probabilistic without requiring any modelling attempt for the dynamics of the underlying. In other words, the analysis here is completely model independent. 

#### **From probability distribution function back to European option prices**
----

We actually covered the other side of the *duality* which is embedded within the eq. \eqref{ftpa} implied by the FTAP. Written explicitly it gives us the price of any European option that has a pay-off that is a general function of the (same) underlying:

$$
\begin{equation}
D(t,T,K) = Z(t,T) \int g(s)\, f_{\mathbb{Q} | S_t}(s)\, \mathrm{d}s.
\end{equation}
$$

But if $D$'s and $C$'s are on the same underlying, the first part of the *duality* already allow us to have access to the pdf $f$ of the underlying. This is an intermediate step that makes the connection between call prices and any European type derivative contract whose pay-off is a general function of the underlying at the maturity $T$. In summary, the second part of the *duality* implies that for a given set of call prices for every strike $K$, we can price any European contingent claim: 

$$
\begin{equation}
\{\,C(t,T,K) \quad \forall\,K\,\} \quad \Longrightarrow \quad D(t,T).
\end{equation}
$$

These firmly suggest that call prices span all types derivative prices that have a determined pay-off at the maturity! Essentially, this implies that we can replicate any derivative with a fixed pay-off $D(T,T) = g(S_T)$ by a portfolio of call options. At this point, an interesting question is whether we can write down a general expression for $D(t,T)$ as a linear combination of the "primitive" assets, e.g. call options, as well as typical constituents such as bonds and asset prices that we use to replicate them? We can indeed obtain this portfolio, using an exact Taylor series of the payout function $g(S_T)$ (see [Appendix B](#appendix-b)) which read as 

$$
\begin{equation}\label{ete}
g(S_T) = g(0) + g'(0) S_T + \int_0^{S_T} (S_T - K)_{+}\, g''(K)\, \mathrm{d}K.
\end{equation}
$$

Notice the integral in the last term includes the payout function of a call option. We then simply take the (risk neutral) expectation value of both sides, using the linearity of the expectation, which gives the discounted price (at $t$) of the derivative with a pay-out $g(S_T)$. Multiplying both side with the discount factor $Z(t,T)$ then gives

$$
\begin{equation}\label{rpd}
D(t,T) = g(0) Z(t,T) + g'(0) S_t + \int_0^{S_T} C(t,T,K)\, g''(K)\, \mathrm{d}K,
\end{equation}
$$

where we used the fact that the risk neutral expectation value of the stock price at the maturity $T$ is given by 

$$
\begin{equation}
\mathbb{E}_{\mathbb{Q}}[ S_T |\, S_t] = \frac{S_t}{Z(t,T)},
\end{equation}
$$

which is aligned with the intuitive statement that current value of a future cashflow is given by its discounted expected value in the risk-neutral world. 

The formula in \eqref{rpd} is quite intuitive which tells us that the portfolio that replicated the value of $D$ consist of $g(0)$ amount of bonds, $g'(0)$ amount of stocks and a superposition of different call options with different strikes between $[0,S_T]$.

#### **References** 
-----------

**1. Topics in Mathematics with Applications in Finance [Lecture](https://ocw.mit.edu/courses/18-s096-topics-in-mathematics-with-applications-in-finance-fall-2013/resources/lecture-20-option-price-and-probability-duality/), by Stephen Blythe, MIT, Sloan School of Management, 2013.**

**2. "The concepts and practice of mathematical finance", Second Edition, Mark S. Joshi.**

#### Appendix A: Finite differencing formulas {#appendix-a}

To obtain the discrete analogues of the derivatives of a function in the central difference approximation, we first consider the following Taylor expansions:

$$
\begin{align}
C(K-h) &= C(K) - h \frac{\partial C}{\partial K} + \frac{h^2}{2} \frac{\partial^2 C}{\partial K^2} - \frac{h^3}{3!} \frac{\partial^3 C}{\partial K^3} + \dots,\\
C(K + h) &= C(K) + h \frac{\partial C}{\partial K} + \frac{h^2}{2} \frac{\partial^2 C}{\partial K^2} + \frac{h^3}{3!} \frac{\partial^3 C}{\partial K^3} + \dots\,.
\end{align}
$$

We then consider the following linear combination of functions: 

$$
\begin{align}
\nonumber \alpha_1 C(K-h) + \alpha_2 C(K) + \alpha_3 C(K + h) &= (\alpha_1 + \alpha_2 + \alpha_3) + (-\alpha_1 + \alpha_3) h \frac{\partial C}{\partial K} \\
\label{fda}&\quad + (\alpha_1 + \alpha_3) \frac{h^2}{2} \frac{\partial^2 C}{\partial K^2} + (-\alpha_1 + \alpha_3) \frac{h^3}{3!} \frac{\partial^3 C}{\partial K^3}.
\end{align}
$$

Notice that for this combination, the coefficients of the terms that are odd/even order in the partial derivatives w.r.t $K$ will always agree. If we are interested in the central finite difference approximation to the first derivative, we set $-\alpha_1 + \alpha_3 = 1$, $\alpha_1 + \alpha_3 = 0$, which is equivalent to $\alpha_2 = 0$ considering $\alpha_1 + \alpha_2 +\alpha_3 = 0$. The first two of these equations then give $-\alpha_1 = \alpha_3 = 1/2$. This implies in \eqref{fda} that 

$$
\begin{equation}
\frac{C(K-h) + C(K+h)}{2h} \simeq \frac{\partial C}{\partial K} + \mathcal{O}(h^2).
\end{equation}
$$

for small $h$. Notice that the error we are making in this approximation is quadratic in this small parameter. 

If on the other hand, we are interested in the second derivative, we set $\alpha_1 + \alpha_3 = 1$, $-\alpha_1 + \alpha_3 = 0$ which together implies $\alpha_1 = \alpha_3 = 1/2$. Finally, using $\alpha_1 + \alpha_2 + \alpha_3 = 0$ with these facts we get $\alpha_2 = -1$. Therefor, the approximation to the second order derivative of the function $C$ in the central difference approximation is given by 

$$
\begin{equation}
\frac{C(K-h) - 2C(K) + C(K+h)}{h^2} \simeq \frac{\partial^2 C}{\partial K^2} + \mathcal{O}(h^2).
\end{equation}
$$

Again the correction is quadratic in the small parameter $h$.

#### Appendix B: An exact integral form of a Taylor series {#appendix-b}

Using the fundamental theorem of calculus, one can derive an exact closed (integral) form of a Taylor series of a function. In this appendix, I provide a derivation on this. Our starting point is the fundamental theorem of calculus which states that 

$$
\begin{equation}
g(x) - g(a) = \int_{a}^{x} g'(t)\, \mathrm{d}t, \quad \Longrightarrow \quad g(x) = g(a) + \int_{a}^{x} g'(t)\, \mathrm{d}t.
\end{equation}
$$

We then integrate by parts the integral using 

$$
g'(t) = (g'(t)\,t)' - g''(t) t
$$

to obtain 

$$
g(x) = g(a) + g'(x) x - g'(a) a - \int_{a}^{x} g''(t)\,t\, \mathrm{d}t.
$$

The second term can be massaged again with another integration by parts. This gives 

$$
\begin{align}
g(x) &= g(a) + x \left(g'(a) + \int^{x}_a g''(t)\, \mathrm{d}t\right) - g'(a) a - \int_{a}^{x} g''(t)\,t\, \mathrm{d}t,\\
&= g(a) + g'(a) (x - a) + \int_{a}^x (x - t)_{+} g''(t)\, \mathrm{d}t,
\end{align}
$$

where $\textrm{max}(x-t,0) = (x-t)_{+}$ is implicitly implied by the boundaries of the last integral. Setting $a = 0$, $x = S_T$, and the variable $t = K$, we get the expression \eqref{ete} described in the main text. 


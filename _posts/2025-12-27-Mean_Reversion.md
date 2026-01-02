---
title: Understanding Mean Reversion in Rates modeling
date: 2025-12-27 15:00:00 -500
categories: [Finance]
tags: [interest rates, mean reversion]     # TAG names should always be lowercase
description: I explore the dynamics of mean reversion widely used in modeling interest rates in finance. Starting from basic economic intuition, I build a simple understanding of these dynamics and gradually relax assumptions to motivate more realistic models used in practice.    
math: true
---

Interest rates occupy a special place in financial modeling. Unlike equity prices or other traded assets, rates are not free to drift arbitrarily over time. Empirically, short-term interest rates tend to fluctuate within a range, exhibiting a persistent tendency to move back toward certain levels rather than trending indefinitely upward or downward. This behavior is visible across markets and historical periods and strongly suggests that interest rates are governed by stabilizing forces that are absent in many other financial variables.

A natural explanation lies in the role of central banks. Policy rates are actively adjusted in response to inflation, growth, and financial stability considerations. When rates are perceived to be too high or too low relative to prevailing economic conditions, policy actions tend to push them back toward levels deemed appropriate. These policy-driven rates anchor short-term funding conditions and, through market interactions, influence a wide range of other interest rates essential to the functioning of financial markets, including interbank lending rates, money-market funding rates, and short-term borrowing costs faced by financial institutions.

For this reason, short-rate models play a central role in interest-rate modeling. They are designed to describe rates that are actively steered by policy and therefore fluctuate around an equilibrium level rather than drifting freely. Mean reversion emerges naturally in this setting, not as a modeling assumption, but as a reflection of economic and institutional constraints.

In the rest of this post, I explore mean reversion mathematically, gradually relaxing simplifying assumptions to motivate more realistic frameworks used in practice.

### A deterministic look at mean-reverting dynamics  
-----

As already signaled in the introduction, we seek a mathematical description of dynamics that continuously pull the system back toward an equilibrium point. Using a point-particle analogy, we denote the instantaneous position of the particle by $x(t)$. Since changes in position are driven by motion, it is natural to focus on the particle’s velocity, 

$$
v(t) \equiv \frac{\mathrm{d}x(t)}{\mathrm{d}t}.
$$

Next, we consider what types of velocity laws could generate the kind of dynamics we are interested in. Could the velocity simply be constant (positive or negative)? Clearly not: in that case, the particle’s position would evolve linearly in time, always drifting away from its initial condition $x(t_0)$. For example, with a constant negative velocity and any initial condition $x(t_0) > 0$, the particle would move monotonically toward the origin and then continue past it, proceeding indefinitely along the negative x-axis.

In such a scenario, it is not meaningful to speak of an equilibrium point within any reasonable range of motion. This observation suggests that the velocity must depend on the state of the system. Rather than being constant in time, we seek a velocity $v(t)$ that adjusts itself based on the current position $x(t)$ relative to an equilibrium point $x_{\star}$, which we assume to be constant for now. A simple way to encode this idea is through a first-order (autonomous) ordinary differential equation

$$
\frac{\mathrm{d}x(t)}{\mathrm{d}t} = \kappa \left(x_{\star} - x(t)\right),
$$

where $\kappa > 0$ is a constant "speed of adjustment" and has units of inverse time: $[\kappa] = \textrm{time}^{-1}$. 

This velocity rule has several intuitive properties. The further the particle is from the equilibrium point, the larger the magnitude of the restoring velocity. The direction of motion automatically adjusts: the particle moves toward the equilibrium from either side. Importantly, once the particle reaches the equilibrium point at some time $t_{\star}$, the velocity vanishes. Because the velocity at every instant is determined solely by the current position, there is no mechanism within this first-order dynamics to generate a motion away from ${x}_{\star}$ once it has been reached. In this sense, it acts as an attractor, or a point of no return. The solution to the simple ODE above supports these observations: 

$$
x(t) = x_* + \mathrm{e}^{- \kappa (t - t_0)} \left(x(t_0) - x_{\star}\right),
$$

which makes it clear that, in the long-run $t - t_0 \gg 1$, the trajectory always converges to the $x_{\star}$ limit, either from above ($x(t_0) > x_{\star}$) or below ($x(t_0) < x_{\star}$) regardless of the initial condition $x(t_0)$.

An equivalent interpretation of $x_{\star}$ is that it represents a **stable fixed point** of the dynamics. Indeed, any perturbation around this point, $\delta x(t) = x(t) - x_{\star}$ decays exponentially to zero on a characteristic timescale $\tau = 1/\kappa$, which can be identified as the relaxation time of the system. 

**Introducing time-dependent equilibrium.** So far we assumed a constant equilibrium position. This led to simple relaxation dynamics, where the particle monotonically approaches to $x_{\star}$ and remains there once it is reached. In many situations, however, the notion of equilibrium itself may evolve over time. To capture this possibility, we now allow the equilibrium level to be time dependent, while keeping the same state-dependent velocity rule: 

$$
\frac{\mathrm{d}x(t)}{\mathrm{d}t} = \kappa \left(x_{\star}(t) - x(t)\right).
$$

Allowing for a time-varying $x_{\star}$ fundamentally alters the interpretation of equilibrium. The system no longer relaxes toward a fixed point. Instead, it continually adjusts its position in an attempt to follow a moving reference level. Even if the particle happens to coincide with the equilibrium at some time $t = t_{\star}$, this coincidence is generally temporary: as soon as $x_{\star}$ moves, a restoring velocity reappears. In this sense, equilibrium is no longer a point of rest, but a trajectory the system tries to track. 

Despite this change, the core adjustment mechanism is preserved: at each instant in time, the velocity still points toward the current equilibrium level, and its magnitude is proportional to the instantaneous deviation $x(t) - x_{\star}(t)$. The parameter $\kappa$ continues to control how quickly the system responds to deviations, now determining how closely the particle can follow the moving equilibrium. 

To shed more light to this discussion, let us consider the solution to the ODE above, which read as 

$$
x(t) = \mathrm{e}^{-\kappa (t - t_0)} x(t_0) + \kappa \int_{t_0}^t \mathrm{e}^{-\kappa (t-s)}\, x_{\star}(s)\, \mathrm{d}s.
$$

The tracking behavior of the particle’s position $x(t)$ can be understood directly from this solution, which consists of two distinct contributions:

- a term that progressively removes the system’s memory of the initial condition $x(t_0)$ as time advances (the first term above) 
- an integral term that retains memory of past values of the moving equilibrium.
  
In particular, the second term can be considered as a weighted average of the past values of the equilibrium path, $x_{\star}(s)$ with exponentially decaying weights $\mathrm{e}^{-\kappa (t-s)}$. Rather than converging to a single value, the trajectory therefore tracks a smoothed version of the equilibrium path.

It is also important to emphasize that the exponential kernel $\mathrm{e}^{-\kappa (t-s)}$ encodes the system’s tolerance to distant memory: Contributions to the integral are dominated by values of $x_{\star}$ with $t-s \leq 1/\kappa$, while more distant past values are exponentially suppressed. 

It is instructive to rewrite the solution using an integration by parts, as this form makes the origin of the tracking error particularly transparent: 

$$
x(t) - x_{\star}(t) = \mathrm{e}^{-\kappa (t - t_0)} \big[x(t_0) - x_{\star}(t_0)\big] - \int_{t_0}^{t} \, \mathrm{e}^{-\kappa (t-s)}\, \dot{x}_{\star}(s)\, \mathrm{d}s.
$$

Here, the left-hand side represents the tracking error. The first term on the right-hand side captures how any initial mismatch decays over time, while the integral term represents the *irreducible* error that is continuously generated by the motion of the equilibrium itself. Therefore, contrary to the constant case, as long as equilibrium path has a non-trivial time dependence, there will be an inevitable contribution to the tracking error. This reminds me of a cat-and-mouse game where the particle continuously chases the moving equilibrium, but never fully catches it unless the equilibrium itself stops. The faster the equilibrium moves, the larger the persistent gap between the two. Notice also that this form makes the role of $\kappa$ more explicit in that it controls how well the system tracks the moving equilibrium through the exponential term inside the integral. 

### From Deterministic Tracking to Stochastic Mean Reversion
------

Up to this point, we have deliberately focused on deterministic dynamics to isolate the structural role of mean reversion. In this setting, the particle position $x(t)$ was continuously pulled toward a possibly time-dependent equilibrium level $x_{\star}(t)$ with the parameter $\kappa$ controlling the speed of adjustment.

To anchor towards interest-rate modeling, we now simply reinterpret the particle position as a short rate, $x(t) \to r(t)$ and identify the moving equilibrium level $x_{\star}(t)$ with the time-dependent mean level $\theta(t)$ familiar from the Hull–White framework. 

However, one key piece of the puzzle is still missing. While the deterministic dynamics developed so far capture the idea of tracking a policy-driven target, they do not account for the inherently unpredictable nature of financial markets. In reality, interest rates are continuously influenced by new information, policy surprises, and market shocks that cannot be anticipated in advance.

To incorporate these effects, we extend the dynamics by introducing a stochastic component. In the simplest setting, this is achieved by adding an infinitesimal Brownian increment to the evolution, scaled by a volatility: 

$$
\begin{equation}
\mathrm{d}r(t) = \kappa \left[\theta(t) - r(t)\right]\, \mathrm{d}t + \sigma(t)\,\mathrm{d}W(t),\label{HW}
\end{equation}
$$

where $\mathrm{d}W(t) \sim \mathcal{N}(0,\mathrm{d}t) $ is the Brownian motion and $\sigma(t)$ is the time-dependent volatility parameter. The underlying short-rate process in eq. \eqref{HW}, which can be viewed as a stochastic perturbation of the deterministic level-tracking system we analyzed before, is commonly referred in finance literature as the **Hull–White** stochastic differential equation (or in short, [*Hull-White* model](https://en.wikipedia.org/wiki/Hull%E2%80%93White_model)). It is worth emphasizing that it is only in this stochastic setting that mean reversion acquires a genuine statistical meaning: rates fluctuate randomly over time, yet remain anchored, on average, around the evolving level. 

On the other hand, in the limit where the mean-level $\theta$ of eq. \eqref{HW} is taken as a constant corresponds to the [Vasicek model](https://en.wikipedia.org/wiki/Vasicek_model), and the underlying stochastic process is called [Ornstein-Uhlenbeck](https://en.wikipedia.org/wiki/Ornstein%E2%80%93Uhlenbeck_process) process. In this sense, it can be said that Hull-White model \eqref{HW} is a *time-inhomogeneous* Ornstein-Uhlenbeck process.  

**Properties of interest rates in the Hull-White framework**. Now that we established the groundwork for the Hull-White model, let us discuss some of its properties. Thanks to our discussion earlier in this post, it is rather easy to write a solution to the short-rate in this framework, which is given by

$$
\begin{equation}
r(t) = \mathrm{e}^{-\kappa (t - t_0)} r(t_0) + \kappa \int_{t_0}^t \mathrm{e}^{-\kappa (t-s)}\, \theta(s)\, \mathrm{d}s + \int_{t_0}^{t} \mathrm{e}^{-\kappa (t-s)}\,\sigma(s)\, \mathrm{d}W(s),\label{HWS}
\end{equation}
$$

where the last term is called an $\mathrm{It\hat{o}}$ integral. Considering it as a discretized sum, the $\mathrm{It\hat{o}}$ integral in \eqref{HWS} can in fact be seen as a weighted sum of Brownian increments and thus we expect it to have zero mean, as long as $\sigma(s)$ is a "well-behaved" function. This gives us the conditional expectation (e.g the first moment) of the process as: 

$$
\begin{align}
\nonumber \mathbb{E}\big[r(t) \big| \mathcal{F}(t_0) \big] &= \mathrm{e}^{-\kappa (t - t_0)} r(t_0) + \kappa \int_{t_0}^t \mathrm{e}^{-\kappa (t-s)}\, \theta(s)\, \mathrm{d}s,\\
&= \theta(t) - \int_{t_0}^{t} \, \mathrm{e}^{-\kappa (t-s)}\, \dot{\theta}(s)\, \mathrm{d}s + \mathrm{e}^{-\kappa (t - t_0)} \left[ r(t_0) - \theta(t_0) \right],
\end{align}
$$

where we performed an integration by parts in the second line to manifest mean-reverting nature of short-rate in the Hull-White framework: in the long-run $t - t_0 \gg 1$ (e.g when the system loses its memory to the initial conditions due to the decay of the last term above), expected rate closely tracks the mean level $\theta(t)$ with a tracking error (integral in the second line) controlled by the mean-reversion parameter $\kappa$. 

Given the expectation above, the variance of the process can be computed as 

$$
\begin{align}
\nonumber \mathbb{V}\big[r(t) \big| \mathcal{F}(t_0)\big] &\equiv \mathbb{E}\big[r(t)^2 \big| \mathcal{F}(t_0)\big] - \mathbb{E}\big[r(t)\big|\mathcal{F}(t_0)\big]^2,\\
&= \int_{t_0}^{t} \mathrm{e}^{-2\kappa(t-s)}\, \sigma^{2}(s)\, \mathrm{d}s.
\end{align}
$$

By definition, this expression describes how noise injected at intermediate times, $t_0 < s$, contributes to the total uncertainty (variance) at a later time $t$. It is again easy to observe the influence of mean-reversion which tend to suppress the influence of early shocks so that the dominant contribution to total uncertainty comes from the late shocks $s \sim t$ with size $\sigma^{2}(s)$. This is exactly what a mean reverting process should do: it suppresses the long-term impact of past disturbances. 
---
title: Dissecting Interest Rate Products - Valuation Concepts and Structures
date: 2025-07-19 15:00:00 -500
categories: [Finance]
tags: [interest rates, zero rates, bonds, fra]     # TAG names should always be lowercase
description: From zero-coupon bonds to interest rate swaps — breaking down the math behind the money. 
math: true
---

In a previous [post]({{ site.baseurl }}{% post_url 2025-07-18-Intro_Rates %}), we made a rather quick entrance into the world of interest rates and financial products, aiming to build some initial intuition around how they work and why they matter. In this follow-up, we’ll slow things down a bit to focus on the core building blocks—bonds, zero-coupon rates, forward rates, and interest rate swaps. These are the fundamental instruments that underpin everything from pricing more complex derivatives to constructing the yield curve. Before diving into bootstrapping or advanced curve modeling, it’s worth getting comfortable with these simpler, yet powerful, concepts.

#### **1. Zero Rates**
-----

Zero rates, or zero-coupon yields (interest rates), represent the return on an investment that pays *a single lump sum* at maturity, without any intermediate coupon payments. For example, $n$ year zero-coupon interest rate is the rate of interest earned on an investment that starts today and lasts for $n$ years. These rates are foundational in fixed income markets because they express the pure time value of money for a given maturity. Although most of the rates we observe directly in the market are not pure zero rates (e.g. most tradable bonds pay periodic coupons), several instruments behave like zero-coupon securities and are used to infer zero rates in practice.

In the United States, two key examples are:

- Treasury Bills (T-Bills) – short-term government securities (1 year or less) sold at a discount and repaid at face value, with no interim payments.

- STRIPS (Separate Trading of Registered Interest and Principal of Securities) – zero-coupon instruments created by "stripping" the coupons and principal from U.S. Treasury bonds, allowing each component to be traded separately.

In Canada, comparable instruments include:

- Government of Canada Treasury Bills – functionally identical to U.S. T-Bills: short-term, discount instruments with no coupon payments.

- Canada STRIP Bonds – created by dealers or custodians from Government of Canada bonds by separating the coupons and principal, and trading each as an individual zero-coupon bond.

#### **2. Bonds**
-----

Bonds are fundamental building blocks of fixed income markets, representing loans made by investors to issuers—typically governments or corporations. When you buy a bond, you are effectively lending money in exchange for future payments. Most bonds traded in the market pay coupons—regular interest payments—to the holder over the life of the bond. These are called coupon-bearing bonds. At maturity, the bond repays its *principal* (also called *par* or *face value*), typically in a single lump sum. The face value (or par value) of a bond is the amount the issuer agrees to repay the bondholder at maturity. In most markets, this is conventionally set to 100 USD or 1,000 USD per bond unit, depending on the context. For example, U.S. Treasury securities are usually quoted with a face value of 100, while corporate bonds often use 1,000. All coupon payments and price quotes are typically expressed as percentages of this face value, making it a standard reference point in bond valuation and yield calculations. 

**Example:** A 5-year government bond that provides a $6 \%$ coupon. Here the $6 \%$ coupon refers to the annual interest rate applied to the face value (of $100$ CAD). These annual coupon payments are fixed, and they are not compounded. The holder of this bond will have cash inflows of $6$ CAD at the end of each year from 1 to 4, and an amount corresponding to the principal plus the last coupon payment at the end of year 5 totaling a $100 + 6$ CAD amount. 

How do we price it? By the logic of time value of money, the fair market price of a bond is equal to the present value of all future cash flows, discounted at the appropriate interest rates. For example, consider the 5-year bond example above. It's price $P$ is given by 

$$
P = \frac{C}{1+r_1} + \frac{C}{1+r_2} + \frac{C}{1+r_3} + \frac{C}{1+r_4} + \frac{C + F}{1+r_5},
$$

where $C$ is the annual coupon payments, $F$ denotes the face value and $r_i$ is the annual zero rate for year $i$.

Notice that the price $P$ reflects a blend of zero rates from years 1 to 5. It doesn't isolate the 5-year zero rate $r_5$, because part of the return is paid out earlier through coupons. Unless we already know the zero interest rates for years 1-4: $r_1,r_2,r_3,r_4$, we can not extract $r_5$ from this bond alone.
 
However, if we observe other bonds with shorter maturities and similar structures, we can use them to sequentially solve for earlier zero rates. This iterative process—known as **bootstrapping**—forms the foundation for constructing the *zero-coupon yield curve*. 

Let's consider another example. Suppose that the Treasury zero rates measured with continuous compounding is as follows 

| Maturity [years] | Treasury Zero Rates [%] |
| ---------------- | ----------------------- |
| 0.5              | 5                       |
| 1.0              | 5.8                     |
| 1.5              | 6.4                     |
| 2.0.             | 6.8.                    |

The price of a 2-year T-bond with a principal $100$ CAD that provides coupons at a rate of $6 \%$ per annum semi-annually is given by 

$$
P = 3\, \mathrm{e}^{-0.05\cdot 0.5} + 3\, \mathrm{e}^{-0.058\cdot 1.0} + 3\, \mathrm{e}^{-0.064\cdot 1.5} + 103\, \mathrm{e}^{-0.068\cdot 2.0} \simeq 98.39.
$$

We finish this subsection with two commonly used terms: bond yield and par yield. 

- **Bond Yield:** The single discount rate, when applied to all cash flows gives the market price $P$ of the bond. For the example above, 

$$
P = 98.39 = \sum_{i = 1}^3 3\, \mathrm{e}^{-y\cdot t_i} + 103\, \mathrm{e}^{-y\cdot 2.0},\quad\quad \Rightarrow \quad\quad y = 0.0676\, (\textrm{or a Bond Yield of}\,\, 6.76\%)
$$


- **Par Yield:** Par yield is the coupon rate that causes the bond price to equal its par/face value; 

$$
100 = \sum_{i = 1}^3 \frac{c}{2}\, \mathrm{e}^{-r_i\cdot t_i} + \left(100 + \frac{c}{2}\right)\, \mathrm{e}^{-r_4\cdot 2.0},\quad\quad \Rightarrow \quad\quad c = 6.87
$$


#### **3. Forward Rates**
-----

Forward rates are rates of interest implied by current zero (spot) rates for periods of time in the future. The forward rate is the market's expectation of the interest rate that will prevail over a specific future time interval.

The forward rate is not an independently quoted rate; it is derived mathematically from zero-coupon bond yields (or zero rates). The key idea is *no-arbitrage*: investing for two years directly should yield the same return as investing for one year and then reinvesting at the forward rate for the second year.

For example, suppose that you know today's zero rate for a maturity $T_1$; $r_1(0,T_1)$ and the zero rate for maturity at $T_2 > T_2$; $r_2(0,T_2)$. Using no-arbitrage we can infer the implied forward rate $r_f(0,T_1,T_2)$ between $T_1$ and $T_2$. Under continuous compounding, no-arbitrage implies

$$
\mathrm{e}^{r_1\, T_1}\, \mathrm{e}^{r_f\, (T_2 - T_1)} = \mathrm{e}^{r_2\, T_2},\quad\quad \Rightarrow \quad\quad r_f = \frac{r_2 T_2 - r_1 T_1}{T_2 - T_1} = r_2 + \frac{(r_2 - r_1)}{(T_2 - T_1)} \, T_1
$$

Notice that 

- If the zero coupon yield curve has an upward slope, $r_2 > r_1$, implied forward rate must be larger than the largest zero rate, to make up for the lowest zero rate, i.e. $r_f > r_2$ implying the following hierarchy $r_f > r_2 > r_1$.
- If on the other hand the zero coupon yield curve has downward slope, $r_2 < r_1$, we get $r_f < r_2$ or the following hierarchy $r_f < r_2 < r_1$.

Considering an infinitesimally short future time period $\Delta T = T_2 - T_1 \to 0$ (i.e. $T_1,T_2 \to T$ and $r_1,r_2 \to r$), we can derive the *instantaneous forward rate* for maturity $T$ or in other words the forward rate that is applicable to a very short future time period that begins at time $T$:

$$
\begin{equation}\label{instar}
r_f(0,T) = r + T \frac{\partial r}{\partial T},
\end{equation}
$$

where $r$ is the zero rate of maturity $T$. Now if we denote $P(0,T)$ as the price of a zero-coupon bond (or the discount factor) maturing at time $T$, assuming continuous compounding $P(0,T) = \mathrm{e}^{-r T}$, we can re-write the instantaneous forward rate in \eqref{instar} as the negative slope of logarithm of the zero-coupon curve: 

$$
\begin{equation}\label{instarf}
r_f(0,T) = - \frac{\partial \ln P(0,T)}{\partial T}.
\end{equation}
$$

With the knowledge of zero yield curve, discretized version of this expression can also give us the discrete forward rates for any time period of interest. 

#### **4. Forward Rate Agreements**
-------

Suppose a large investor — say, a corporate treasury or a fixed income portfolio manager — believes that future interest rates will differ from today’s forward rates implied by the market. If the investor is exposed to borrowing or lending cash in that future period, this difference presents a potential profit opportunity: 

- If the investor thinks rates will be higher than the forward rate, they might want to lock in borrowing costs now at today’s forward rate (which is lower) to hedge against future rate increases.
- If the investor thinks rates will be lower than the forward rate, they might want to lock in lending rates now to protect against future rate drops.

A Forward Rate Agreement (FRA) is an over-the-counter (OTC) contract that allows an investor to lock in an interest rate today for a specified future period, thereby eliminating uncertainty about borrowing or lending costs during that time.

Specifically, an FRA is an agreement between two parties made today on an interest rate that will apply to a notional amount over a future period. Although no principal is exchanged, the contract settles in *cash based* on the difference between the agreed rate and the actual market rate observed at the start of the future period.

Consider an FRA where company X is agreeing to lend money to Y for the period of time between $T_1$ and $T_2$ with a contract rate $r_k$ (forward rate locked today). If $r_m$ is the actual rate observed in the market at time $T_1$, for the time period between $T_1$ and $T_2$ and $N$ is the notional underlying the contract. Normally X would earn an interest with $r_m$ but agrees to earn $r_k$, corresponding to a cashflow at $T_2$: 

$$
\textrm{cashflow for X} = N (r_k - r_m)(T_2 - T_1)\quad\quad \textrm{@} T_2
$$

and similarly, for the borrower 

$$
\textrm{cashflow for Y} = N (r_m - r_k)(T_2 - T_1)\quad\quad \textrm{@} T_2
$$

It is clear from these expressions that an FRA can be seen as an agreement where X (Y) will receive (pay) interest on the principal $N$ between $T_1$ and $T_2$ at the fixed rate $r_k$ and pay (receive) interest at the realized rate of $r_m$.

It is common that FRAs are settled in cash at $T_1$ as they pay-off is already determined at this point given the knowledge of $r_m$. For this reason, the pay-off must be discounted from $T_2$ to $T_1$: 

$$
\textrm{pay-off for X} = \frac{N (r_k - r_m)(T_2 - T_1)}{1 + r_m (T_2 - T_1)}\quad\quad \textrm{@} T_1.
$$

**Valuation:** By construction an FRA contract has zero value at initiation, similar to the forward contracts on equities. Why? At the initial time, what would be the expected value of random $r_m$ under the risk-neutral measure? The best we can do today is in fact be $\mathbb{E}_{\mathbb{Q}}[r_m] = r_f$ we can be derived from today's zero curve. Since we value products as the discounted future expected pay-off within the risk neutral framework, we can write (assuming continuous compounding)

$$
V_{\rm FRA} = \mathrm{e}^{-r_2 T_2}\, \mathbb{E}_{\mathbb{Q}}[\textrm{pay-off at}\,T_2]
$$

Therefore, the discounted present value for a lender that receives with $r_k$:

$$
V_{\rm FRA} = \mathrm{e}^{-r_2 T_2}\, N (r_k - r_f) (T_2 - T_1)
$$

and for the borrower that pays with $r_k$:

$$
V_{\rm FRA} = \mathrm{e}^{-r_2 T_2}\, N (r_f - r_k) (T_2 - T_1)
$$

In short, FRA can be valued by computing the pay-off with the assumption that the forward rates are realized, $r_m = r_f$ and discounting this pay-off at the risk-free rate. 

#### **5. Swaps**
-----

An interest rate swap is a financial derivative in which two parties exchange interest payments on a notional principal amount at scheduled intervals. One party pays a fixed rate, determined at the start of the contract, while the other pays a floating rate that resets periodically based on a reference rate (such as SOFR or LIBOR). The notional is never exchanged—only the net interest difference is settled at each payment date.

Unlike a Forward Rate Agreement (FRA), which is a single-period contract, an interest rate swap is typically a multi-period arrangement. It may span several years and involves regular exchanges of payments—usually every three or six months—over the life of the contract. Now suppose that we have fixed dates: 

$$
T_0 < T_1 < T_2 < \dots < T_n.
$$

The *fixed leg* of the swap contract then involves making payments at times $T_{j+1}$ ($j = 0, 1 \dots n-1$) for an amount of $X \tau_j$ where $X$ is the agreed swap rate. The present value of these cashflows can then be written in terms of a series of discount factors (zero-coupon bonds) $P(0, T_{j+1})$ as:

$$
V_{\rm fixed} = \sum_{j = 0}^{n-1}\, X \tau_j P(0,T_{j+1}).
$$

For the party making the fixed payments, the swap is said to be a payer swap. Conversely, a party receiving the fixed payments is in a receiver swap. 

The set of floating payments is called the *floating leg*. At each payment time $T_{j+1}$ ($j = 0, 1 \dots n-1$), the floating leg pays interest accrued from $T_j$ to $T_{j+1}$, based on the spot rate observed at $T_j$. This is why the floating rate is sometimes referred as "resetting". 

Although the floating rate isn't known in advance at the time of the swap agreement, the expected value under no-arbitrage pricing is known, and equals the forward rate $f_j$. Therefore, the present value of the all cashflows in the floating rate can be written as

$$
V_{\rm float} = \sum_{j = 0}^{n-1}\, f_j \tau_j P(0,T_{j+1}).
$$

To find the unique arbitrage-free swap rate X, the present value of the fixed and floating legs must be equal, $V_{\rm float} = V_{\rm fixed}$. Solving for the $X$ gives 

$$
\begin{equation}\label{swapr}
X=\sum_{j=0}^{n-1} w_j f_j
\end{equation}
$$

where 

$$
w_j=\frac{\tau_j P\left(0, T_{j+1}\right)}{\sum_{i=0}^{n-1} \tau_i P\left(0, T_{i+1}\right)}.
$$

Note that the sum of the weights is equal to unity. Equation \eqref{swapr} shows that the swap rate is a weighted average of the forward rates and must therefore lie between the minimum and maximum forward rates. Conceptually, the (fair) swap rate (sometimes called par swap rate) is the rate that makes the net present value of the swap zero at initiation. In general, we can express the value of a swap at any time as the difference between the values of the floating and fixed legs:

$$
V_{\rm swap} = V_{\rm float} - V_{\rm fixed}.
$$

Although the swap is valued at zero initially when the fixed rate is set to the fair rate, the realized value of the floating leg will evolve stochastically over time, causing the value of the swap to deviate from zero as market interest rates change.

#### **References** 
-----------

**1. "Options, Futures and Other derivatives", Prentice Hall (8th edition), John C. Hull.**

**2. "The Concepts and Practice of Mathematical Finance", Cambridge Univ. Press (2nd Edition 2008), Mark J. Joshi.**
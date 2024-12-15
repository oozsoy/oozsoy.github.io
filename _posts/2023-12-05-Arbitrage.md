---
title: No arbitrage principle
date: 2023-12-05 15:00:00 -500
categories: [Finance]
tags: [arbitrage, no arbitrage principle, derivative pricing]     # TAG names should always be lowercase
description: I talk about the concept of arbitrage in finance and its utility for pricing derivative contracts such as forwards and futures.   
math: true
---

## What is Arbitrage? 
-----

In broad terms, an arbitrage opportunity implies the possibility of making profit in the absence
of any potential losses. More specifically in finance, it refers to the practice of taking
advantage of price differences for the same or similar financial assets in different markets to
make a profit without taking on any financial risk. 

To give a simple example along the lines above, consider a product that costs 10 USD in your
favorite market of the town. Suppose that while you are wandering your town, you found out another
market that sells the same product from 12 USD a piece. In this situation, how can you take
advantage of the price difference between the two markets with an aim to make risk-free profit?
Ideally, you would like to sell the product in the more expensive market while buying from the 
less expensive market. In other words, you would naturally buy a large amount of the product
from the first market in order to sell it in the second one. For example,
buying 10 unit of this product from the first and selling it in the expensive market would
allow you to make a risk-free $20. If more and more people realize this opportunity,
an immediate consequence would be an increase in the demand for the product in the first market
with a corresponding increase in supply in the second. Hence, if more people react to exploit
this opportunity, the price of the product would increase due to high demand while reducing in 
the second due to large amount of supply. Therefore, the prices in the two markets will get
closer to each other, and eventually we won't be able to make profit. 

Let's give another example in the context of foreign exchange (FX). Suppose that 1 USD is worth
1.5 Canadian dollars (CAD) and 1 CAD is worth $25$ Turkish liras (TRY). How many Turkish liras
should a dollar worth? It should be worth exactly, $1 \times 1.5 \times 25 = 37.5$ TRY. 
If it is worth more than $37.5$ TRY, we can sell dollars for TRY, convert it to CAD to finally
back to dollars. In this way, we can end up with more dollars than we started with. 
We can repeat this cycle as much as we want to make profit by taking advantage of this 
arbitrage opportunity. As soon as this procedure is repeated many times, the opportunity
will disappear as the dollar supply will increase, resulting with a reduction in its value 
against TRY.  

**No arbitrage principle**. As in the both examples above, the financial markets are believed
to have a similar equilibration dynamics: if there exist opportunities that allow profit without
risk and additional costs, they would be exploited by *arbitrageurs* until an "equilibrium" is
re-established in the market in the short term. This is the famous *no arbitrage principle* in 
finance which is sometimes referred as "no free lunch" principle. 

### No arbitrage principle for pricing derivatives
------

Arbitrage considerations alone are sufficient to derive the fair price of financial
derivatives such as forwards and futures contracts. Before we get into these arguments,
let's remind ourselves some generalities related to derivative securities, focusing on forwards
and futures. 

Derivatives can be divided into two categories as conditional and unconditional forward
transactions. While a conditional transaction grants one party of the contract certain rights,
the other party assumes certain obligations. The most famous conditional forward transaction
is an option contract. In contrast, an unconditional forward transaction is an agreement 
that is binding both parties. Futures and forwards can be classified as unconditional derivative contracts. 

The main idea behind futures is identical to that of forwards. The essential difference between
forwards and futures is that contract elements are not individually negotiated. 
A future is a standardized forward transaction. The underlying security, the volume, 
the time of settlement, and other payment and delivery conditions are standardized and are 
set by the exchange. 

To be more specific, forward and futures contracts are transactions in which the purchase or sale of
an underlying $S$ at a later date $T$ for a fixed price, called the delivery price (or forward price)
$K$, is agreed upon as of the current value date $t < T$. It is important to note that no upfront payments are made
by the parties at the inception of the contract. We just agree (in advance) to 
buy or sell the underlying at the fixed price $K$ and time $T$. How would the pay-off profile of such a contract look like? Let's assume that we are holding a forward contract (e.g. long forward), so that we agree to buy the underlying $S$ at time $T$ paying $K$ amount. Thus, effectively our payoff is given by the difference between the underlying price at time $T$ and the forward delivery price: $S_T - K$. If the spot price of the underlying at time $T$ is larger than the delivery price $K$ we paid as specified by the forward contract, we essentially make profit as we buy a more valuable asset by paying less, which we can immediately sell to make a gain of $S_T - K > 0$. If on the other hand, $S_T < K$, we incur a loss from our forward contract because we just paid more to a less pricey asset. In other words, if we just tried to sell the asset in the spot market immediately after the maturity of the forward contract, we would sell it from a price lower than we bought, indicating our losses. Notice that the payoff profile of the forwards (and futures) is symmetric in the sense that both unlimited positive and negative payoffs are possible when the obligations for the both parties of the contract are carried. As we will see later, this situation is different for contracts that create rights, as in the case of options. 

**An example based on no-arbitrage**. For the determination of 
a fair delivery/forward price of forward type contract based on arbitrage considerations, I will focus on an example based on commodity futures which have been traded on organized exchanges since the early 19th century. 

Now consider a futures contract of buying 1000 gallons of crude brent-oil with a delivery date 
of one year from now on. Assuming that the current spot price of a gallon is 50 USD and an annual
risk-free rate $r$ of borrowing money at $\% 5$, how should we set the delivery/forward price $K$ of 
this commodity futures contract? 

In this scenario, we can consider taking a loan amount $S_0 = 1000 \times 50 = 50.000$
USD to immediately buy 1000 gallons of brent-oil today. Then we can be the seller of the futures
contract. Fast forwarding one year, we are obliged to deliver 1000 gallons for an agreed upon 
amount of $K$. On the other hand, we need to pay back our loan with the assumed interest rate,
corresponding to an amount of $52.500$ USD. Therefore, the total profit we can make at then end
of the year is $52.500 - K$ in USD. According to the no-arbitrage principle, we should not be able
to make any risk-free profit from this transaction and therefore the fair delivery price for the
futures contact should be set to $K = 52.500$ USD.

Focusing on a different scenario, we can reach at the same result. Now suppose that we entered a
short position of 1000 gallons of brent-oil in the spot market and sell it immediately and invest 
the amount 50K USD we obtained from the short sell with a risk-free rate of 5 percent. At the same
time we take long position of the commodity futures contract we mentioned above. One year forward, 
our money in the bank becomes $52.500$ USD and since we entered into a long futures contract with
the obligation to buy 1000 gallons of oil at $K$, the fair delivery price of this contract
should be $K = 52.500$ USD. 

Focusing on standard derivative (forward type) contracts with the underlying identified as a stock, we can formalize these ideas in simple mathematical terms.

Let $r$ be the risk-free rate of return. Assuming continuous compounding, delivery price of a forward contract (entered at time $t$) is 

$$
\begin{equation}\label{fpF} 
K = S_t\, \mathrm{e}^{r(T-t)} 
\end{equation}
$$ 

where $S_t$ is the price of the underlying at time $t$ and $T$ is the time at which the contract is executed. The eq. \eqref{fpF} is the fair delivery price of the contract because otherwise there are two situations that can lead to arbitrage:

- Case 1: $K > S_t \, \mathrm{e}^{r(T-t)}$. At time $t = 0$, barrow $S_0$ risk-free from a bank, invest immediately to the underlying (e.g a stock) and enter into short forward contract by agreeing to sell the underlying you just bought at time $T$ for an amount of $K$. At this time we have nothing in our hands, but we just obtained $K > S_0 \,\mathrm{e}^{rT}$ from the forward contract which is more than the amount we owe to the bank from our initial loan. 
- Case 2: $K < S_t \, \mathrm{e}^{r(T-t)}$. At time $t = 0$, we can short sell the underlying (barrow the stock and immediately sell) and invest the proceeding amount from this transaction in a bank with a risk-free rate of $r$. Since we short sell the stock initially, we need to return it back to the lender, and so we enter a long forward contract at the same time. At time $T$, we will have $S_0 \,\mathrm{e}^{rT}$ in the bank account, and we are obliged to buy the stock (to be returned to lender) for an amount $K < S_0 \,\mathrm{e}^{rT}$ which is less than the amount we have in the bank, leading to a risk-free profit.  

Therefore, eq. \eqref{fpF} provides the fair delivery price of a forward contract based on the no-arbitrage considerations, ensuring no risk-free profit can be made by exploiting price differences between the spot and forward markets. Notice that this relation is equivalent to the amount we owe to the bank to finance the underlying within the time interval $T-t$, i.e. by borrowing money from a bank to buy the asset at time $t$ from the price $S_t$, we would owe the bank an amount of $S_t \, \mathrm{e}^{r (T-t)}$ at the maturity of the contract. In this sense, the delivery/forward price in eq. \eqref{fpF} reflects the fact that the fair price of the obligation in forward contract is equivalent to the cost of maintaining (e.g. buying and financing) the underlying directly. 

#### **References** 
-----------

**1. "Derivatives and Internal Models: Modern Risk Management", Hans-Peter Deutsch and Mark W. Beinker .**

**2. "The concepts and practice of mathematical finance", Second Edition, Mark S. Joshi.**


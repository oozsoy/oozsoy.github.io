---
title: Intro to Rates
date: 2025-07-17 15:00:00 -500
categories: [Finance]
tags: [interest rates]     # TAG names should always be lowercase
description: A gentle introduction to simple interest rate instruments and markets.
math: true
---

The topics I covered so far were dominantly based on financial products traded on equity markets, such as stocks and derivates based on these assets: options, forwards and futures. Despite this, interest rates—particularly the risk-free rate of borrowing or lending money—appear virtually everywhere in the valuation of these instruments, serving as the discount factor for future cash flows, as in the [risk-neutral pricing]({{ site.baseurl }}{% post_url 2024-07-02-RN_Options %}) framework. Beyond valuation, they reflect core financial principles such as the time value of money (jam today is better than jam tomorrow) and the [no-arbitrage]({{ site.baseurl }}{% post_url 2023-12-05-Arbitrage %}) condition, ensuring internal consistency across financial products and markets.

However, there is much more to interest rates than simply serving as a discount factor. Interest rates effectively have a market of their own, forming the foundation for entire segments of finance—such as fixed income markets and interest rate derivatives. A natural entry point into these topics is through the role of one of the most fundamental financial institutions: banks. Banks operate at the very heart of the interest rate mechanism, influencing and being influenced by the cost of borrowing and lending across different time horizons. Essentially, a bank makes money when the rate it receives from lending exceeds the rate it pays to borrow. These profits can be reduced when borrowers default on their loans, reflecting the **credit risk** that the bank assumes. 

A bank can borrow money in a few different ways. The simplest is to take money on deposit from savers, paying them interest in return for the use of their money. The bank can also issue bonds (i.e. corporate bonds) just like any other company. Another simple, though generally more costly method is borrowing on the interbank lending market, where borrowing rates are commonly referenced by the *London Interbank Offered Rate (LIBOR)*, representing the rates at which banks can borrow from one another. These rates vary depending on the borrowing term, with common maturities including 1 month, 3 months, and 6 months.  

When we talk about rates here, we should make a slight paradigm shift as compared to the ways we treat rates for pricing derivatives. While it is common to rely on continuous compounding for pricing derivatives in the equity and FX markets, interest rate related products are never quoted continuously in the market. Here the crucial concept is the *compounding frequency*. For continuous compounding, it is assumed that a principal amount is re-invested with the same rate continuously for infinitesimally small-time intervals during the course of the investment. Imagine you compound not just $m$ times in a year, but very, very frequently—almost every instant. The interest accrues and compounds constantly. For a unit amount of principal, there is a limiting expression that allows us to make a connection with the discrete compounding and the continuous compounding which essentially follows from the Binomial theorem (expansion): 

$$
\begin{align}
\nonumber \lim_{m \to \infty} \left(1 + \frac{r}{m}\right)^m &= \lim_{m \to \infty}\sum_{k = 0}^m \frac{m!}{k!\,(m-k)!} \left(\frac{r}{m}\right)^k 1^{m - k},\\
\nonumber & = \lim_{m \to \infty} \sum_{k = 0}^m\, \frac{m^k}{k!}\left(1 - \frac{1}{m}\right)\left(1 - \frac{2}{m}\right)\dots \left(1 - \frac{k-1}{m}\right) \left(\frac{r}{m}\right)^k,\\
& = \mathrm{e}^r
\end{align}
$$

where $r$ is the interest rate per annum ($t = 1$) and $m$ is the compounding frequency such that $m = 1$ gives annual, $m = 2$ semi-annual, $m = 4$ quarterly compounding and so on. To generalize, suppose $P_0$ is invested for $t$ years at an interest rate of $r$ per annum, if the rate is compounded $m$ times per annum, the final investment is given by 

$$
P_f = P_0 \left(1 + \frac{r}{m}\right)^{m t}.
$$

For example, if the 3 month LIBOR rate is $5 \%$ on CAD, a bank can borrow a
million pounds today in return for the obligation to repay a million pounds plus
5% of a million pounds times the accrual period. The accrual period in this case
is a quarter, as three months is a quarter of a year. The quoted $5\%$ is an annualized rate, but it only applies to the specific three-month term of the loan. Simple interest over this accrual period (not yet compounded) will be $1\, \textrm{M} \times 0.05 \times 0.25 = 12.500$ CAD and the repayment after 3 months is: $1.012.500$ CAD. Now consider that this borrowing process is repeated every 3 months (assuming the interest rate remains constant), the total repayment after a year ($t = 1$) can be found by compounding: 

$$
1.000.000\, \textrm{CAD} \times \left(1 + \frac{0.05}{4}\right)^4 \simeq 1.050.950\,\, \textrm{CAD}.
$$

Therefore, the total interest we pay will be more than what we would pay from a simple interest of $5 \%$ for a year: $50.000$ CAD. The extra 950 CAD is due to interest on interest - a result of compounding. 


What a bank does is continuously borrow and lend. An important consideration for the bank is that it wants to match its assets (receivables) and liabilities (obligations). It is worth noting that in this basic borrowing and lending activity, banks also inherently take on two more fundamental risks, namely **interest rate risk:** the risk associated with the change of interest rates, potentially causing an asymmetric change on the value of loans and liabilities and **liquidity risk:** the risk that the bank won’t be able to meet its cash obligations when depositors withdraw funds. For example, suppose that most of the bank's money comes from short-term deposits which can be withdrawn at any time and the interest payable to these deposit align with short-term interest rates. Now, assume that the bank makes a *long-term fixed-rate loan* to a company. The maturity mismatch between the bank's asset (deposit) and liability (loan) exposes the bank to risks. In particular, it may have a short-term liquidity risk if too many of its depositors want their money back at once. It is also exposed to interest rate risk - if the floating rate it pays the depositors rises above the fixed rate received from the company then the bank is making a loss. The bank will therefore try to match maturities in money it receives and pays, in order to avoid these problems, and may use interest rate derivatives when appropriate to reduce risks.

With this foundation laid, let's now explore the main types of interest rates you’ll encounter in financial markets. 

### **The landscape of interest rates**
----

##### **1. Treasury rates**
----

Treasury rates are the rates an investor earns on Treasury bills (T-bills) and Treasury bonds (T-bonds). These instruments are issued by the government to finance its spending and are considered among the safest investments since they are backed by the full faith and credit of the issuing government. Treasury rates serve as a fundamental benchmark for the *risk-free rate* in the domestic currency. In Canada, the equivalent instruments are Canada Treasury Bills (short-term) and Government of Canada Bonds (longer-term).

While yields on government securities—such as U.S. Treasury bills and bonds or Canadian Government bonds—are considered very safe, they are not entirely risk-free. These instruments carry certain risks and considerations, including:

- Liquidity risk: Some government bonds may be less liquid than interbank instruments.

- Tax treatment: Differences in how interest income is taxed can impact their effective yields.

- Sovereign risk: Although unlikely for developed countries, there is a non-zero risk of government default or restructuring.

Due to these factors and the way financial markets function in practice (notably, the irregular maturities and lower liquidity of government securities), LIBOR (see below) historically emerged as a more practical proxy for the “risk-free” rate in many financial products.

##### **2. LIBOR rates**
----

LIBOR, short for London Interbank Offered Rate (in Canada, Canadian Dollar Offered Rate (CDOR) for lending and borrowing in CAD), is the unsecured short-term borrowing rate at which banks lend to one another. LIBOR rates are quoted across multiple currencies (USD, GBP, Euro, JPY, CHF) and a range of borrowing periods, spanning from overnight up to one year. Serving as a key benchmark, LIBOR underpins hundreds of trillions of dollars in global financial transactions. One of the most widely known derivatives referencing LIBOR is the interest rate swap.

LIBOR fixings are determined daily by surveying a panel of 18 leading global banks, each asked to estimate the rate at which they could borrow funds from other banks shortly before 11:00 a.m. London time. To ensure robustness, the four highest and four lowest quotes for each currency and tenor are excluded, and the remaining submissions are averaged. The banks participating typically hold an AA credit rating, so LIBOR is generally viewed as an approximation of the unsecured borrowing cost for an AA-rated bank.

In addition to its role in lending markets, LIBOR became a foundational input in the **interest rate swap market**, where two parties agree to exchange interest payments on a notional (principal amount) over a specified period. Typically, one party pays a fixed interest rate, set at the start of the contract and remaining constant throughout, while the other pays a floating rate that resets periodically (commonly every three or six months) based on the prevailing LIBOR rate for the relevant tenor. Although the notional principal is never exchanged, it serves as the reference amount for calculating the interest payments. Swap contracts usually specify the payment frequency, day count conventions, and maturity date, which can range from a few months up to 30 years or more, allowing market participants to manage and hedge interest rate risk across various time horizons.

The floating leg of these swaps is typically tied to LIBOR, making LIBOR a critical reference in determining swap rates across different maturities. Because swap markets referencing LIBOR are highly liquid and span a wide range of terms, the resulting LIBOR-swap curve offers a practical way to construct a comprehensive **yield curve**. This curve has been widely used not only for pricing interest rate derivatives but also as a proxy for the risk-free term structure — particularly when Treasury yields are considered distorted by factors such as liquidity premiums or tax treatments.

Prior to the 2007–2008 financial crisis, financial institutions in both the United States and Canada commonly used benchmark rates like LIBOR (in USD) and CDOR (in CAD), along with swap rates, as proxies for risk-free rates when constructing discount curves or pricing interest rate derivatives. However, both LIBOR and CDOR reflected unsecured interbank borrowing costs and included embedded credit and liquidity risk, making them less suitable as true risk-free benchmarks.

After the crisis, increased awareness of these shortcomings led to a global push to adopt nearly risk-free reference rates (RFRs) based on overnight collateralized transactions. In the U.S., this led to the adoption of SOFR (Secured Overnight Financing Rate), based on Treasury repo transactions. In Canada, the equivalent transition was toward CORRA (Canadian Overnight Repo Rate Average), based on general collateral repo transactions involving Canadian government securities.

To reflect these new benchmarks, both markets developed OIS (Overnight Indexed Swap) markets tied to the new overnight rates — SOFR-OIS in the U.S. and CORRA-OIS in Canada. These OIS curves are now widely used as proxies for the risk-free term structure, particularly in collateralized derivative pricing, discounting, and risk management. They offer a more accurate and market-based alternative to the old LIBOR- and CDOR-linked swap curves, which previously served a similar purpose when Treasury or government bond yields were considered distorted by factors such as liquidity premiums, credit spreads, or tax treatments.

##### **3. Overnight Indexed Swap rates**
-----

An **Overnight Indexed Swap (OIS)** is an interest rate swap in which one party agrees to pay a fixed interest rate over a specified term (e.g., 1 month, 3 months, 1 year), while the other party pays a floating rate that is tied to the *compounded average of daily overnight rates* observed during that term. As for the standard swaps, the notional principal is never exchanged — it only serves as the basis for calculating interest payments.

If a bank borrows overnight funds each day throughout a certain period—rolling over the loan and accruing interest daily—it effectively pays the geometric average of the overnight rates over that period. Conversely, if it lends overnight funds daily, it receives the geometric average of those rates. An OIS contract thus allows a party to swap the uncertain, fluctuating overnight borrowing or lending costs for a single fixed interest rate over a specified term. This fixed rate is known as the *OIS rate*.

The underlying overnight rates exchanged in OIS contracts are based on transactions within government-organized interbank markets, where banks with excess reserves lend to those needing to borrow to satisfy their reserve requirements. In the United States, this rate is known as the *Fed Funds Rate*. More specifically, the *Effective Fed Funds Rate (EFFR)* represents the weighted average of overnight rates paid by borrowing banks to lending banks on any given day. This effective rate serves as the basis for the geometric averaging used in calculating the floating leg of USD OIS contracts. Prior to 2018, the EFFR was the primary benchmark for overnight rates in OIS contracts. However, following regulatory reforms and a push for more transparent and transaction-based benchmarks, the market has shifted towards using the **Secured Overnight Financing Rate (SOFR)** — a rate based on actual overnight secured repo transactions backed by U.S. Treasury securities. This transition reflects a broader move to more robust and liquid benchmarks that better capture true borrowing costs. In Canada, the **Canadian Overnight Repo Rate Average (CORRA)** has long served as the benchmark overnight rate for OIS contracts. CORRA is based on secured overnight repo transactions involving Government of Canada securities and remains a key reference rate for Canadian money markets and derivatives.

##### **4. Repo rates**
-----

Unlike LIBOR and the Federal Funds Rate, which represent unsecured borrowing costs, repo rates are secured borrowing rates backed by collateral—typically high-quality government securities. In a repurchase agreement (repo), one party sells securities to another with an agreement to repurchase the same securities at a predetermined price on a specified future date. Effectively, this transaction functions as a secured loan, where the interest paid by the borrower is the difference between the initial sale price and the repurchase price, known as the repo rate.

Because repos are collateralized, they carry very low credit risk. If the borrower fails to repurchase the securities, the lender keeps the collateral; if the lender fails to uphold their end, the borrower retains the cash. The most common repos are overnight repos, which can be rolled over daily, although longer-term term repos also exist.

Due to the secured nature of repos, their interest rates typically trade a few basis points below unsecured rates like LIBOR or the Federal Funds Rate. This distinction is important because benchmark rates like SOFR and CORRA, which underlie modern OIS contracts, are based on secured overnight borrowing rates observed in repo markets, reflecting the lower credit risk relative to unsecured rates.


#### **References** 
-----------

**1. "Risk Management and Financial Institutions", (2018, Wiley) John C. Hull.**

**2. "Options, Futures and Other derivatives", Prentice Hall (8th edition), John C. Hull.**

**3. "The Concepts and Practice of Mathematical Finance", Cambridge Univ. Press (2nd Edition 2008), Mark J. Joshi.**
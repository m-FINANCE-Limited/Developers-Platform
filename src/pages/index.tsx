import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import styles from './index.module.css';

const journey = [
  {
    number: '01',
    label: 'Establish trust',
    title: 'Authenticate',
    copy: 'Create a WebProxy session, issue an API key, then exchange it for a short-lived access token.',
    meta: 'WebProxy',
  },
  {
    number: '02',
    label: 'Know the instrument',
    title: 'Discover',
    copy: 'Load account and contract settings before calculating amount, margin, or available actions.',
    meta: 'WebProxy',
  },
  {
    number: '03',
    label: 'Make it idempotent',
    title: 'Execute',
    copy: 'Place a market or quoted deal with an intentional price mode and a unique client order ID.',
    meta: 'FxServer',
  },
  {
    number: '04',
    label: 'Follow the lifecycle',
    title: 'Reconcile',
    copy: 'Consume server-sent events and handle delayed, manual, or hedge processing without guessing.',
    meta: 'SSE',
  },
];

function Arrow(): ReactNode {
  return <span aria-hidden="true">-&gt;</span>;
}

function RequestPanel(): ReactNode {
  return (
    <div className={styles.requestPanel} aria-label="Example Trader API request">
      <div className={styles.panelBar}>
        <span className={styles.panelTitle}>REQUEST / 001</span>
        <span className={styles.liveState}>
          <i /> TEST ENV
        </span>
      </div>
      <div className={styles.endpoint}>
        <span>POST</span>
        <code>/addDeal</code>
      </div>
      <pre className={styles.codeBlock}>
        <code>{`{
  "clientOrderId": 10001,
  "priceMode": 1,
  "contractCode": "EURUSD",
  "amount": 1000,
  "buyOrSell": true
}`}</code>
      </pre>
      <div className={styles.responseLine}>
        <span className={styles.statusCode}>200</span>
        <span>Deal accepted</span>
        <span className={styles.latency}>84 ms</span>
      </div>
    </div>
  );
}

function HomepageHeader(): ReactNode {
  return (
    <header className={styles.hero}>
      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <div className={styles.eyebrow}>
            <span>MF-TECHNOLOGIES</span>
            <span>V1.0</span>
          </div>
          <h1>
            From access
            <br />
            to <em>execution.</em>
          </h1>
          <p>
            The complete onboarding path for developers building secure,
            observable trading experiences on FxServer, WebProxy, and Realtime
            Chart Server.
          </p>
          <div className={styles.heroActions}>
            <Link
              className={styles.primaryAction}
              to="/docs/getting-started/first-trade">
              Make your first trade <Arrow />
            </Link>
            <Link
              className={styles.secondaryAction}
              to="/docs/fx-server/openapi-trader">
              Explore the API
            </Link>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.visualIndex}>01-06</div>
          <RequestPanel />
          <div className={styles.orbitLabel}>
            AUTH / CONFIG / TRADE / STREAM
          </div>
        </div>
      </div>
      <div className={styles.signalBar} aria-label="Platform capabilities">
        <span>JWT access</span>
        <span>Market + quoted modes</span>
        <span>Duplicate protection</span>
        <span>Live execution events</span>
      </div>
    </header>
  );
}

function Journey(): ReactNode {
  return (
    <section className={styles.journey}>
      <div className={styles.sectionHeading}>
        <p>THE INTEGRATION ROUTE</p>
        <h2>
          One clear path.
          <br />
          No missing steps.
        </h2>
        <span>
          Everything required to move from credentials to a reconciled trade.
        </span>
      </div>
      <div className={styles.journeyGrid}>
        {journey.map((step) => (
          <article className={styles.journeyCard} key={step.number}>
            <div className={styles.cardTopline}>
              <span>{step.number}</span>
              <span>{step.meta}</span>
            </div>
            <p>{step.label}</p>
            <h3>{step.title}</h3>
            <div className={styles.cardRule} />
            <span className={styles.cardCopy}>{step.copy}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function ApiSurfaces(): ReactNode {
  return (
    <section className={styles.surfaces}>
      <div className={styles.surfaceIntro}>
        <p>THE API SURFACE</p>
        <h2>
          Three services.
          <br />
          One connected platform.
        </h2>
      </div>
      <Link className={styles.surfaceCard} to="/docs/web-proxy/openapi">
        <div className={styles.surfaceNumber}>A / 01</div>
        <div>
          <span className={styles.surfaceTag}>IDENTITY + CONTEXT</span>
          <h3>WebProxy API</h3>
          <p>
            Sessions, API keys, accounts, contract settings, statements, and
            history.
          </p>
        </div>
        <div className={styles.surfaceFooter}>
          <span>Open reference</span>
          <Arrow />
        </div>
      </Link>
      <Link
        className={`${styles.surfaceCard} ${styles.surfaceCardDark}`}
        to="/docs/fx-server/openapi-trader">
        <div className={styles.surfaceNumber}>A / 02</div>
        <div>
          <span className={styles.surfaceTag}>EXECUTION + STATE</span>
          <h3>FxServer Trader</h3>
          <p>
            Orders, deals, liquidation, balances, positions, and server-sent
            updates.
          </p>
        </div>
        <div className={styles.surfaceFooter}>
          <span>Open reference</span>
          <Arrow />
        </div>
      </Link>
      <Link
        className={`${styles.surfaceCard} ${styles.surfaceCardChart}`}
        to="/docs/realtime-chart-server/overview">
        <div className={styles.surfaceNumber}>A / 03</div>
        <div>
          <span className={styles.surfaceTag}>MARKET DATA + BARS</span>
          <h3>Realtime Chart Server</h3>
          <p>
            Instrument mapping, OHLC history, latest bars, open prices, and
            live market statistics.
          </p>
        </div>
        <div className={styles.surfaceFooter}>
          <span>Read the guide</span>
          <Arrow />
        </div>
      </Link>
    </section>
  );
}

function ConceptLinks(): ReactNode {
  return (
    <section className={styles.concepts}>
      <div className={styles.conceptLead}>
        <p>READ THE MARKET MODEL</p>
        <h2>
          Trading vocabulary,
          <br />
          made operational.
        </h2>
        <Link to="/docs/fx-server/general-rest-api-information">
          Read REST essentials <Arrow />
        </Link>
      </div>
      <div className={styles.conceptList}>
        <Link to="/docs/business-logic/contract-overview">
          <span>01</span>
          <strong>Contracts</strong>
          <small>Instruments, lot size, and currency pairs</small>
          <Arrow />
        </Link>
        <Link to="/docs/business-logic/currency-overview">
          <span>02</span>
          <strong>Currencies</strong>
          <small>Base, counter, system, and settlement</small>
          <Arrow />
        </Link>
        <Link to="/docs/business-logic/price-concept">
          <span>03</span>
          <strong>Prices</strong>
          <small>Quotes, tags, validation, and execution</small>
          <Arrow />
        </Link>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="mF Technologies Developer Platform"
      description="Developer onboarding and API reference for the Trader OpenAPI platform by mF Technologies.">
      <HomepageHeader />
      <main className={styles.main}>
        <Journey />
        <ApiSurfaces />
        <ConceptLinks />
      </main>
    </Layout>
  );
}

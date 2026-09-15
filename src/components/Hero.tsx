import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { SpArrow, SpHardhat, SpPlay, SpShield, SpTeam, SpTower } from "./SpIcons";
import { getContent } from "@/lib/content";

const statIcons = {
  tower: SpTower,
  team: SpTeam,
  shield: SpShield,
  hardhat: SpHardhat,
} as const;

/** Thin space between thousands reads better in Georgian than a comma. */
const group = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

/** Hero ported 1:1 from the approved mockup: one still frame, no carousel.
 *  The photograph is a background layer — every word below is live text. */
export default async function Hero() {
  const { t, hero, heroStats } = await getContent();
  return (
    <div className="sp-site">
      <section className="sp-hero" aria-labelledby="sp-hero-title">
        <div className="sp-hero__background" aria-hidden="true">
          <Image
            className="sp-hero__facade"
            src={hero.facade}
            alt=""
            width={294}
            height={515}
            sizes="48vw"
          />
          <Image
            className="sp-hero__photo"
            src={hero.photo}
            alt=""
            width={922}
            height={650}
            priority
            sizes="(max-width: 700px) 100vw, 68vw"
          />
          <div className="sp-hero__shade" />
        </div>

        <div className="sp-container sp-hero__body">
          <div className="sp-hero__copy">
            <p className="sp-eyebrow sp-reveal sp-reveal--1">
              {hero.eyebrow.map((word, i) => (
                <Fragment key={word}>
                  {i > 0 && <b>/</b>}
                  <span>{word}</span>
                </Fragment>
              ))}
            </p>

            <h1 className="sp-hero__title sp-hero__title--long sp-reveal sp-reveal--2" id="sp-hero-title">
              {hero.title.map((line, i) => (
                <span key={line} className={i === 1 ? "sp-hero__accent" : undefined}>
                  {line}
                </span>
              ))}
            </h1>

            <p className="sp-hero__description sp-reveal sp-reveal--3">
              {hero.description[0]}
              <br className="sp-desktop-break" /> {hero.description[1]}
            </p>

            <div className="sp-hero__buttons sp-reveal sp-reveal--4">
              <Link className="sp-button sp-button--primary" href={hero.primary.href}>
                {hero.primary.label}
                <SpArrow className="sp-icon" />
              </Link>
              <Link className="sp-button sp-button--outline" href={hero.secondary.href}>
                <SpPlay className="sp-icon sp-play-icon" />
                <span>{hero.secondary.label}</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="sp-container sp-hero__bottom sp-reveal sp-reveal--5">
          <div className="sp-stats" aria-label={t.hero.stats}>
            {heroStats.map(({ icon, value, suffix, label }) => {
              const Icon = statIcons[icon];
              return (
                <div className="sp-stat" key={label}>
                  <Icon className="sp-icon sp-stat__icon" />
                  <div>
                    <div className="sp-stat__value">
                      {group(value)}
                      {suffix && <span>{suffix}</span>}
                    </div>
                    <p className="sp-stat__label">{label}</p>
                  </div>
                </div>
              );
            })}
            <div className="sp-stats__signature" aria-hidden="true">
              {hero.signature.map((word, i) => (
                <Fragment key={word}>
                  {i > 0 && <br />}
                  {word}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import Image from "next/image";

export default function Home() {
  return (
    <main className="cs-page">
      <div className="cs-glow" />
      <div className="cs-horizon" />

      <div className="cs-content">
        <Image
          src="/alvorem-logo-dark.png"
          alt="ALVOREM"
          width={1200}
          height={420}
          priority
          className="cs-logo"
        />

        <h1>Coming soon.</h1>

        <p className="cs-description">
          A brighter tomorrow for businesses,
          <br />
          powered by private AI.
        </p>

        <div className="cs-bottom">
          <div className="cs-line" />

          <span>A BRIGHTER TOMORROW.</span>

          <a href="mailto:hello@alvorem.ro">
            hello@alvorem.ro
          </a>
        </div>
      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
          background: #06060d;
        }

        .cs-page {
          position: relative;

          width: 100%;
          height: 100dvh;
          min-height: 600px;

          overflow: hidden;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 32px;

          color: #f8f7ff;

          background:
            radial-gradient(
              ellipse at 50% 82%,
              rgba(91, 61, 225, 0.22),
              rgba(67, 43, 160, 0.08) 32%,
              transparent 60%
            ),
            radial-gradient(
              ellipse at 50% 40%,
              rgba(75, 52, 150, 0.08),
              transparent 42%
            ),
            linear-gradient(
              180deg,
              #06060d 0%,
              #080716 100%
            );

          font-family:
            "Helvetica Neue",
            Arial,
            sans-serif;
        }

        .cs-content {
          position: relative;
          z-index: 2;

          width: min(1100px, 92vw);

          display: flex;
          flex-direction: column;
          align-items: center;

          text-align: center;

          transform: translateY(-4vh);
        }

        /* MICRO POLISH 1:
           slightly softer / more premium logo glow */

        .cs-logo {
          width: clamp(470px, 47vw, 790px);
          height: auto;

          object-fit: contain;

          /* MICRO POLISH 2:
             tightened logo -> headline spacing */
          margin-bottom: clamp(12px, 2vh, 22px);

          filter:
            drop-shadow(
              0 0 28px
              rgba(124, 91, 255, 0.14)
            );
        }

        h1 {
          margin: 0;

          font-size: clamp(58px, 5.6vw, 94px);
          line-height: 0.94;

          font-weight: 300;
          letter-spacing: -0.06em;

          color: #f8f7ff;
        }

        /* MICRO POLISH 3:
           slightly stronger supporting copy */

        .cs-description {
          margin: clamp(22px, 3vh, 30px) 0 0;

          font-size: clamp(16px, 1.25vw, 20px);
          line-height: 1.55;

          font-weight: 300;

          color: rgba(232, 227, 248, 0.78);
        }

        .cs-bottom {
          margin-top: clamp(32px, 4vh, 48px);

          display: flex;
          flex-direction: column;
          align-items: center;

          gap: 12px;
        }

        .cs-line {
          width: 56px;
          height: 1px;

          margin-bottom: 5px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(150, 120, 255, 0.95),
              transparent
            );
        }

        .cs-bottom span {
          font-size: 10px;

          letter-spacing: 0.38em;

          color: rgba(209, 200, 240, 0.57);
        }

        .cs-bottom a {
          font-size: 14px;

          color: #ad9aff;
          text-decoration: none;

          transition: opacity 0.2s ease;
        }

        .cs-bottom a:hover {
          opacity: 0.7;
        }

        .cs-glow {
          position: absolute;

          left: 50%;
          bottom: -245px;

          width: min(1250px, 95vw);
          height: 460px;

          transform: translateX(-50%);

          border-radius: 50%;

          background: rgba(88, 57, 220, 0.14);

          filter: blur(120px);

          pointer-events: none;
        }

        .cs-horizon {
          position: absolute;

          left: 50%;
          bottom: -410px;

          width: min(1800px, 115vw);
          height: 450px;

          transform: translateX(-50%);

          border-radius: 50%;

          border-top:
            1px solid
            rgba(118, 91, 245, 0.32);

          box-shadow:
            0 -8px 50px
            rgba(95, 62, 225, 0.07);

          pointer-events: none;
        }

        @media (max-width: 700px) {
          .cs-page {
            padding: 24px;
            min-height: 560px;
          }

          .cs-content {
            width: 100%;
            transform: translateY(-2vh);
          }

          .cs-logo {
            width: 92vw;
            margin-bottom: 22px;
          }

          h1 {
            font-size: clamp(54px, 16vw, 74px);
          }

          .cs-description {
            font-size: 15px;
          }

          .cs-bottom {
            margin-top: 36px;
          }

          .cs-bottom span {
            font-size: 9px;
            letter-spacing: 0.3em;
          }

          .cs-horizon {
            width: 175vw;
          }
        }
      `}</style>
    </main>
  );
}

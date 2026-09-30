import { ImageResponse } from 'next/og';

export const alt = 'Nizar Ilahi — Senior Full-Stack Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(115deg, #eef7fb 0% 52%, #48afde 52% 100%)',
        }}
      >
        {/* Left: text block */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '64px 80px',
            flex: 1,
          }}
        >
          <div
            style={{
              display: 'flex',
              color: '#47626d',
              fontSize: 20,
              letterSpacing: 5,
              textTransform: 'uppercase',
              marginBottom: 16,
              fontWeight: 500,
            }}
          >
            nizarilahi.dev
          </div>
          <div
            style={{
              display: 'flex',
              color: '#223740',
              fontSize: 88,
              fontWeight: 900,
              lineHeight: 1,
              marginBottom: 20,
            }}
          >
            Nizar Ilahi
          </div>
          <div
            style={{
              display: 'flex',
              color: '#223740',
              fontSize: 30,
              fontWeight: 700,
              marginBottom: 14,
            }}
          >
            Senior Full-Stack Engineer
          </div>
          <div
            style={{
              display: 'flex',
              color: '#47626d',
              fontSize: 20,
              fontWeight: 400,
            }}
          >
            Java · Spring Boot · React · Node.js · NestJS
          </div>
        </div>

        {/* Right: decorative brand panel */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: 340,
            gap: 24,
            paddingRight: 48,
          }}
        >
          {['15+ years', '50k+ users', '+20% conversion'].map((stat) => (
            <div
              key={stat}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.25)',
                borderRadius: 16,
                padding: '16px 28px',
                color: '#ffffff',
                fontSize: 22,
                fontWeight: 700,
                width: '100%',
              }}
            >
              {stat}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}

import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "80px 120px",
          backgroundColor: "#09090b",
          color: "#f4f4f5",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text'",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 56,
          }}
        >
          <div
            style={{
              width: 160,
              height: 160,
              borderRadius: 40,
              backgroundColor: "#18181b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {/* Logo file from /public/logo.png */}
            <img
              src="https://tiendev.id.vn/logo.png"
              alt="Logo Trần Công Tiến"
              width={140}
              height={140}
              style={{ objectFit: "contain" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                fontSize: 18,
                letterSpacing: 8,
                textTransform: "uppercase",
                color: "#a1a1aa",
              }}
            >
              Trần Công Tiến
            </div>
            <div style={{ fontSize: 40, fontWeight: 700, lineHeight: 1.1 }}>
              Portfolio Full‑stack Web & App
            </div>
            <div
              style={{
                marginTop: 8,
                maxWidth: 640,
                fontSize: 20,
                color: "#d4d4d8",
              }}
            >
              React • Next.js • Node.js • Flutter – xây dựng website và ứng dụng hiện đại,
              tối ưu trải nghiệm, hiệu năng và SEO.
            </div>
            <div
              style={{
                marginTop: 16,
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontSize: 18,
                color: "#a1a1aa",
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 999,
                  backgroundColor: "#22c55e",
                }}
              />
              <span>tiendev.id.vn</span>
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}


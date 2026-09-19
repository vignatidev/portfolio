import { ImageResponse } from "next/server";

export const alt = "Marco Vignati | Engenheiro de Software · Gestor de Automação";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#011627",
          color: "#7D9BB8",
          fontFamily: "monospace",
        }}
      >
        <div style={{ fontSize: 36 }}>Olá! Eu sou</div>
        <div style={{ fontSize: 96, fontWeight: 700, color: "#FFFFFF", marginTop: 16 }}>
          Marco Vignati
        </div>
        <div style={{ fontSize: 34, color: "#FEA55F", marginTop: 32 }}>
          &gt; Engenheiro de Software · Gestor de Automação
        </div>
        <div style={{ fontSize: 28, marginTop: 48 }}>github.com/VignatiDev</div>
      </div>
    ),
    size
  );
}

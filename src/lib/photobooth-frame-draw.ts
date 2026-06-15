import { EVENT_BRAND } from "@/lib/constants";
import { EVENT_HASHTAG_LINES } from "@/lib/hashtag";

export const PHOTOBOOTH_FOOTER_RATIO = 0.26;

/** Burn branded frame + footer into the captured image */
export function drawPhotoboothFrame(
  ctx: CanvasRenderingContext2D,
  width: number,
  photoHeight: number
) {
  const footerHeight = Math.round(width * PHOTOBOOTH_FOOTER_RATIO);
  const totalHeight = photoHeight + footerHeight;
  const gold = "#c9a227";
  const goldLight = "#e8c547";
  const cream = "#faf6ef";

  // Footer band — clear of photo border lines
  const footerTop = photoHeight;
  const footerGrad = ctx.createLinearGradient(0, footerTop, 0, totalHeight);
  footerGrad.addColorStop(0, "rgba(10, 22, 40, 0.92)");
  footerGrad.addColorStop(1, "rgba(13, 27, 62, 0.98)");
  ctx.fillStyle = footerGrad;
  ctx.fillRect(0, footerTop, width, footerHeight);

  // Divider between photo and text (not overlapping copy)
  ctx.strokeStyle = gold;
  ctx.lineWidth = Math.max(2, width * 0.004);
  ctx.beginPath();
  ctx.moveTo(width * 0.08, footerTop + footerHeight * 0.12);
  ctx.lineTo(width * 0.92, footerTop + footerHeight * 0.12);
  ctx.stroke();

  // Ornamental center diamond on divider
  const midX = width / 2;
  const divY = footerTop + footerHeight * 0.12;
  ctx.fillStyle = goldLight;
  ctx.beginPath();
  const d = width * 0.012;
  ctx.moveTo(midX, divY - d);
  ctx.lineTo(midX + d, divY);
  ctx.lineTo(midX, divY + d);
  ctx.lineTo(midX - d, divY);
  ctx.closePath();
  ctx.fill();

  // Footer text — spaced below divider
  const brandSize = Math.round(width * 0.052);
  const tagSize = Math.round(width * 0.038);
  const line1Y = footerTop + footerHeight * 0.38;
  const line2Y = footerTop + footerHeight * 0.58;
  const line3Y = footerTop + footerHeight * 0.76;

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.font = `700 ${brandSize}px Georgia, "Times New Roman", serif`;
  ctx.fillStyle = goldLight;
  ctx.fillText(EVENT_BRAND, midX, line1Y);

  ctx.font = `500 ${tagSize}px Georgia, "Times New Roman", serif`;
  ctx.fillStyle = cream;
  ctx.globalAlpha = 0.9;
  ctx.fillText(EVENT_HASHTAG_LINES[0], midX, line2Y);
  ctx.fillText(EVENT_HASHTAG_LINES[1], midX, line3Y);
  ctx.globalAlpha = 1;

  // Photo-area borders only (never through footer text)
  const inset = width * 0.035;
  const cornerLen = width * 0.09;

  ctx.strokeStyle = "rgba(201, 162, 39, 0.9)";
  ctx.lineWidth = Math.max(2, width * 0.005);
  drawCornerBrackets(ctx, inset, inset, width - inset * 2, photoHeight - inset * 2, cornerLen);

  ctx.strokeStyle = "rgba(245, 230, 163, 0.45)";
  ctx.lineWidth = Math.max(1, width * 0.0025);
  ctx.strokeRect(inset * 0.55, inset * 0.55, width - inset * 1.1, photoHeight - inset * 1.1);

  // Outer frame around full image
  const outerInset = width * 0.015;
  ctx.strokeStyle = gold;
  ctx.lineWidth = Math.max(3, width * 0.006);
  ctx.strokeRect(
    outerInset,
    outerInset,
    width - outerInset * 2,
    totalHeight - outerInset * 2
  );
}

function drawCornerBrackets(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  len: number
) {
  // Top-left
  ctx.beginPath();
  ctx.moveTo(x, y + len);
  ctx.lineTo(x, y);
  ctx.lineTo(x + len, y);
  ctx.stroke();
  // Top-right
  ctx.beginPath();
  ctx.moveTo(x + w - len, y);
  ctx.lineTo(x + w, y);
  ctx.lineTo(x + w, y + len);
  ctx.stroke();
  // Bottom-left
  ctx.beginPath();
  ctx.moveTo(x, y + h - len);
  ctx.lineTo(x, y + h);
  ctx.lineTo(x + len, y + h);
  ctx.stroke();
  // Bottom-right
  ctx.beginPath();
  ctx.moveTo(x + w - len, y + h);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x + w, y + h - len);
  ctx.stroke();
}

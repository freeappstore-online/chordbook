import { VOICINGS, parseLine, transpose } from "./music";
export function ChordDiagram({ chord }: { chord: string }) {
  const frets = VOICINGS[chord];
  return (
    <div className="diagram">
      <strong>{chord}</strong>
      {frets ? (
        <svg
          viewBox="0 0 66 78"
          role="img"
          aria-label={`${chord} guitar fingering low E to high E: ${frets.map((f) => (f < 0 ? "muted" : f === 0 ? "open" : f)).join(", ")}`}
        >
          {[0, 1, 2, 3, 4].map((f) => (
            <line
              key={"f" + f}
              x1="8"
              x2="58"
              y1={20 + f * 12}
              y2={20 + f * 12}
              stroke="currentColor"
              strokeWidth={f === 0 ? 2 : 0.6}
            />
          ))}
          {frets.map((f, i) => (
            <g key={i}>
              <line
                x1={8 + i * 10}
                x2={8 + i * 10}
                y1="20"
                y2="68"
                stroke="currentColor"
                strokeWidth="0.6"
              />
              {f <= 0 ? (
                <text
                  x={8 + i * 10}
                  y="12"
                  textAnchor="middle"
                  fontSize="10"
                  fill="currentColor"
                >
                  {f < 0 ? "×" : "○"}
                </text>
              ) : (
                <circle
                  cx={8 + i * 10}
                  cy={14 + f * 12}
                  r="3.8"
                  fill="currentColor"
                />
              )}
            </g>
          ))}
        </svg>
      ) : (
        <span className="no-voicing">
          Custom
          <br />
          voicing
        </span>
      )}
    </div>
  );
}
export function Sheet({
  body,
  shift = 0,
  flats = false,
}: {
  body: string;
  shift?: number;
  flats?: boolean;
}) {
  return (
    <div className="sheet-lines">
      {body.split("\n").map((line, i) => {
        const section = line.match(
          /^\{(?:section|comment|c|start_of_chorus|soc|start_of_verse|sov):?\s*(.*?)\}$/i,
        );
        if (section)
          return (
            <h3 className="sheet-section" key={i}>
              {section[1] || "Chorus"}
            </h3>
          );
        if (/^\{(?:end_of_chorus|eoc|end_of_verse|eov)\}$/.test(line))
          return null;
        if (!line.trim()) return <div className="sheet-space" key={i} />;
        return (
          <div className="lyric-line" key={i}>
            {parseLine(line).map((p, j) => (
              <span className="lyric-piece" key={j}>
                {p.chord && (
                  <span className="chord-name">
                    {transpose(p.chord, shift, flats)}
                  </span>
                )}
                <span className="lyric-text">{p.text || " "}</span>
              </span>
            ))}
          </div>
        );
      })}
    </div>
  );
}

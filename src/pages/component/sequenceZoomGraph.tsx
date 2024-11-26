import React, { useState } from "react";
import Plot from "react-plotly.js";

interface SequenceZoomGraphProps {
  sequence: string; // La secuencia de ADN que recibe el componente como prop
}

const SequenceZoomGraph: React.FC<SequenceZoomGraphProps> = ({ sequence }) => {
  // Convertimos la cadena en un array de índices para graficar
  const nucleotidePositions = Array.from({ length: sequence.length }, (_, i) => i + 1);
  const nucleotideValues = sequence.split("");

  // Estado para la región seleccionada (inicio y fin del zoom)
  const [zoomRegion, setZoomRegion] = useState<{ start: number; end: number }>({
    start: 0,
    end: sequence.length,
  });

  // Mapa de colores para cada nucleótido
  const nucleotideColors: Record<string, string> = {
    A: "green",
    T: "red",
    C: "blue",
    G: "orange",
    N: "gray", // Color para nucleótidos no estándar
  };

  // Trazos separados por cada nucleótido para la leyenda
  const nucleotideTraces = Object.entries(nucleotideColors).map(([nucleotide, color]) => {
    const indices = nucleotidePositions.filter(
      (_, index) => nucleotideValues[index] === nucleotide
    );

    return {
      x: indices,
      y: indices.map(() => {
        const nucleotideMap: Record<string, number> = { A: 1, T: 2, C: 3, G: 4, N: 5 };
        return nucleotideMap[nucleotide];
      }),
      type: "scatter",
      mode: "markers", // Solo los puntos para cada nucleótido
      marker: {
        color,
        size: 10, // Tamaño de los puntos
      },
      name: nucleotide, // Nombre en la leyenda
    };
  });

  // Trazo para las líneas que conectan todos los nucleótidos
  const lineTrace = {
    x: nucleotidePositions,
    y: nucleotideValues.map((nucleotide) => {
      const nucleotideMap: Record<string, number> = { A: 1, T: 2, C: 3, G: 4, N: 5 };
      return nucleotideMap[nucleotide] || 0; // Devuelve 0 si no es un nucleótido válido
    }),
    type: "scatter",
    mode: "lines", // Solo las líneas
    line: { color: "black", width: 1 }, // Configuración de la línea
    name: "Conexión", // Etiqueta opcional
    hoverinfo: "skip", // Omitir información en el hover para las líneas
    showlegend: false, // No mostrar en la leyenda
  };

  return (
    <div>
      <Plot
        data={[lineTrace, ...nucleotideTraces]} // Primero las líneas, luego los puntos
        layout={{
          xaxis: {
            title: "Posición",
            range: [zoomRegion.start, zoomRegion.end], // Rango de zoom inicial
          },
          yaxis: {
            title: "Nucleótidos",
            tickvals: [1, 2, 3, 4, 5], // Valores en el eje Y
            ticktext: ["A", "T", "C", "G", "N"], // Etiquetas correspondientes
          },
          showlegend: true, // Mostrar leyenda
          legend: {
            x: 1, // Posición de la leyenda en el eje X (derecha)
            y: 1, // Posición de la leyenda en el eje Y (arriba)
          },
        }}
        config={{ scrollZoom: true }} // Habilitar zoom con el scroll
        onRelayout={(event: any) => {
          // Capturamos el rango seleccionado en el eje X cuando el usuario hace zoom
          if (event["xaxis.range[0]"] !== undefined && event["xaxis.range[1]"] !== undefined) {
            setZoomRegion({
              start: Math.floor(event["xaxis.range[0]"]),
              end: Math.ceil(event["xaxis.range[1]"]),
            });
          }
        }}
      />
      <div>
        <p>
          <strong>Región seleccionada:</strong> Desde {zoomRegion.start} hasta {zoomRegion.end}
        </p>
      </div>
    </div>
  );
};

export default SequenceZoomGraph;

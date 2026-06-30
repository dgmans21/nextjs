import type { AnalysisResult } from "@/entities/store-event";

type AiAnalysisPanelProps = {
  analysis: AnalysisResult | null;
  loading: boolean;
};

export function AiAnalysisPanel({ analysis, loading }: AiAnalysisPanelProps) {
  return (
    <div className="panel">
      <h2>AI 분석</h2>
      {loading ? (
        <p>분석 결과를 불러오는 중…</p>
      ) : analysis ? (
        <dl>
          <dt>예측 유형</dt>
          <dd>{analysis.predicted_type || "-"}</dd>
          <dt>감정</dt>
          <dd>{analysis.sentiment || "-"}</dd>
          <dt>심각도</dt>
          <dd>{analysis.severity || "-"}</dd>
          <dt>신뢰도</dt>
          <dd>{analysis.confidence != null ? analysis.confidence.toFixed(2) : "-"}</dd>
          <dt>출처</dt>
          <dd>{analysis.source || "-"}</dd>
        </dl>
      ) : (
        <p>사건을 선택하면 분석 결과가 표시됩니다.</p>
      )}
    </div>
  );
}

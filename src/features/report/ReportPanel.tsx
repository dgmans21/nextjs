type ReportPanelProps = {
  report: string;
  loading: boolean;
  disabled: boolean;
  onGenerate: () => void;
};

export function ReportPanel({ report, loading, disabled, onGenerate }: ReportPanelProps) {
  return (
    <div className="panel">
      <h2>점장 리포트</h2>
      <button type="button" onClick={onGenerate} disabled={disabled || loading}>
        {loading ? "생성 중…" : "보고서 생성"}
      </button>
      <pre>{report || "보고서 생성 버튼을 눌러주세요."}</pre>
    </div>
  );
}

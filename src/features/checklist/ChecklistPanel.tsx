type ChecklistPanelProps = {
  tasks: string;
  loading: boolean;
  disabled: boolean;
  onGenerate: () => void;
};

export function ChecklistPanel({ tasks, loading, disabled, onGenerate }: ChecklistPanelProps) {
  return (
    <div className="panel">
      <h2>직원 체크리스트</h2>
      <button type="button" onClick={onGenerate} disabled={disabled || loading}>
        {loading ? "생성 중…" : "체크리스트 생성"}
      </button>
      <pre>{tasks || "체크리스트 생성 버튼을 눌러주세요."}</pre>
    </div>
  );
}
